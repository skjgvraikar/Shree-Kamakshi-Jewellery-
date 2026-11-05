import apiClient from './client';
import fallbackData from '../data/fallback.json';

const DEFAULT_CATEGORIES = [
  {
    id: 'cat-necklaces',
    name: 'Necklaces & Haras',
    slug: 'Necklaces',
    tagline: 'Bridal, Temple & Antique Masterpieces',
    count: '12+ Designs',
    image: '/images/products/lakshmi-temple-necklace.webp',
    accent: 'Gold 22K 916',
  },
  {
    id: 'cat-bangles',
    name: 'Bangles & Kadas',
    slug: 'Bangles',
    tagline: 'Traditional Polki, Filigree & Solid Kadas',
    count: '8+ Designs',
    image: '/images/products/peacock-kada.svg',
    accent: 'Hallmark 916',
  },
  {
    id: 'cat-earrings',
    name: 'Earrings & Jhumkas',
    slug: 'Earrings',
    tagline: 'Temple Jhumkas, Chandbalis & Daily Drops',
    count: '10+ Designs',
    image: '/images/products/chandbalis.webp',
    accent: 'Temple Gold',
  },
  {
    id: 'cat-rings',
    name: 'Rings & Solitaires',
    slug: 'Rings',
    tagline: 'Engagement Bands, Navaratna & Men’s Rings',
    count: '15+ Designs',
    image: '/images/products/engagement-solitaire-rings.jpg',
    accent: 'Precious Gems',
  },
  {
    id: 'cat-chains',
    name: 'Chains & Mangalsutras',
    slug: 'Chains',
    tagline: 'Rope, Figaro, Box & Sacred Mangalsutra',
    count: '14+ Designs',
    image: '/images/products/gold-chain-classic.svg',
    accent: 'Daily & Bridal',
  },
  {
    id: 'cat-silver',
    name: 'Pooja Silver & Ornaments',
    slug: 'Silver Items',
    tagline: 'Lamps, Silver Coins, Kalash & Anklets',
    count: '20+ Articles',
    image: '/images/products/silver-anklet.svg',
    accent: 'Pure 999/925',
  },
];

export async function fetchCategories() {
  try {
    const res = await apiClient.get('/api/categories');
    return { data: res.data, isFallback: false };
  } catch (error) {
    console.warn('API /api/categories unavailable, using fallback categories:', error.message);
    return { data: DEFAULT_CATEGORIES, isFallback: true };
  }
}

export async function createCategory(catData) {
  const res = await apiClient.post('/api/categories', catData);
  return res.data;
}

export async function updateCategory(id, catData) {
  const res = await apiClient.put(`/api/categories/${id}`, catData);
  return res.data;
}

export async function deleteCategory(id) {
  const res = await apiClient.delete(`/api/categories/${id}`);
  return res.data;
}

