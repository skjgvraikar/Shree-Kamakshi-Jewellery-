import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helpers for reading/writing JSON files
const readJson = (file, defaultVal) => {
  const filePath = path.join(DATA_DIR, file);
  try {
    if (!fs.existsSync(filePath)) {
      writeJson(file, defaultVal);
      return defaultVal;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
    return defaultVal;
  }
};

const writeJson = (file, data) => {
  const filePath = path.join(DATA_DIR, file);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${file}:`, err.message);
    return false;
  }
};

// Initial Data Sources
const fallbackPath = path.join(__dirname, '..', 'src', 'data', 'fallback.json');
let initialFallback = { rates: {}, settings: {}, products: [] };
try {
  if (fs.existsSync(fallbackPath)) {
    initialFallback = JSON.parse(fs.readFileSync(fallbackPath, 'utf-8'));
  }
} catch (e) {
  console.error('Failed reading fallback.json:', e.message);
}

const INITIAL_CATEGORIES = [
  {
    id: 'cat-necklaces',
    name: 'Necklaces & Haras',
    slug: 'Necklaces',
    tagline: 'Bridal, Temple & Antique Masterpieces',
    count: '12+ Designs',
    image: '/images/products/lakshmi-temple-necklace.webp',
    accent: 'Gold 22K 916',
    order: 1,
  },
  {
    id: 'cat-bangles',
    name: 'Bangles & Kadas',
    slug: 'Bangles',
    tagline: 'Traditional Polki, Filigree & Solid Kadas',
    count: '8+ Designs',
    image: '/images/products/peacock-kada.svg',
    accent: 'Hallmark 916',
    order: 2,
  },
  {
    id: 'cat-earrings',
    name: 'Earrings & Jhumkas',
    slug: 'Earrings',
    tagline: 'Temple Jhumkas, Chandbalis & Daily Drops',
    count: '10+ Designs',
    image: '/images/products/chandbalis.webp',
    accent: 'Temple Gold',
    order: 3,
  },
  {
    id: 'cat-rings',
    name: 'Rings & Solitaires',
    slug: 'Rings',
    tagline: 'Engagement Bands, Navaratna & Men’s Rings',
    count: '15+ Designs',
    image: '/images/products/engagement-solitaire-rings.jpg',
    accent: 'Precious Gems',
    order: 4,
  },
  {
    id: 'cat-chains',
    name: 'Chains & Mangalsutras',
    slug: 'Chains',
    tagline: 'Rope, Figaro, Box & Sacred Mangalsutra',
    count: '14+ Designs',
    image: '/images/products/gold-chain-classic.svg',
    accent: 'Daily & Bridal',
    order: 5,
  },
  {
    id: 'cat-silver',
    name: 'Pooja Silver & Ornaments',
    slug: 'Silver Items',
    tagline: 'Lamps, Silver Coins, Kalash & Anklets',
    count: '20+ Articles',
    image: '/images/products/silver-anklet.svg',
    accent: 'Pure 999/925',
    order: 6,
  },
];

// Seed initial sample enquiries if none exist
const INITIAL_ENQUIRIES = [
  {
    id: 'enq-101',
    name: 'Ramesh Hegde',
    phone: '9845123456',
    email: 'ramesh.hegde@gmail.com',
    type: 'Custom Design',
    message: 'Looking for a custom bridal antique Lakshmi temple necklace for my daughter wedding in December.',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'enq-102',
    name: 'Pooja Bhat',
    phone: '8762345678',
    email: 'pooja.bhat@yahoo.com',
    type: 'Gold Jewellery',
    message: 'Interested in the Traditional Antique Kasu Mala design and current 22K Hallmark making charges.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'enq-103',
    name: 'Suresh Rao',
    phone: '9448112233',
    email: 'suresh.rao@gmail.com',
    type: 'Silver Items',
    message: 'Need 1 kg pure silver pooja deepam set and silver coins for upcoming house warming ceremony.',
    status: 'Completed',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

// Seed initial visitor analytics with realistic Karnataka data
const INITIAL_ANALYTICS = {
  totalVisits: 342,
  uniqueVisitors: 219,
  cityBreakdown: [
    { city: 'Talaguppa', region: 'Karnataka', country: 'India', count: 114 },
    { city: 'Sagar', region: 'Karnataka', country: 'India', count: 87 },
    { city: 'Shivamogga', region: 'Karnataka', country: 'India', count: 62 },
    { city: 'Bengaluru', region: 'Karnataka', country: 'India', count: 48 },
    { city: 'Mangaluru', region: 'Karnataka', country: 'India', count: 18 },
    { city: 'Hubballi', region: 'Karnataka', country: 'India', count: 13 },
  ],
  deviceBreakdown: {
    mobile: 246,
    desktop: 84,
    tablet: 12,
  },
  dailyTrends: [
    { date: 'Oct 23', visits: 18, unique: 12 },
    { date: 'Oct 24', visits: 24, unique: 16 },
    { date: 'Oct 25', visits: 29, unique: 19 },
    { date: 'Oct 26', visits: 21, unique: 14 },
    { date: 'Oct 27', visits: 35, unique: 22 },
    { date: 'Oct 28', visits: 28, unique: 18 },
    { date: 'Oct 29', visits: 31, unique: 20 },
    { date: 'Oct 30', visits: 42, unique: 27 },
    { date: 'Oct 31', visits: 38, unique: 24 },
    { date: 'Nov 01', visits: 45, unique: 29 },
    { date: 'Nov 02', visits: 39, unique: 25 },
    { date: 'Nov 03', visits: 49, unique: 31 },
    { date: 'Nov 04', visits: 52, unique: 33 },
    { date: 'Nov 05', visits: 58, unique: 37 },
  ],
  recentVisits: [],
};

// Database Exports
export const db = {
  // Rates
  getRates: () => readJson('rates.json', initialFallback.rates || {}),
  updateRates: (newRates) => {
    const current = db.getRates();
    const updated = {
      ...current,
      ...newRates,
      updatedAt: new Date().toISOString(),
    };
    writeJson('rates.json', updated);
    return updated;
  },

  // Settings
  getSettings: () => readJson('settings.json', initialFallback.settings || {}),
  updateSettings: (newSettings) => {
    const current = db.getSettings();
    const updated = { ...current, ...newSettings };
    writeJson('settings.json', updated);
    return updated;
  },

  // Categories
  getCategories: () => readJson('categories.json', INITIAL_CATEGORIES),
  saveCategory: (category) => {
    const list = db.getCategories();
    const newCat = {
      id: category.id || `cat-${Date.now()}`,
      name: category.name || 'New Category',
      slug: category.slug || category.name || 'Category',
      tagline: category.tagline || 'Exquisite Jewellery Collection',
      count: category.count || '0 Designs',
      image: category.image || '/images/products/lakshmi-temple-necklace.webp',
      accent: category.accent || 'Hallmark 916',
      order: category.order || list.length + 1,
    };
    list.push(newCat);
    writeJson('categories.json', list);
    return newCat;
  },
  updateCategory: (id, updates) => {
    const list = db.getCategories();
    const idx = list.findIndex((c) => c.id === id || c.slug === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    writeJson('categories.json', list);
    return list[idx];
  },
  deleteCategory: (id) => {
    const list = db.getCategories();
    const filtered = list.filter((c) => c.id !== id && c.slug !== id);
    writeJson('categories.json', filtered);
    return true;
  },

  // Products
  getProducts: () => readJson('products.json', initialFallback.products || []),
  saveProduct: (product) => {
    const list = db.getProducts();
    const newProd = {
      id: product.id || `prod-${Date.now()}`,
      name: product.name,
      category: product.category,
      categoryKn: product.categoryKn || product.category,
      images: Array.isArray(product.images) && product.images.length > 0 ? product.images : ['/images/products/lakshmi-temple-necklace.webp'],
      tag: product.tag || 'Handcrafted',
      tagKn: product.tagKn || 'ಕರಕುಶಲ',
      badge: product.badge || 'BIS 916',
      featured: product.featured ?? false,
      variations: product.variations || [],
    };
    list.unshift(newProd);
    writeJson('products.json', list);
    return newProd;
  },
  updateProduct: (id, updates) => {
    const list = db.getProducts();
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    writeJson('products.json', list);
    return list[idx];
  },
  deleteProduct: (id) => {
    const list = db.getProducts();
    const filtered = list.filter((p) => p.id !== id);
    writeJson('products.json', filtered);
    return true;
  },

  // Enquiries
  getEnquiries: () => readJson('enquiries.json', INITIAL_ENQUIRIES),
  addEnquiry: (enquiry) => {
    const list = db.getEnquiries();
    const newEnq = {
      id: `enq-${Date.now()}`,
      name: enquiry.name || 'Anonymous',
      phone: enquiry.phone || '',
      email: enquiry.email || '',
      type: enquiry.type || 'General Enquiry',
      message: enquiry.message || '',
      status: 'New',
      createdAt: enquiry.createdAt || new Date().toISOString(),
    };
    list.unshift(newEnq);
    writeJson('enquiries.json', list);
    return newEnq;
  },
  updateEnquiry: (id, updates) => {
    const list = db.getEnquiries();
    const idx = list.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    writeJson('enquiries.json', list);
    return list[idx];
  },
  deleteEnquiry: (id) => {
    const list = db.getEnquiries();
    const filtered = list.filter((e) => e.id !== id);
    writeJson('enquiries.json', filtered);
    return true;
  },

  // Visitor Analytics
  getAnalytics: () => readJson('analytics.json', INITIAL_ANALYTICS),
  recordVisit: (visitData) => {
    const analytics = db.getAnalytics();
    analytics.totalVisits = (analytics.totalVisits || 0) + 1;

    // Check unique IP in recent records
    const recent = analytics.recentVisits || [];
    const isReturning = recent.some((v) => v.ip === visitData.ip && Date.now() - new Date(v.timestamp).getTime() < 86400000);
    if (!isReturning) {
      analytics.uniqueVisitors = (analytics.uniqueVisitors || 0) + 1;
    }

    // City Breakdown aggregation
    const cityName = visitData.city || 'Talaguppa';
    const regionName = visitData.region || 'Karnataka';
    const countryName = visitData.country || 'India';

    let cityEntry = analytics.cityBreakdown.find(
      (c) => c.city.toLowerCase() === cityName.toLowerCase()
    );
    if (cityEntry) {
      cityEntry.count += 1;
    } else {
      analytics.cityBreakdown.push({
        city: cityName,
        region: regionName,
        country: countryName,
        count: 1,
      });
    }
    // Sort cities descending
    analytics.cityBreakdown.sort((a, b) => b.count - a.count);

    // Device Breakdown
    const dev = (visitData.device || 'desktop').toLowerCase();
    if (dev.includes('mobile')) {
      analytics.deviceBreakdown.mobile = (analytics.deviceBreakdown.mobile || 0) + 1;
    } else if (dev.includes('tablet')) {
      analytics.deviceBreakdown.tablet = (analytics.deviceBreakdown.tablet || 0) + 1;
    } else {
      analytics.deviceBreakdown.desktop = (analytics.deviceBreakdown.desktop || 0) + 1;
    }

    // Daily Trend
    const todayLabel = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    let todayTrend = analytics.dailyTrends.find((t) => t.date === todayLabel);
    if (todayTrend) {
      todayTrend.visits += 1;
      if (!isReturning) todayTrend.unique += 1;
    } else {
      analytics.dailyTrends.push({
        date: todayLabel,
        visits: 1,
        unique: 1,
      });
      if (analytics.dailyTrends.length > 14) {
        analytics.dailyTrends.shift();
      }
    }

    // Log recent visit
    analytics.recentVisits = [
      {
        id: `vis-${Date.now()}`,
        timestamp: new Date().toISOString(),
        city: cityName,
        region: regionName,
        country: countryName,
        device: visitData.device || 'Desktop',
        browser: visitData.browser || 'Chrome',
        path: visitData.path || '/',
        isLocal: visitData.isLocal || false,
      },
      ...recent.slice(0, 49),
    ];

    writeJson('analytics.json', analytics);
    return analytics;
  },
};

export default db;

