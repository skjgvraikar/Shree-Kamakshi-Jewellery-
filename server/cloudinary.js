import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure local uploads directory exists as safe fallback
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET &&
  process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name'
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  console.log('✓ Cloudinary configured successfully with cloud:', process.env.CLOUDINARY_CLOUD_NAME);
} else {
  console.log('ℹ Cloudinary credentials not configured in .env. Using high-speed local upload fallback.');
}

/**
 * Upload an image buffer to Cloudinary or fallback to local static storage
 */
export async function uploadImage(buffer, originalname = 'image.jpg', folder = 'shree_kamakshi') {
  if (isCloudinaryConfigured) {
    try {
      return await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: folder,
            resource_type: 'image',
            format: 'webp',
            transformation: [{ quality: 'auto:best', fetch_format: 'auto' }],
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary stream error:', error);
              return reject(error);
            }
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
              width: result.width,
              height: result.height,
              provider: 'cloudinary',
            });
          }
        );
        uploadStream.end(buffer);
      });
    } catch (err) {
      console.warn('Cloudinary upload failed, falling back to local storage:', err.message);
    }
  }

  // Local fallback storage
  const ext = path.extname(originalname) || '.webp';
  const cleanBase = path.basename(originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
  const filename = `${cleanBase}-${Date.now()}${ext}`;
  const targetPath = path.join(UPLOADS_DIR, filename);

  fs.writeFileSync(targetPath, buffer);

  return {
    url: `/uploads/${filename}`,
    public_id: `local-${filename}`,
    provider: 'local',
  };
}

/**
 * Delete an image by public_id or file path
 */
export async function deleteImage(publicIdOrUrl) {
  if (!publicIdOrUrl) return;

  if (isCloudinaryConfigured && !publicIdOrUrl.startsWith('/uploads/') && !publicIdOrUrl.startsWith('local-')) {
    try {
      await cloudinary.uploader.destroy(publicIdOrUrl);
      return true;
    } catch (err) {
      console.warn('Cloudinary destroy error:', err.message);
    }
  }

  // Local file delete
  if (publicIdOrUrl.includes('/uploads/')) {
    const filename = path.basename(publicIdOrUrl);
    const localFile = path.join(UPLOADS_DIR, filename);
    if (fs.existsSync(localFile)) {
      try {
        fs.unlinkSync(localFile);
        return true;
      } catch (e) {
        console.warn('Failed deleting local file:', e.message);
      }
    }
  }
}

export default {
  uploadImage,
  deleteImage,
  isCloudinaryConfigured,
};
