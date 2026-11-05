import apiClient from './client';

/**
 * Submit customer enquiry
 * @param {Object} payload - { name, phone, email, type, message, createdAt }
 */
export async function submitEnquiry(payload) {
  try {
    const response = await apiClient.post('/api/enquiries', payload);
    return response.data;
  } catch (error) {
    console.error('Enquiry submission failed:', error.message);
    throw error;
  }
}

export async function fetchEnquiries() {
  try {
    const response = await apiClient.get('/api/enquiries');
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch enquiries:', error.message);
    return [];
  }
}

export async function updateEnquiryStatus(id, status) {
  const response = await apiClient.patch(`/api/enquiries/${id}`, { status });
  return response.data;
}

export async function deleteEnquiry(id) {
  const response = await apiClient.delete(`/api/enquiries/${id}`);
  return response.data;
}
