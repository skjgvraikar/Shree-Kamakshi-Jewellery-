import mongoose from 'mongoose';

// 1. Rate Schema
const RateSchema = new mongoose.Schema({
  gold22: { type: Number, required: true },
  gold24: { type: Number, required: true },
  silver: { type: Number, required: true },
  change: {
    gold22: { type: String, default: '+ ₹125 (0.86%)' },
    gold24: { type: String, default: '+ ₹140 (0.88%)' },
    silver: { type: String, default: '+ ₹3 (1.10%)' },
    gold22Direction: { type: String, default: 'up' },
    gold24Direction: { type: String, default: 'up' },
    silverDirection: { type: String, default: 'up' },
  },
  updatedAt: { type: Date, default: Date.now },
});

// 2. Setting Schema
const SettingSchema = new mongoose.Schema({
  name: { type: String, default: 'Shree Kamakshi Jewellery Works' },
  tagline: { type: String, default: 'Traditional Craftsmanship • Pure 916 Hallmark Gold • Trusted Generations' },
  phones: [{ type: String }],
  email: { type: String, default: 'skjgvraikar@gmail.com' },
  whatsapp: { type: String, default: 'https://wa.me/919448628575' },
  address: {
    line1: { type: String, default: 'B H Road' },
    city: { type: String, default: 'Talaguppa' },
    pincode: { type: String, default: '577430' },
    state: { type: String, default: 'Karnataka' },
    full: { type: String, default: 'B H Road, Talaguppa – 577430' },
  },
  hours: {
    display: { type: String, default: 'Open every day, 10:00 am – 2:30 pm and 4:00 pm – 9:30 pm. Sunday holiday.' },
    morningOpen: { type: String, default: '10:00' },
    morningClose: { type: String, default: '14:30' },
    eveningOpen: { type: String, default: '16:00' },
    eveningClose: { type: String, default: '21:30' },
    closedDays: [{ type: Number, default: 0 }],
  },
  owner: {
    name: { type: String, default: 'Veerendra G Raikar' },
    title: { type: String, default: 'Proprietor & Master Craftsman' },
    photo: { type: String, default: '/images/owner.jpg' },
    quote: { type: String, default: 'Crafting trust, purity and elegance into every ornament — serving families across Talaguppa with pride and passion.' },
    fatherName: { type: String, default: 'Late Sri G. Raikar' },
    fatherPhoto: { type: String, default: '/images/owner.jpg' },
    fatherTribute: { type: String, default: 'Founded on the timeless wisdom and sacred craftsmanship of our beloved founder, Late Sri G. Raikar, who believed a goldsmith’s greatest asset is uncompromised honesty and unwavering purity.' },
    legacyStory: { type: String, default: 'For decades, Shree Kamakshi Jewellery Works has been a cornerstone of trust in Talaguppa. From bridal temple necklaces to heirloom bangles and sacred pooja silver, each creation is crafted with devotion, certified 916 BIS Hallmark purity, and transparent pricing that honors our ancestral commitment.' },
  },
  updatedAt: { type: Date, default: Date.now },
});

// 3. Category Schema
const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  tagline: { type: String, default: '' },
  count: { type: String, default: '' },
  image: { type: String, required: true },
  accent: { type: String, default: 'Hallmark 916' },
  order: { type: Number, default: 0 },
});

// 4. Product Schema
const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  categoryKn: { type: String, default: '' },
  images: [{ type: String }],
  tag: { type: String, default: 'Handcrafted' },
  tagKn: { type: String, default: 'ಕರಕುಶಲ' },
  badge: { type: String, default: 'BIS 916' },
  featured: { type: Boolean, default: false },
  variations: [{ type: Object }],
  createdAt: { type: Date, default: Date.now },
});

// 5. Enquiry Schema
const EnquirySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  type: { type: String, default: 'General Enquiry' },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'Contacted', 'Completed'], default: 'New' },
  createdAt: { type: Date, default: Date.now },
});

// 6. Analytics Schema
const AnalyticsSchema = new mongoose.Schema({
  totalVisits: { type: Number, default: 0 },
  uniqueVisitors: { type: Number, default: 0 },
  cityBreakdown: [
    {
      city: String,
      region: String,
      country: String,
      count: { type: Number, default: 1 },
    },
  ],
  deviceBreakdown: {
    mobile: { type: Number, default: 0 },
    desktop: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 },
  },
  dailyTrends: [
    {
      date: String,
      visits: { type: Number, default: 0 },
      unique: { type: Number, default: 0 },
    },
  ],
  recentVisits: [{ type: Object }],
  updatedAt: { type: Date, default: Date.now },
});

// 7. Admin User Schema (Stored in MongoDB with OTP reset capabilities)
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  name: { type: String, default: 'Veerendra Raikar' },
  role: { type: String, default: 'Owner / Administrator' },
  resetOtp: { type: String, default: null },
  resetOtpExpires: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const RateModel = mongoose.model('Rate', RateSchema);
export const SettingModel = mongoose.model('Setting', SettingSchema);
export const CategoryModel = mongoose.model('Category', CategorySchema);
export const ProductModel = mongoose.model('Product', ProductSchema);
export const EnquiryModel = mongoose.model('Enquiry', EnquirySchema);
export const AnalyticsModel = mongoose.model('Analytics', AnalyticsSchema);
export const AdminModel = mongoose.model('Admin', AdminSchema);

export default {
  RateModel,
  SettingModel,
  CategoryModel,
  ProductModel,
  EnquiryModel,
  AnalyticsModel,
  AdminModel,
};

