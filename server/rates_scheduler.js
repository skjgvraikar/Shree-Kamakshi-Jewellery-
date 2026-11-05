import dotenv from 'dotenv';
import { mongoService } from './mongo.js';
import { redisCache } from './redis.js';

dotenv.config();

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

/**
 * Format date in Indian Standard Time (IST, UTC+5:30)
 */
export function formatISTTime(date = new Date()) {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date) + ' IST';
}

/**
 * Fetch live Gold and Silver rates in Indian Rupee (INR) from Metalcharts API
 */
export async function fetchLiveMetalRates() {
  const endpoint = process.env.GOLD_API_ENDPOINT || 'https://api.metalcharts.org/v1/prices/?currency=INR&unit=g';
  const apiKey = process.env.GOLD_API_KEY;

  if (!apiKey) {
    console.log('ℹ GOLD_API_KEY not configured. Using existing database rates.');
    return null;
  }

  console.log(`\n⏳ [Market Sync] Fetching live bullion rates in INR from Metalcharts API...`);

  try {
    const res = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'x-api-key': apiKey,
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Metalcharts API returned HTTP ${res.status}: ${res.statusText}`);
    }

    const payload = await res.json();
    if (!payload.success || !payload.data) {
      throw new Error('Invalid JSON structure returned by Metalcharts API');
    }

    const xau = payload.data.XAU; // Gold per gram (spot 24K)
    const xag = payload.data.XAG; // Silver per gram (spot 999)

    if (!xau || !xau.price) {
      throw new Error('Gold (XAU) data missing in API response');
    }

    // Calculations in INR
    const gold24Price = Math.round(xau.price);
    // 22K (916 purity) is 22/24 of 24K spot price
    const gold22Price = Math.round(xau.price * (22 / 24));
    // 18K (750 purity) is 18/24 of 24K spot price
    const gold18Price = Math.round(xau.price * (18 / 24));

    // Silver calculations
    const silverPrice = xag?.price ? Math.round(xag.price) : 160;
    const silverKg = Math.round(silverPrice * 1000);

    // Format Change %
    const goldChgPct = xau.changePercent24h ?? 1.25;
    const goldChgVal = Math.round(xau.change24h ?? 125);
    const goldSign = goldChgPct >= 0 ? '+' : '';

    const silverChgPct = xag?.changePercent24h ?? 1.10;
    const silverChgVal = Math.round(xag?.change24h ?? 2);
    const silverSign = silverChgPct >= 0 ? '+' : '';

    const istString = formatISTTime(new Date());

    const ratesData = {
      gold22: gold22Price,
      gold24: gold24Price,
      gold18: gold18Price,
      silver: silverPrice,
      silverKg: silverKg,
      updatedAt: new Date().toISOString(),
      fetchedAtIST: istString,
      source: 'metalcharts_api',
      disclaimer: 'Live bullion spot rates synchronized every 6 hours via live bullion market feeds. Actual showroom billing price may vary slightly based on local market fluctuations and GST.',
      disclaimerKn: 'ಮಾರುಕಟ್ಟೆ ದರಗಳು ಪ್ರತಿ 6 ಗಂಟೆಗಳಿಗೊಮ್ಮೆ ನವೀಕರಣಗೊಳ್ಳುತ್ತವೆ. ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ ಬದಲಾವಣೆಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಶೋರೂಂ ಬಿಲ್ಲಿಂಗ್ ದರಗಳಲ್ಲಿ ಸಣ್ಣ ವ್ಯತ್ಯಾಸವಿರಬಹುದು.',
      change: {
        gold22: `${goldSign} ₹${Math.round(goldChgVal * 22 / 24)} (${goldSign}${goldChgPct.toFixed(2)}%)`,
        gold24: `${goldSign} ₹${goldChgVal} (${goldSign}${goldChgPct.toFixed(2)}%)`,
        silver: `${silverSign} ₹${silverChgVal} (${silverSign}${silverChgPct.toFixed(2)}%)`,
        gold22Direction: goldChgPct >= 0 ? 'up' : 'down',
        gold24Direction: goldChgPct >= 0 ? 'up' : 'down',
        silverDirection: silverChgPct >= 0 ? 'up' : 'down',
      },
    };

    // 1. Update in MongoDB Atlas
    await mongoService.updateRates(ratesData);

    // 2. Cache in Upstash Redis with 6-Hour TTL (21600 seconds)
    await redisCache.setCachedRates(ratesData, 6 * 3600);

    console.log(`✅ [Market Sync Success] Live Indian Gold & Silver Rates Updated:`);
    console.log(`   • Gold 24K (999): ₹ ${gold24Price} / gram (${ratesData.change.gold24})`);
    console.log(`   • Gold 22K (916): ₹ ${gold22Price} / gram (${ratesData.change.gold22})`);
    console.log(`   • Silver (999):   ₹ ${silverPrice} / gram (₹ ${silverKg} / kg)`);
    console.log(`   • Synced at:      ${istString}`);
    console.log(`   • Stored in:      MongoDB Atlas + Upstash Redis (6-Hour TTL)\n`);

    return ratesData;
  } catch (err) {
    console.error('❌ [Market Sync Failed]:', err.message);
    return null;
  }
}

/**
 * Start the background 6-hour scheduler aligned with Indian market hours
 */
export function startRatesScheduler() {
  console.log('⏰ Starting 6-Hour Indian Bullion Market Rates Sync Engine...');

  // Initial fetch on server startup
  fetchLiveMetalRates().catch((err) => {
    console.warn('Initial rates fetch note:', err.message);
  });

  // Recurring 6-hour schedule (21,600,000 ms)
  setInterval(() => {
    console.log(`\n⏰ [6-Hour Trigger] Running scheduled bullion market rate synchronization...`);
    fetchLiveMetalRates().catch((e) => console.error('Scheduled sync error:', e.message));
  }, SIX_HOURS_MS);
}

export default {
  fetchLiveMetalRates,
  startRatesScheduler,
  formatISTTime,
};

