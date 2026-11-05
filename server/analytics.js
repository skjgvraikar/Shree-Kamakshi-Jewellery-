import geoip from 'geoip-lite';

/**
 * Clean & normalize client IP address
 */
export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || req.ip || '127.0.0.1';
}

/**
 * Determine if IP is a local / private network address
 */
export function isLocalIp(ip) {
  if (!ip) return true;
  return (
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip === '::ffff:127.0.0.1' ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip.startsWith('172.16.') ||
    ip.startsWith('fe80:')
  );
}

/**
 * Parse User-Agent for device type and browser
 */
export function parseUserAgent(ua = '') {
  const agent = ua.toLowerCase();
  let device = 'Desktop';
  if (/mobile|android|iphone|ipad|phone/i.test(agent)) {
    device = /ipad|tablet/i.test(agent) ? 'Tablet' : 'Mobile';
  }

  let browser = 'Chrome';
  if (/firefox/i.test(agent)) browser = 'Firefox';
  else if (/edg/i.test(agent)) browser = 'Edge';
  else if (/safari/i.test(agent) && !/chrome/i.test(agent)) browser = 'Safari';
  else if (/opera|opr/i.test(agent)) browser = 'Opera';

  return { device, browser };
}

/**
 * Geolocation resolver using geoip-lite with Talaguppa fallback
 */
export function resolveLocation(ip) {
  if (isLocalIp(ip)) {
    return {
      city: 'Talaguppa',
      region: 'Karnataka',
      country: 'India',
      isLocal: true,
      ll: [14.1953, 74.9085], // Talaguppa coordinates
    };
  }

  try {
    const geo = geoip.lookup(ip);
    if (geo && (geo.city || geo.region)) {
      return {
        city: geo.city || geo.region || 'Karnataka Region',
        region: geo.region || 'Karnataka',
        country: geo.country === 'IN' ? 'India' : geo.country || 'India',
        isLocal: false,
        ll: geo.ll || [14.1953, 74.9085],
      };
    }
  } catch (err) {
    console.warn('GeoIP lookup error:', err.message);
  }

  // Graceful fallback for Indian visitors
  return {
    city: 'Talaguppa',
    region: 'Karnataka',
    country: 'India',
    isLocal: false,
    ll: [14.1953, 74.9085],
  };
}

export default {
  getClientIp,
  isLocalIp,
  parseUserAgent,
  resolveLocation,
};

