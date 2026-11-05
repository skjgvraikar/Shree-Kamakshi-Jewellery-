import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const smtpUser = process.env.SMTP_USER || process.env.APP_EMAIL;
const smtpPass = process.env.SMTP_PASS || process.env.APP_EMAIL_PASSWORD;

const isSmtpConfigured = Boolean(
  smtpUser &&
  smtpPass &&
  smtpPass !== 'your_gmail_app_password'
);

let transporter = null;

if (isSmtpConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: (Number(process.env.SMTP_PORT) || 465) === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
  console.log(`✓ Email SMTP service connected for: ${smtpUser}`);
} else {
  console.log('ℹ SMTP credentials not configured in .env. OTP codes will be printed to terminal console for instant testing.');
}

/**
 * Send 6-digit OTP verification email for Admin Password Reset
 */
export async function sendOtpEmail(toEmail, otp, adminName = 'Admin') {
  const subject = `🔐 Password Reset OTP: ${otp} - Shree Kamakshi Jewellery Works`;
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #faf8f5; margin: 0; padding: 20px; color: #1c1917; }
        .card { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 1px solid #f0d080; padding: 35px; box-shadow: 0 10px 30px rgba(139, 105, 20, 0.1); }
        .header { text-align: center; border-bottom: 2px solid #fde68a; padding-bottom: 20px; margin-bottom: 25px; }
        .title { color: #b45309; font-size: 20px; font-weight: bold; letter-spacing: 1px; margin: 0; text-transform: uppercase; }
        .subtitle { color: #78716c; font-size: 12px; margin-top: 5px; }
        .otp-box { background: #fef3c7; border: 2px dashed #d97706; border-radius: 16px; padding: 20px; text-align: center; margin: 25px 0; }
        .otp-number { font-size: 38px; font-weight: 800; color: #92400e; letter-spacing: 8px; font-family: monospace; }
        .footer { text-align: center; font-size: 11px; color: #a8a29e; margin-top: 30px; border-top: 1px solid #f5f5f4; padding-top: 15px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h2 class="title">Shree Kamakshi Jewellery Works</h2>
          <p class="subtitle">Admin Security & Password Verification</p>
        </div>
        <p>Namaskara <strong>${adminName}</strong>,</p>
        <p>We received a request to reset the administrator password for your account.</p>
        <p>Use the following 6-digit One-Time Password (OTP) to complete your verification:</p>
        <div class="otp-box">
          <div class="otp-number">${otp}</div>
          <p style="margin: 5px 0 0; font-size: 12px; color: #b45309;">Valid for 15 minutes only</p>
        </div>
        <p style="font-size: 12px; color: #57534e;">If you did not initiate this request, please ignore this email. Your password remains safe and unchanged.</p>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Shree Kamakshi Jewellery Works, B H Road, Talaguppa – 577430</p>
          <p>Crafted by Amoga • Developed by Shivam</p>
        </div>
      </div>
    </body>
    </html>
  `;

  if (isSmtpConfigured && transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"Shree Kamakshi Admin" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: subject,
        html: htmlContent,
      });
      console.log(`✓ Real OTP email sent successfully to ${toEmail} (MessageId: ${info.messageId})`);
      return { success: true, mode: 'live-smtp' };
    } catch (err) {
      console.error('SMTP sending error:', err.message);
      // Fallback: log to console
    }
  }

  // Developer / Testing console output
  console.log(`\n======================================================`);
  console.log(`🔐 [ADMIN PASSWORD RESET OTP]`);
  console.log(`   Target Email: ${toEmail}`);
  console.log(`   OTP Code:     >>> ${otp} <<<`);
  console.log(`   Expires in:   15 minutes`);
  console.log(`======================================================\n`);

  return { success: true, mode: 'console-preview', previewOtp: otp };
}

export default {
  sendOtpEmail,
  isSmtpConfigured,
};

