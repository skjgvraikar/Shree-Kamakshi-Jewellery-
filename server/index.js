import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import dotenv from 'dotenv';

import { db } from './db.js';
import { mongoService, connectMongo } from './mongo.js';
import { uploadImage, deleteImage, isCloudinaryConfigured } from './cloudinary.js';
import { getClientIp, parseUserAgent, resolveLocation } from './analytics.js';
import { sendOtpEmail } from './email.js';
import { redisCache } from './redis.js';
import { startRatesScheduler, fetchLiveMetalRates } from './rates_scheduler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectMongo()
  .then(() => {
    // Start automated 6-hour live market sync once DB is ready
    startRatesScheduler();
  })
  .catch((e) => {
    console.warn('Mongo init notice:', e.message);
    startRatesScheduler();
  });

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Static file servers
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// Serve public directory so image assets are accessible via server
const publicDir = path.join(__dirname, '..', 'public');
if (fs.existsSync(publicDir)) {
  app.use('/images', express.static(path.join(publicDir, 'images')));
}

// Multer memory storage for uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WEBP, SVG) are allowed'));
    }
  },
});

// Admin Authentication Configuration
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'kamakshi@2025';

// ---------------------------------------------------------------------------
// Health & Diagnostic
// ---------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    shop: 'Shree Kamakshi Jewellery Works',
    database: mongoService.isMongoActive() ? 'mongodb-atlas' : 'json-fallback',
    redis: redisCache.isRedisActive() ? 'connected' : 'memory-fallback',
    cloudinary: isCloudinaryConfigured ? 'enabled' : 'local-fallback',
    timestamp: new Date().toISOString(),
  });
});

// ---------------------------------------------------------------------------
// Image Upload Endpoint (Cloudinary + Local Fallback)
// ---------------------------------------------------------------------------
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided in request' });
    }

    const folder = req.body.folder || 'shree_kamakshi';
    const result = await uploadImage(req.file.buffer, req.file.originalname, folder);

    res.json({
      success: true,
      url: result.url,
      public_id: result.public_id,
      provider: result.provider,
    });
  } catch (error) {
    console.error('Upload API error:', error);
    res.status(500).json({ error: 'Failed to upload image', details: error.message });
  }
});

