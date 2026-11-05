import apiClient from './client';

export async function trackVisit(pageInfo = {}) {
  try {
    const res = await apiClient.post('/api/analytics/visit', {
      path: window.location.pathname,
      device: window.innerWidth < 768 ? 'Mobile' : window.innerWidth < 1024 ? 'Tablet' : 'Desktop',
      ...pageInfo,
    });
    return res.data;
  } catch (error) {
    // Silent fail for offline tracker
    return { success: false };
  }
}

export async function fetchAnalytics() {
  try {
    const res = await apiClient.get('/api/analytics');
    return { data: res.data, isFallback: false };
  } catch (error) {
    console.warn('API /api/analytics unavailable, using mock fallback analytics');
    return {
      data: {
        totalVisits: 342,
        uniqueVisitors: 219,
        cityBreakdown: [
          { city: 'Talaguppa', region: 'Karnataka', country: 'India', count: 114 },
          { city: 'Sagar', region: 'Karnataka', country: 'India', count: 87 },
          { city: 'Shivamogga', region: 'Karnataka', country: 'India', count: 62 },
          { city: 'Bengaluru', region: 'Karnataka', country: 'India', count: 48 },
          { city: 'Mangaluru', region: 'Karnataka', country: 'India', count: 18 },
        ],
        deviceBreakdown: { mobile: 246, desktop: 84, tablet: 12 },
        dailyTrends: [
          { date: 'Nov 01', visits: 45, unique: 29 },
          { date: 'Nov 02', visits: 39, unique: 25 },
          { date: 'Nov 03', visits: 49, unique: 31 },
          { date: 'Nov 04', visits: 52, unique: 33 },
          { date: 'Nov 05', visits: 58, unique: 37 },
        ],
        recentVisits: [],
      },
      isFallback: true,
    };
  }
}

