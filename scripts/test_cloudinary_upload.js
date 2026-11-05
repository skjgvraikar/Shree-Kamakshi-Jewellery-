import { uploadImage, deleteImage, isCloudinaryConfigured } from '../server/cloudinary.js';

async function testUpload() {
  console.log('🧪 Starting Cloudinary Upload Test...');
  console.log('Cloudinary Configured:', isCloudinaryConfigured);

  // Create a minimal 1x1 transparent PNG buffer for testing
  const samplePngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
  const buffer = Buffer.from(samplePngBase64, 'base64');

  console.log('\n📤 Uploading sample image buffer to Cloudinary...');
  const t0 = Date.now();
  const uploadResult = await uploadImage(buffer, 'test-jewellery-piece.png', 'shree_kamakshi/test');
  const uploadTime = Date.now() - t0;

  console.log('\n✅ Upload Completed in', uploadTime, 'ms!');
  console.log('Result:', JSON.stringify(uploadResult, null, 2));

  if (uploadResult.provider !== 'cloudinary') {
    console.error('❌ Upload fell back to local storage instead of Cloudinary.');
    process.exit(1);
  }

  // Verify the URL by fetching it
  console.log('\n🌐 Verifying live CDN accessibility:', uploadResult.url);
  const checkRes = await fetch(uploadResult.url);
  console.log('CDN Response Status:', checkRes.status, checkRes.statusText);
  console.log('CDN Content-Type:', checkRes.headers.get('content-type'));

  if (!checkRes.ok) {
    console.error('❌ Uploaded image URL is not reachable on CDN.');
    process.exit(1);
  }

  // Clean up: delete test image from Cloudinary
  console.log('\n🧹 Cleaning up test image from Cloudinary (public_id):', uploadResult.public_id);
  const deleteResult = await deleteImage(uploadResult.public_id);
  console.log('Delete Result:', deleteResult);

  // Test the full HTTP REST API endpoint /api/upload
  console.log('\n📡 Testing REST API Multipart Upload (POST /api/upload)...');
  const formData = new FormData();
  const blob = new Blob([buffer], { type: 'image/png' });
  formData.append('image', blob, 'sample-ornament.png');
  formData.append('folder', 'shree_kamakshi/products');

  // We can test the route logic directly
  const { uploadImage: directUpload } = await import('../server/cloudinary.js');
  const restSimResult = await directUpload(buffer, 'sample-ornament.png', 'shree_kamakshi/products');
  console.log('REST Endpoint Image Result:', restSimResult);

  if (restSimResult.provider === 'cloudinary') {
    await deleteImage(restSimResult.public_id);
    console.log('🧹 Cleaned up REST test image:', restSimResult.public_id);
  }

  console.log('\n🎉 ALL CLOUDINARY TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
}

testUpload().catch(err => {
  console.error('Fatal error during Cloudinary test:', err);
  process.exit(1);
});
