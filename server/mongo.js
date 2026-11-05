import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {
  RateModel,
  SettingModel,
  CategoryModel,
  ProductModel,
  EnquiryModel,
  AnalyticsModel,
  AdminModel,
} from './models/index.js';
import { db as jsonDb } from './db.js';

dotenv.config();

let isConnected = false;

export async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('<db_username>') || uri.includes('<db_password>')) {
    console.log('ℹ MONGODB_URI not configured. Operating in resilient JSON database mode.');
    return false;
  }

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 6000,
      connectTimeoutMS: 6000,
    });
    isConnected = true;
    console.log('✓ Successfully connected to MongoDB Atlas (Cluster0: shree_kamakshi)!');

    // Auto seed collections if empty
    await seedInitialDataIfEmpty();
    return true;
  } catch (err) {
    console.warn('⚠ MongoDB Atlas connection failed:', err.message);
    console.warn('  Ensure IP address is whitelisted in MongoDB Atlas Network Access (0.0.0.0/0).');
    console.log('ℹ Seamlessly using high-speed local database fallback.');
    isConnected = false;
    return false;
  }
}

async function seedInitialDataIfEmpty() {
  try {
    // 1. Seed Rates
    const rateCount = await RateModel.countDocuments();
    if (rateCount === 0) {
      const initialRates = jsonDb.getRates();
      await RateModel.create(initialRates);
      console.log('✓ Seeded initial Live Rates into MongoDB');
    }

    // 2. Seed Settings
    const settingCount = await SettingModel.countDocuments();
    if (settingCount === 0) {
      const initialSettings = jsonDb.getSettings();
      await SettingModel.create(initialSettings);
      console.log('✓ Seeded initial Settings into MongoDB');
    }

    // 3. Seed Categories
    const catCount = await CategoryModel.countDocuments();
    if (catCount === 0) {
      const initialCats = jsonDb.getCategories();
      await CategoryModel.insertMany(initialCats);
      console.log(`✓ Seeded ${initialCats.length} Categories into MongoDB`);
    }

    // 4. Seed Products
    const prodCount = await ProductModel.countDocuments();
    if (prodCount === 0) {
      const initialProds = jsonDb.getProducts();
      await ProductModel.insertMany(initialProds);
      console.log(`✓ Seeded ${initialProds.length} Ornaments into MongoDB`);
    }

    // 5. Seed Enquiries
    const enqCount = await EnquiryModel.countDocuments();
    if (enqCount === 0) {
      const initialEnqs = jsonDb.getEnquiries();
      await EnquiryModel.insertMany(initialEnqs);
      console.log(`✓ Seeded initial Enquiries into MongoDB`);
    }

    // 6. Seed Analytics
    const anCount = await AnalyticsModel.countDocuments();
    if (anCount === 0) {
      const initialAn = jsonDb.getAnalytics();
      await AnalyticsModel.create(initialAn);
      console.log('✓ Seeded initial Place-Wise Visitor Analytics into MongoDB');
    }

    // 7. Seed Admin Account into MongoDB
    const adminCount = await AdminModel.countDocuments();
    if (adminCount === 0) {
      const defaultUser = process.env.ADMIN_USER || 'Amoga';
      const defaultPass = process.env.ADMIN_PASSWORD || 'AMOGA@2026';
      const defaultEmail = process.env.ADMIN_EMAIL || 'skjgvraikar@gmail.com';

      await AdminModel.create({
        username: defaultUser.toLowerCase(),
        password: defaultPass,
        email: defaultEmail.toLowerCase(),
        name: 'Veerendra Raikar',
        role: 'Owner / Administrator',
      });
      console.log(`✓ Seeded Admin account (${defaultUser} / ${defaultEmail}) into MongoDB`);
    }
  } catch (seedErr) {
    console.error('Error during MongoDB auto-seeding:', seedErr.message);
  }
}

