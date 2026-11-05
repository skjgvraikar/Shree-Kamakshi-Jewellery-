import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

let redisClient = null;
let isConnected = false;

// In-memory high-speed cache fallback when Redis is offline or not configured
const memoryCache = new Map();

const REDIS_URL = process.env.REDIS_URL;
const REDIS_CACHE_KEY = 'rates:gold_silver:live';
const DEFAULT_TTL_SECONDS = 300; // 5 minutes cache refresh

if (REDIS_URL && REDIS_URL.trim() !== '') {
  try {
    const isUpstash = REDIS_URL.includes('upstash.io');
    const isTls = REDIS_URL.startsWith('rediss://') || isUpstash;
    const connectionUrl = (isUpstash && REDIS_URL.startsWith('redis://'))
      ? REDIS_URL.replace('redis://', 'rediss://')
      : REDIS_URL;

    redisClient = new Redis(connectionUrl, {
      tls: isTls ? { rejectUnauthorized: false } : undefined,
      lazyConnect: true,
      maxRetriesPerRequest: 2,
      connectTimeout: 8000,
      retryStrategy(times) {
        if (times > 3) return null; // stop retrying after 3 attempts
        return Math.min(times * 1000, 3000);
      },
    });

    redisClient.on('connect', () => {
      isConnected = true;
      console.log('✓ Connected to Upstash Redis Cache Engine successfully over TLS!');
    });

    redisClient.on('error', (err) => {
      isConnected = false;
      console.warn('ℹ Redis notice:', err.message, '- In-memory caching active.');
    });

    redisClient.connect().catch((err) => {
      console.warn('ℹ Redis connection unavailable:', err.message);
      isConnected = false;
    });
  } catch (err) {
    console.warn('ℹ Redis initialization error:', err.message);
    isConnected = false;
  }
} else {
  console.log('ℹ REDIS_URL not configured in .env. Using high-speed in-memory rate cache.');
}

export const redisCache = {
  isRedisActive: () => isConnected && redisClient && redisClient.status === 'ready',

  /**
   * Get cached Gold & Silver rates from Redis (or memory cache fallback)
   */
  getCachedRates: async () => {
    if (redisCache.isRedisActive()) {
      try {
        const raw = await redisClient.get(REDIS_CACHE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          return { ...parsed, _source: 'redis' };
        }
      } catch (err) {
        console.warn('Redis get error:', err.message);
      }
    }

    // Memory cache fallback
    const mem = memoryCache.get(REDIS_CACHE_KEY);
    if (mem && Date.now() < mem.expiresAt) {
      return { ...mem.data, _source: 'memory_cache' };
    }

    return null;
  },

  /**
   * Store Gold & Silver rates in Redis with TTL (default 5 minutes / 300 seconds)
   */
  setCachedRates: async (ratesData, ttlSeconds = DEFAULT_TTL_SECONDS) => {
    if (!ratesData) return;

    const payload = {
      ...ratesData,
      cachedAt: new Date().toISOString(),
    };

    // Save in memory cache
    memoryCache.set(REDIS_CACHE_KEY, {
      data: payload,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });

    // Save in Redis if connected
    if (redisCache.isRedisActive()) {
      try {
        await redisClient.set(REDIS_CACHE_KEY, JSON.stringify(payload), 'EX', ttlSeconds);
      } catch (err) {
        console.warn('Redis set error:', err.message);
      }
    }

    return payload;
  },

  /**
   * Invalidate / Clear cached rates (e.g. when admin manually updates price)
   */
  invalidateRates: async () => {
    memoryCache.delete(REDIS_CACHE_KEY);
    if (redisCache.isRedisActive()) {
      try {
        await redisClient.del(REDIS_CACHE_KEY);
      } catch (err) {
        console.warn('Redis del error:', err.message);
      }
    }
  },

  /**
   * Modular fetcher for live gold rates from external API.
   * Plug in whatever URL / provider the user specifies!
   */
  fetchFromExternalProvider: async (customEndpoint = null) => {
    const endpoint = customEndpoint || process.env.GOLD_API_ENDPOINT;
    if (!endpoint) {
      return null;
    }

    try {
      const response = await fetch(endpoint, {
        headers: {
          'x-access-token': process.env.GOLD_API_KEY || '',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`External API responded with status ${response.status}`);
      }

      const externalData = await response.json();
      return externalData;
    } catch (err) {
      console.error('External gold rate fetch error:', err.message);
      return null;
    }
  },
};

export default redisCache;