// ---------------------------------------------------------------------------
// Rates Endpoints (Redis High-Speed Caching + MongoDB Atlas)
// ---------------------------------------------------------------------------
app.get('/api/rates', async (req, res) => {
  try {
    // 1. Check Redis Cache first (sub-millisecond response)
    const cached = await redisCache.getCachedRates();
    if (cached) {
      return res.json(cached);
    }

    // 2. Cache miss: fetch from MongoDB Atlas
    const rates = await mongoService.getRates();

    // 3. Store in Redis with 5-minute TTL (300 seconds)
    await redisCache.setCachedRates(rates, 300);

    res.json(rates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch live rates' });
  }
});

app.put('/api/rates', async (req, res) => {
  try {
    // 1. Update in MongoDB Atlas
    const updated = await mongoService.updateRates(req.body);

    // 2. Immediately refresh Redis cache with updated rates
    await redisCache.setCachedRates(updated, 300);

    res.json({ success: true, rates: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update rates' });
  }
});

// Sync rates manually or from external live bullion API
app.post('/api/rates/sync', async (req, res) => {
  try {
    const updated = await fetchLiveMetalRates();
    if (!updated) {
      return res.status(502).json({ error: 'Failed to fetch rates from Metalcharts live API' });
    }
    res.json({ success: true, rates: updated, source: 'metalcharts_api' });
  } catch (err) {
    res.status(500).json({ error: 'Sync failed: ' + err.message });
  }
});

// ---------------------------------------------------------------------------
// Settings Endpoints (Full control of frontend from backend)
// ---------------------------------------------------------------------------
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await mongoService.getSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

app.put('/api/settings', async (req, res) => {
  try {
    const updated = await mongoService.updateSettings(req.body);
    res.json({ success: true, settings: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// ---------------------------------------------------------------------------
// Categories Endpoints (Add, Remove, Replace Image, Edit)
// ---------------------------------------------------------------------------
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await mongoService.getCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { name, slug, tagline, count, image, accent } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    const newCat = await mongoService.saveCategory({
      name,
      slug: slug || name,
      tagline,
      count,
      image,
      accent,
    });
    res.status(201).json({ success: true, category: newCat });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const updated = await mongoService.updateCategory(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ success: true, category: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    await mongoService.deleteCategory(req.params.id);
    res.json({ success: true, message: 'Category removed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// ---------------------------------------------------------------------------
// Products Endpoints
// ---------------------------------------------------------------------------
app.get('/api/products', async (req, res) => {
  try {
    const products = await mongoService.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, category, images, tag, tagKn, badge, featured, variations } = req.body;
    if (!name || !category) {
      return res.status(400).json({ error: 'Product name and category are required' });
    }
    const newProduct = await mongoService.saveProduct({
      name,
      category,
      images,
      tag,
      tagKn,
      badge,
      featured,
      variations,
    });
    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updated = await mongoService.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await mongoService.deleteProduct(req.params.id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ---------------------------------------------------------------------------
// Customer Enquiries
// ---------------------------------------------------------------------------
app.post('/api/enquiries', async (req, res) => {
  try {
    const { name, phone, email, type, message, createdAt } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and Phone are required' });
    }
    const newEnq = await mongoService.addEnquiry({
      name,
      phone,
      email,
      type,
      message,
      createdAt,
    });
    res.status(201).json({ success: true, enquiry: newEnq });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit enquiry' });
  }
});

app.get('/api/enquiries', async (req, res) => {
  try {
    const enquiries = await mongoService.getEnquiries();
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

app.patch('/api/enquiries/:id', async (req, res) => {
  try {
    const updated = await mongoService.updateEnquiry(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    res.json({ success: true, enquiry: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update enquiry' });
  }
});

app.delete('/api/enquiries/:id', async (req, res) => {
  try {
    await mongoService.deleteEnquiry(req.params.id);
    res.json({ success: true, message: 'Enquiry deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete enquiry' });
  }
});

// ---------------------------------------------------------------------------
// Visitor Analytics Tracking (Place-wise & Geo Location)
// ---------------------------------------------------------------------------
app.post('/api/analytics/visit', async (req, res) => {
  try {
    const ip = getClientIp(req);
    const ua = req.headers['user-agent'] || '';
    const { device, browser } = parseUserAgent(ua);
    const loc = resolveLocation(ip);

    const visitData = {
      ip,
      device: req.body.device || device,
      browser: req.body.browser || browser,
      path: req.body.path || '/',
      city: req.body.city || loc.city,
      region: req.body.region || loc.region,
      country: req.body.country || loc.country,
      isLocal: loc.isLocal,
    };

    const analytics = await mongoService.recordVisit(visitData);
    res.json({ success: true, place: `${loc.city}, ${loc.region}` });
  } catch (err) {
    console.error('Visit recording error:', err);
    res.status(500).json({ error: 'Failed to log visit' });
  }
});

app.get('/api/analytics', async (req, res) => {
  try {
    const analytics = await mongoService.getAnalytics();
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// ---------------------------------------------------------------------------
// Rate Limiting Guards for Admin Authentication & Security
// ---------------------------------------------------------------------------
export const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute window
  max: 5, // Limit to 5 failed login attempts per 15 minutes per IP
  skipSuccessfulRequests: true, // Legitimate successful logins do NOT count against the limit
  standardHeaders: true, // Return RateLimit-* headers
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: 'Too many failed login attempts from this IP. For security, access is temporarily locked. Please try again after 15 minutes.',
      retryAfterMinutes: 15,
    });
  },
});

export const adminOtpRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute window
  max: 3, // Max 3 OTP emails per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: 'Too many OTP requests from this address. Please wait 15 minutes before requesting a new code.',
      retryAfterMinutes: 15,
    });
  },
});

export const adminOtpVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute window
  max: 5, // Max 5 incorrect OTP verification attempts
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: 'Too many invalid OTP attempts. For security, please wait 15 minutes before trying again.',
      retryAfterMinutes: 15,
    });
  },
});

// ---------------------------------------------------------------------------
// Admin Login & Password Reset (Stored in MongoDB with Email OTP)
// ---------------------------------------------------------------------------
app.post('/api/admin/login', adminLoginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const verified = await mongoService.verifyAdminLogin(username, password);
    if (verified) {
      return res.json({
        success: true,
        token: `skj_admin_${Date.now()}_auth`,
        user: {
          name: verified.name,
          username: verified.username,
          role: verified.role,
          shop: 'Shree Kamakshi Jewellery Works',
        },
      });
    }

    res.status(401).json({ success: false, error: 'Invalid username or password' });
  } catch (err) {
    res.status(500).json({ error: 'Authentication failed: ' + err.message });
  }
});

// Step 1: Request OTP for Forgot Password
app.post('/api/admin/forgot-password', adminOtpRequestLimiter, async (req, res) => {
  try {
    const { emailOrUsername } = req.body;
    if (!emailOrUsername) {
      return res.status(400).json({ error: 'Please enter your username or registered email' });
    }

    const admin = await mongoService.findAdmin(emailOrUsername);
    if (!admin) {
      return res.status(404).json({ error: 'No admin account found matching this username or email' });
    }

    // Generate 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    // Save in MongoDB
    await mongoService.setAdminResetOtp(admin.username, otp, expires);

    // Send Email
    const emailResult = await sendOtpEmail(admin.email, otp, admin.name);

    // Mask email for display: e.g. sk***ar@gmail.com
    const [userPart, domain] = admin.email.split('@');
    const masked = userPart.length > 3
      ? `${userPart.slice(0, 2)}***${userPart.slice(-1)}@${domain}`
      : `${userPart[0]}***@${domain}`;

    res.json({
      success: true,
      message: `Verification OTP has been sent to your registered email (${masked})`,
      maskedEmail: masked,
      mode: emailResult.mode,
      previewOtp: emailResult.previewOtp, // for instant test fill when no SMTP configured yet
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Failed to process password reset request' });
  }
});

// Step 2: Reset Password with OTP
app.post('/api/admin/reset-password', adminOtpVerifyLimiter, async (req, res) => {
  try {
    const { emailOrUsername, otp, newPassword } = req.body;
    if (!emailOrUsername || !otp || !newPassword) {
      return res.status(400).json({ error: 'All fields (Username/Email, OTP, and New Password) are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }

    const result = await mongoService.resetAdminPassword(emailOrUsername, otp.trim(), newPassword);
    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json({
      success: true,
      message: 'Password has been successfully updated in MongoDB! You can now log in.',
    });
  } catch (err) {
    console.error('Password reset error:', err);
    res.status(500).json({ error: 'Failed to reset password: ' + err.message });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`✦ Shree Kamakshi Jewellery Works - Backend API Engine ✦`);
  console.log(`  Live at:  http://localhost:${PORT}`);
  console.log(`  Database: MongoDB Atlas (Cluster0: shree_kamakshi)`);
  console.log(`  Health:   http://localhost:${PORT}/api/health`);
  console.log(`  Cloud:    ${isCloudinaryConfigured ? 'Cloudinary (Active)' : 'Local File Storage Fallback'}`);
  console.log(`=======================================================`);
});
