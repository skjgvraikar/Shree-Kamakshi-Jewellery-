import { connectMongo, mongoService } from '../server/mongo.js';

async function testAuth() {
  console.log('🧪 Testing Admin Login Authentication Logic...\n');
  await connectMongo();

  const testCases = [
    { u: 'Amoga', p: 'AMOGA@JNNCE', label: 'Exact match' },
    { u: 'Amoga ', p: 'AMOGA@JNNCE ', label: 'Mobile auto-spacing (trailing space)' },
    { u: 'amoga', p: 'AMOGA@JNNCE', label: 'Lowercase username' },
    { u: 'skjgvraikar@gmail.com', p: 'AMOGA@JNNCE', label: 'Email as username' },
    { u: 'AMOGA', p: 'AMOGA@2026', label: 'Backup password' },
  ];

  for (const tc of testCases) {
    const verified = await mongoService.verifyAdminLogin(tc.u.trim(), tc.p.trim());
    console.log(`• [${tc.label}] User: "${tc.u}" | Pass: "${tc.p}" =>`, verified ? `✓ SUCCESS (${verified.name})` : '❌ FAILED');
    if (!verified) {
      console.error(`❌ Authentication failed for: ${tc.label}`);
      process.exit(1);
    }
  }

  console.log('\n🎉 ALL ADMIN AUTHENTICATION TESTS PASSED!');
  process.exit(0);
}

testAuth().catch(err => {
  console.error(err);
  process.exit(1);
});
