import { connectMongo } from '../server/mongo.js';
import { AdminModel } from '../server/models/index.js';

async function check() {
  const connected = await connectMongo();
  console.log('MongoDB connected:', connected);
  const admin = await AdminModel.findOne({ username: { $regex: '^amoga$', $options: 'i' } });
  console.log('Admin user found:', {
    username: admin?.username,
    email: admin?.email,
    hasOtp: !!admin?.resetOtp,
    otp: admin?.resetOtp,
    expires: admin?.resetOtpExpires,
    isExpired: admin?.resetOtpExpires ? new Date(admin.resetOtpExpires) < new Date() : null
  });
  process.exit(0);
}

check().catch(err => {
  console.error(err);
  process.exit(1);
});
