import { connectMongo, mongoService } from '../server/mongo.js';
import { EnquiryModel } from '../server/models/index.js';

async function testEnquiryFlow() {
  console.log('🧪 Starting Online Enquiry End-to-End Test...\n');
  await connectMongo();

  // Test phone sanitization
  const rawPhones = ['+91 9448628575', '09448628575', '86604-19854', '94486 28575'];
  console.log('1. Testing Phone Sanitization:');
  for (const phone of rawPhones) {
    const clean = phone.replace(/[\s\-\+\(\)]/g, '').replace(/^91/, '').replace(/^0/, '');
    const valid = clean.length === 10 && /^[6-9]\d{9}$/.test(clean);
    console.log(`   • "${phone}" -> "${clean}" (Valid: ${valid})`);
    if (!valid) {
      console.error('❌ Sanitization failed for:', phone);
      process.exit(1);
    }
  }

  // Test full enquiry creation in MongoDB Atlas
  console.log('\n2. Testing Real Online Enquiry Submission into MongoDB Atlas...');
  const testPayload = {
    name: 'Ganesh Kamath',
    phone: '9448628575',
    email: 'ganesh.kamath@gmail.com',
    type: 'Gold Jewellery',
    message: 'Looking for 916 Hallmark Kasu Mala designs for wedding ceremony.',
    status: 'New',
    createdAt: new Date(),
  };

  const created = await mongoService.addEnquiry(testPayload);
  console.log('   ✓ Enquiry created with ID:', created.id);

  // Verify retrieval
  const list = await mongoService.getEnquiries();
  const found = list.find(e => e.id === created.id);
  console.log('   ✓ Verified enquiry in database list:', found ? 'FOUND' : 'NOT FOUND');

  if (!found) {
    console.error('❌ Created enquiry was not found in getEnquiries list');
    process.exit(1);
  }

  // Cleanup test record
  await EnquiryModel.deleteOne({ id: created.id });
  console.log('   ✓ Test record cleaned up from MongoDB Atlas');

  console.log('\n🎉 ALL ONLINE ENQUIRY TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
}

testEnquiryFlow().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

