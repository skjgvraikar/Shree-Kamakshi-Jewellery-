import express from 'express';
import { adminLoginLimiter } from '../server/index.js';

// Create a standalone express test app with the exact limiter
const testApp = express();
testApp.use(express.json());

// Dummy login endpoint wrapped with adminLoginLimiter
testApp.post('/api/admin/login', adminLoginLimiter, (req, res) => {
  const { username, password } = req.body;
  if (username === 'amoga' && password === 'correct_password') {
    return res.json({ success: true, token: 'test_token' });
  }
  return res.status(401).json({ success: false, error: 'Invalid username or password' });
});

const server = testApp.listen(5099, async () => {
  console.log('🧪 Rate Limiter Test Suite Starting on port 5099...\n');
  
  let passed = true;

  try {
    // Perform 5 failed attempts
    for (let i = 1; i <= 5; i++) {
      const res = await fetch('http://127.0.0.1:5099/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'amoga', password: 'wrong_password_' + i }),
      });
      const data = await res.json();
      console.log(`[Attempt ${i}/5] Status: ${res.status} | Error: "${data.error}"`);
      if (res.status !== 401) {
        console.error(`❌ Expected status 401 on attempt ${i}, got ${res.status}`);
        passed = false;
      }
    }

    // 6th Attempt MUST be 429 Too Many Requests
    console.log('\n🔒 Triggering 6th Attempt (Expecting 429 Rate Limit Lockout)...');
    const lockedRes = await fetch('http://127.0.0.1:5099/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'amoga', password: 'any_password' }),
    });
    const lockedData = await lockedRes.json();
    console.log(`[Attempt 6/5] Status: ${lockedRes.status} | Body:`, lockedData);

    if (lockedRes.status === 429 && lockedData.error.includes('Too many failed login attempts')) {
      console.log('\n✅ TEST PASSED: Rate limiter successfully blocked brute-force attack with HTTP 429!');
    } else {
      console.error(`\n❌ TEST FAILED: Expected 429 status code, received ${lockedRes.status}`);
      passed = false;
    }
  } catch (err) {
    console.error('Test execution error:', err);
    passed = false;
  } finally {
    server.close(() => {
      console.log('\nTest server shut down.');
      process.exit(passed ? 0 : 1);
    });
  }
});

