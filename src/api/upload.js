import apiClient from './client';

/**
 * Upload an image file to the backend, which uploads to Cloudinary (or falls back to local uploads)
 */
export async function uploadImageFile(file, folder = 'shree_kamakshi') {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('folder', folder);

  const res = await apiClient.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
}

