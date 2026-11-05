# Shree Kamakshi Jewellery Works — Full-Stack Web Application

A luxury, fully responsive production web application and administration suite for **Shree Kamakshi Jewellery Works** (Talaguppa, Karnataka), built with **React 18 + Vite**, **Node.js / Express**, **Tailwind CSS**, and **Cloudinary**.

Framed & Designed by **Amoga** • Developed by [**Shivam**](https://my-portfoliyo-nine.vercel.app/)

---

## 🌟 Key Features & Architecture

### 1. Consumer Storefront
- **Clean Multi-Page Architecture**:
  - **Home Page (`/`)**: High-impact luxury showcase featuring Hero with Goddess Kamakshi photo in a glowing arch, Live Gold & Silver Rates, Heritage & Proprietor story, Curated Category Showcase cards, Comparison table, Visit Us showroom map, and Contact Enquiry form.
  - **Dedicated Products Catalogue (`/products`)**: Filter by category (`?category=Necklaces`), search bar, design variations lightbox modal, and enquiry prefill.
- **Bilingual Support (English & ಕನ್ನಡ)**:
  - Instant language switcher in the Navbar.
  - Crisp typography using **Noto Sans Kannada** and **Plus Jakarta Sans**.
  - Persisted in `localStorage`.
- **Live Precious Metal Rates**:
  - **Gold 22K (916 Hallmark)**, **Gold 24K (999 Purity)**, and **Silver Bullion**.
  - Interactive unit switch: **1 Gram** vs **10 Grams (1 Tola)**.
  - Auto-refreshes every 5 minutes (`useRates`).
- **Dynamic "Open Now / Closed Now" Badge**:
  - Calculated from showroom hours: **10:00 AM – 2:30 PM** & **4:00 PM – 9:30 PM** (Closed Sundays & 2:30–4:00 PM).
  - Updates every minute.

---

### 2. Express Backend Engine & Cloudinary
- **Node.js Express Server (`server/index.js`)** running on port `5000`.
- **Cloudinary Image Storage (`server/cloudinary.js`)**:
  - Direct media upload for Category banners, Ornament design variations, and Proprietor photos.
  - Automatic fallback to high-speed local static storage (`/uploads/`) if Cloudinary credentials are not configured in `.env`.
- **Visitor Analytics & Place-Wise Geolocation (`server/analytics.js`)**:
  - IP-based location resolution using `geoip-lite`.
  - Tracks total visits, unique visitors, place/city distribution (e.g. Talaguppa, Sagar, Shivamogga, Bengaluru), and device platforms (Mobile vs Desktop vs Tablet).
- **Persistent Storage (`server/db.js`)**:
  - File-based JSON database under `server/data/` seeded with comprehensive jewellery catalogue, rates, settings, and enquiries.

---

### 3. White & Gold Admin Dashboard (`/admin`)
- Accessible at: **`http://localhost:3000/admin`**
- **Aesthetic**: Tailored **White & Gold** executive theme (`#FFFFFF` background, `#D4AF37` warm gold borders and badges, with the sacred Goddess Kamakshi gold photo prominently featured in header and sidebar).
- **Default Login Credentials**:
  - **Username**: `admin`
  - **Password**: `kamakshi@2025` *(or click "Fill Demo Credentials")*
- **Admin Capabilities**:
  1. **Overview & Visitor Geolocation**:
     - Live visitor counters and unique IP metrics.
     - **Place-Wise Visitor Breakdown**: Interactive table and visual bars showing visitors by city and region.
     - Device platform split and weekly visitor trends.
  2. **Customer Enquiries Console**:
     - Real-time customer messages with instant **WhatsApp** and **Tap-to-call** buttons.
     - Status workflow: `New`, `Contacted`, `Completed`.
  3. **Categories & Showcase Manager**:
     - **Upload Category Images directly to Cloudinary**.
     - **Add New Categories** with custom tags, purity accents, and slugs.
     - **Remove Category** with 1 click.
     - **Replace Image** on any existing category.
  4. **Ornaments Catalogue Manager**:
     - Add new jewellery designs, upload high-res photos via Cloudinary, and manage showcase items.
  5. **Frontend Full Control**:
     - Update daily **Gold 22K**, **Gold 24K**, and **Silver** prices with instant publishing to the live website.
     - Update showroom contact phones, email, physical address, and opening hours.
     - Update proprietor name, founder tribute, and upload new photos.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (`.env`)
```env
# Frontend API Base URL
VITE_API_BASE_URL=http://localhost:5000

# Backend Port
PORT=5000

# Cloudinary Image Storage (Optional - falls back to local storage if empty)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Dashboard
ADMIN_USER=admin
ADMIN_PASSWORD=kamakshi@2025
```

### 3. Start Development Servers

**Run the Backend API Server:**
```bash
npm run server
# Live at http://localhost:5000
```

**Run the Frontend Dev Server (in a second terminal):**
```bash
npm run dev
# Live at http://localhost:3000
# Admin Dashboard at http://localhost:3000/admin
```

### 4. Build for Production
```bash
npm run build
```

---

## 👨‍💻 Credits & Promotion
- **Framed & Designed by**: **Amoga**
- **Developed by**: [**Shivam**](https://my-portfoliyo-nine.vercel.app/)
