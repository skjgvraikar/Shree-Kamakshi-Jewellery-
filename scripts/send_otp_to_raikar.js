import { connectMongo, mongoService } from '../server/mongo.js';
import { AdminModel } from '../server/models/index.js';
import { sendOtpEmail } from '../server/email.js';

async function dispatchOtpToRaikar() {
  await connectMongo();
  
  // 1. Ensure admin email in MongoDB is skjgvraikar@gmail.com
  let admin = await AdminModel.findOne({ username: { $regex: '^amoga$', $options: 'i' } });
  if (admin) {
    admin.email = 'skjgvraikar@gmail.com';
    admin.name = 'Veerendra Raikar';
    await admin.save();
    console.log('✓ Admin document updated in MongoDB Atlas with email:', admin.email);
  } else {
    admin = await AdminModel.create({
      username: 'amoga',
      name: 'Veerendra Raikar',
      email: 'skjgvraikar@gmail.com',
      password: process.env.ADMIN_PASSWORD || 'AMOGA@2026',
      role: 'Owner / Administrator',
    });
    console.log('✓ Admin document created in MongoDB Atlas:', admin.email);
  }

  // 2. Generate fresh OTP and 15 min expiry
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 15 * 60 * 1000);

  // 3. Save OTP in MongoDB Atlas
  await mongoService.setAdminResetOtp(admin.username, otp, expires);
  console.log(`✓ OTP ${otp} saved to MongoDB Atlas for ${admin.username} (valid until ${expires.toISOString()})`);

  // 4. Send email from skydev.005@gmail.com to skjgvraikar@gmail.com
  console.log(`⏳ Sending email via Gmail SMTP from ${process.env.SMTP_USER} to ${admin.email}...`);
  const emailResult = await sendOtpEmail(admin.email, otp, admin.name);
  console.log('✓ Email dispatch result:', emailResult);

  process.exit(0);
}

dispatchOtpToRaikar().catch(err => {
  console.error('Error dispatching OTP:', err);
  process.exit(1);
});