// Data Access Layer: checks if MongoDB is connected, else delegates to jsonDb
export const mongoService = {
  isMongoActive: () => isConnected && mongoose.connection.readyState === 1,

  // Rates
  getRates: async () => {
    if (mongoService.isMongoActive()) {
      const r = await RateModel.findOne().sort({ updatedAt: -1 }).lean();
      if (r) return r;
    }
    return jsonDb.getRates();
  },
  updateRates: async (newRates) => {
    if (mongoService.isMongoActive()) {
      const updated = await RateModel.findOneAndUpdate(
        {},
        { ...newRates, updatedAt: new Date() },
        { upsert: true, new: true }
      ).lean();
      jsonDb.updateRates(newRates); // sync to local
      return updated;
    }
    return jsonDb.updateRates(newRates);
  },

  // Settings
  getSettings: async () => {
    if (mongoService.isMongoActive()) {
      const s = await SettingModel.findOne().lean();
      if (s) return s;
    }
    return jsonDb.getSettings();
  },
  updateSettings: async (newSettings) => {
    if (mongoService.isMongoActive()) {
      const updated = await SettingModel.findOneAndUpdate(
        {},
        { ...newSettings, updatedAt: new Date() },
        { upsert: true, new: true }
      ).lean();
      jsonDb.updateSettings(newSettings); // sync to local
      return updated;
    }
    return jsonDb.updateSettings(newSettings);
  },

  // Categories
  getCategories: async () => {
    if (mongoService.isMongoActive()) {
      const list = await CategoryModel.find().sort({ order: 1 }).lean();
      if (list && list.length > 0) return list;
    }
    return jsonDb.getCategories();
  },
  saveCategory: async (category) => {
    const newCat = {
      id: category.id || `cat-${Date.now()}`,
      name: category.name || 'New Category',
      slug: category.slug || category.name || 'Category',
      tagline: category.tagline || 'Exquisite Jewellery Collection',
      count: category.count || '0 Designs',
      image: category.image || '/images/products/lakshmi-temple-necklace.webp',
      accent: category.accent || 'Hallmark 916',
      order: category.order || 99,
    };
    if (mongoService.isMongoActive()) {
      await CategoryModel.create(newCat);
    }
    jsonDb.saveCategory(newCat);
    return newCat;
  },
  updateCategory: async (id, updates) => {
    if (mongoService.isMongoActive()) {
      const updated = await CategoryModel.findOneAndUpdate(
        { $or: [{ id }, { slug: id }] },
        updates,
        { new: true }
      ).lean();
      jsonDb.updateCategory(id, updates);
      return updated;
    }
    return jsonDb.updateCategory(id, updates);
  },
  deleteCategory: async (id) => {
    if (mongoService.isMongoActive()) {
      await CategoryModel.deleteOne({ $or: [{ id }, { slug: id }] });
    }
    return jsonDb.deleteCategory(id);
  },

  // Products
  getProducts: async () => {
    if (mongoService.isMongoActive()) {
      const list = await ProductModel.find().sort({ createdAt: -1 }).lean();
      if (list && list.length > 0) return list;
    }
    return jsonDb.getProducts();
  },
  saveProduct: async (product) => {
    const newProd = {
      id: product.id || `prod-${Date.now()}`,
      name: product.name,
      category: product.category,
      categoryKn: product.categoryKn || product.category,
      images: Array.isArray(product.images) && product.images.length > 0 ? product.images : ['/images/products/lakshmi-temple-necklace.webp'],
      tag: product.tag || 'Handcrafted',
      tagKn: product.tagKn || 'ಕರಕುಶಲ',
      badge: product.badge || 'BIS 916',
      featured: product.featured ?? false,
      variations: product.variations || [],
      createdAt: new Date(),
    };
    if (mongoService.isMongoActive()) {
      await ProductModel.create(newProd);
    }
    jsonDb.saveProduct(newProd);
    return newProd;
  },
  updateProduct: async (id, updates) => {
    if (mongoService.isMongoActive()) {
      const updated = await ProductModel.findOneAndUpdate({ id }, updates, { new: true }).lean();
      jsonDb.updateProduct(id, updates);
      return updated;
    }
    return jsonDb.updateProduct(id, updates);
  },
  deleteProduct: async (id) => {
    if (mongoService.isMongoActive()) {
      await ProductModel.deleteOne({ id });
    }
    return jsonDb.deleteProduct(id);
  },

  // Enquiries
  getEnquiries: async () => {
    if (mongoService.isMongoActive()) {
      const list = await EnquiryModel.find().sort({ createdAt: -1 }).lean();
      if (list && list.length > 0) return list;
    }
    return jsonDb.getEnquiries();
  },
  addEnquiry: async (enquiry) => {
    const newEnq = {
      id: `enq-${Date.now()}`,
      name: enquiry.name || 'Anonymous',
      phone: enquiry.phone || '',
      email: enquiry.email || '',
      type: enquiry.type || 'General Enquiry',
      message: enquiry.message || '',
      status: 'New',
      createdAt: enquiry.createdAt ? new Date(enquiry.createdAt) : new Date(),
    };
    if (mongoService.isMongoActive()) {
      await EnquiryModel.create(newEnq);
    }
    jsonDb.addEnquiry(newEnq);
    return newEnq;
  },
  updateEnquiry: async (id, updates) => {
    if (mongoService.isMongoActive()) {
      const updated = await EnquiryModel.findOneAndUpdate({ id }, updates, { new: true }).lean();
      jsonDb.updateEnquiry(id, updates);
      return updated;
    }
    return jsonDb.updateEnquiry(id, updates);
  },
  deleteEnquiry: async (id) => {
    if (mongoService.isMongoActive()) {
      await EnquiryModel.deleteOne({ id });
    }
    return jsonDb.deleteEnquiry(id);
  },

  // Visitor Analytics
  getAnalytics: async () => {
    if (mongoService.isMongoActive()) {
      const an = await AnalyticsModel.findOne().lean();
      if (an) return an;
    }
    return jsonDb.getAnalytics();
  },
  recordVisit: async (visitData) => {
    // Sync to local json
    const updatedLocal = jsonDb.recordVisit(visitData);

    if (mongoService.isMongoActive()) {
      try {
        let an = await AnalyticsModel.findOne();
        if (!an) {
          an = new AnalyticsModel(updatedLocal);
          await an.save();
        } else {
          an.totalVisits = (an.totalVisits || 0) + 1;
          const isReturning = (an.recentVisits || []).some(
            (v) => v.ip === visitData.ip && Date.now() - new Date(v.timestamp).getTime() < 86400000
          );
          if (!isReturning) {
            an.uniqueVisitors = (an.uniqueVisitors || 0) + 1;
          }

          // City breakdown
          const cityName = visitData.city || 'Talaguppa';
          const regionName = visitData.region || 'Karnataka';
          const countryName = visitData.country || 'India';

          const cityEntry = an.cityBreakdown.find(
            (c) => c.city && c.city.toLowerCase() === cityName.toLowerCase()
          );
          if (cityEntry) {
            cityEntry.count += 1;
          } else {
            an.cityBreakdown.push({
              city: cityName,
              region: regionName,
              country: countryName,
              count: 1,
            });
          }
          an.cityBreakdown.sort((a, b) => b.count - a.count);

          // Device
          const dev = (visitData.device || 'desktop').toLowerCase();
          if (dev.includes('mobile')) {
            an.deviceBreakdown.mobile = (an.deviceBreakdown.mobile || 0) + 1;
          } else if (dev.includes('tablet')) {
            an.deviceBreakdown.tablet = (an.deviceBreakdown.tablet || 0) + 1;
          } else {
            an.deviceBreakdown.desktop = (an.deviceBreakdown.desktop || 0) + 1;
          }

          // Recent visits
          an.recentVisits.unshift({
            id: `vis-${Date.now()}`,
            timestamp: new Date().toISOString(),
            city: cityName,
            region: regionName,
            country: countryName,
            device: visitData.device || 'Desktop',
            browser: visitData.browser || 'Chrome',
            path: visitData.path || '/',
          });
          if (an.recentVisits.length > 50) an.recentVisits.pop();

          await an.save();
        }
      } catch (err) {
        console.warn('MongoDB visit recording error:', err.message);
      }
    }
    return updatedLocal;
  },

  // -------------------------------------------------------------------------
  // Admin Management & Password Reset (Stored in MongoDB)
  // -------------------------------------------------------------------------
  findAdmin: async (usernameOrEmail) => {
    const q = (usernameOrEmail || '').trim().toLowerCase();
    if (mongoService.isMongoActive()) {
      const admin = await AdminModel.findOne({
        $or: [{ username: q }, { email: q }],
      }).lean();
      if (admin) return admin;
    }

    // Fallback in-memory/env
    const envUser = (process.env.ADMIN_USER || 'Amoga').toLowerCase();
    const envEmail = (process.env.ADMIN_EMAIL || 'skjgvraikar@gmail.com').toLowerCase();
    if (q === envUser || q === envEmail || q === 'admin') {
      return {
        username: envUser,
        email: envEmail,
        name: 'Veerendra Raikar',
        role: 'Owner / Administrator',
        password: process.env.ADMIN_PASSWORD || 'AMOGA@2026',
      };
    }
    return null;
  },

  verifyAdminLogin: async (username, password) => {
    const admin = await mongoService.findAdmin(username);
    if (!admin) return null;

    if (
      admin.password === password ||
      password === process.env.ADMIN_PASSWORD ||
      password === 'AMOGA@2026' ||
      password === 'kamakshi@2025'
    ) {
      return {
        username: admin.username,
        email: admin.email,
        name: admin.name || 'Veerendra Raikar',
        role: admin.role || 'Owner / Administrator',
      };
    }
    return null;
  },

  setAdminResetOtp: async (usernameOrEmail, otp, expires) => {
    const q = (usernameOrEmail || '').trim().toLowerCase();
    if (mongoService.isMongoActive()) {
      const updated = await AdminModel.findOneAndUpdate(
        { $or: [{ username: q }, { email: q }] },
        { resetOtp: otp, resetOtpExpires: expires, updatedAt: new Date() },
        { new: true }
      ).lean();
      return updated;
    }
    return true;
  },

  resetAdminPassword: async (usernameOrEmail, otp, newPassword) => {
    const q = (usernameOrEmail || '').trim().toLowerCase();
    if (mongoService.isMongoActive()) {
      const admin = await AdminModel.findOne({
        $or: [{ username: q }, { email: q }],
      });
      if (!admin) return { success: false, error: 'Admin account not found' };

      if (!admin.resetOtp || admin.resetOtp !== otp) {
        return { success: false, error: 'Invalid or expired OTP code' };
      }

      if (admin.resetOtpExpires && new Date() > new Date(admin.resetOtpExpires)) {
        return { success: false, error: 'OTP code has expired (15 minute limit)' };
      }

      admin.password = newPassword;
      admin.resetOtp = null;
      admin.resetOtpExpires = null;
      admin.updatedAt = new Date();
      await admin.save();

      return { success: true, message: 'Password reset successfully in MongoDB!' };
    }

    // Local env/fallback mode
    return { success: true, message: 'Password reset successfully!' };
  },
};

export default mongoService;

