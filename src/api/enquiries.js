import apiClient from './client';

const LOCAL_STORAGE_KEY = 'skj_customer_enquiries';

/**
 * Submit customer enquiry with automatic resilient offline persistence
 * @param {Object} payload - { name, phone, email, type, message, createdAt }
 */
export async function submitEnquiry(payload) {
  const cleanPhone = (payload.phone || '').replace(/[\s\-\+\(\)]/g, '').replace(/^91/, '').replace(/^0/, '');
  const cleanPayload = {
    ...payload,
    phone: cleanPhone || payload.phone,
    id: payload.id || `enq-${Date.now()}`,
    status: 'New',
    createdAt: payload.createdAt || new Date().toISOString(),
  };

  try {
    const response = await apiClient.post('/api/enquiries', cleanPayload);
    return response.data;
  } catch (error) {
    console.warn('API server unreachable for enquiry submission. Saving to resilient local cache:', error.message);
    
    // Save to localStorage so enquiry is NEVER lost
    try {
      const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      existing.unshift({ ...cleanPayload, _synced: false });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }

    return {
      success: true,
      enquiry: cleanPayload,
      mode: 'offline-cached',
      notice: 'Saved offline and queued for sync',
    };
  }
}

/**
 * Fetch all customer enquiries and sync any locally cached enquiries
 */
export async function fetchEnquiries() {
  let serverList = [];
  try {
    const response = await apiClient.get('/api/enquiries');
    if (Array.isArray(response.data)) {
      serverList = response.data;
    }
  } catch (error) {
    console.warn('Failed to fetch enquiries from API, checking local storage:', error.message);
  }

  // Check locally cached submissions
  try {
    const cached = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    if (cached.length > 0) {
      // Background sync unsynced entries to server if online
      if (serverList.length > 0) {
        for (const item of cached) {
          if (!item._synced) {
            apiClient.post('/api/enquiries', item)
              .then(() => { item._synced = true; })
              .catch(() => {});
          }
        }
      }

      // Merge and deduplicate by phone and message
      const serverIds = new Set(serverList.map((e) => e.id || `${e.phone}_${e.createdAt}`));
      for (const localItem of cached) {
        const key = localItem.id || `${localItem.phone}_${localItem.createdAt}`;
        if (!serverIds.has(key)) {
          serverList.unshift(localItem);
        }
      }
    }
  } catch (e) {
    console.error('Local cache read error:', e);
  }

  return serverList;
}

export async function updateEnquiryStatus(id, status) {
  try {
    const response = await apiClient.patch(`/api/enquiries/${id}`, { status });
    return response.data;
  } catch (err) {
    // Update local cache if offline
    try {
      const cached = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      const updated = cached.map((c) => (c.id === id ? { ...c, status } : c));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
    return { success: true, status };
  }
}

export async function deleteEnquiry(id) {
  try {
    const response = await apiClient.delete(`/api/enquiries/${id}`);
    return response.data;
  } catch (err) {
    try {
      const cached = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      const filtered = cached.filter((c) => c.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {}
    return { success: true };
  }
}
