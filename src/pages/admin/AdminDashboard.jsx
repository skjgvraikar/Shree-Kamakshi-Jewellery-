import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FaChartPie,
  FaEnvelopeOpenText,
  FaThLarge,
  FaGem,
  FaSlidersH,
  FaSignOutAlt,
  FaExternalLinkAlt,
  FaShieldAlt,
  FaSyncAlt,
  FaUserCircle,
} from 'react-icons/fa';

import AdminLogin from './AdminLogin';
import OverviewTab from './OverviewTab';
import EnquiriesTab from './EnquiriesTab';
import CategoriesTab from './CategoriesTab';
import ProductsTab from './ProductsTab';
import FrontendSettingsTab from './FrontendSettingsTab';

import { fetchAnalytics } from '../../api/analytics';
import { fetchEnquiries, updateEnquiryStatus, deleteEnquiry } from '../../api/enquiries';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../api/categories';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../api/products';
import { fetchRates, updateRates } from '../../api/rates';
import { fetchSettings, updateSettings } from '../../api/settings';

export function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview | enquiries | categories | products | settings
  const [loading, setLoading] = useState(true);

  // Data states
  const [analytics, setAnalytics] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [rates, setRates] = useState(null);
  const [settings, setSettings] = useState(null);

  // Check auth session
  useEffect(() => {
    const token = sessionStorage.getItem('skj_admin_token');
    const userStr = sessionStorage.getItem('skj_admin_user');
    if (token && userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (e) {
        setCurrentUser({ name: 'Veerendra Raikar', role: 'Proprietor' });
      }
    }
    setLoading(false);
  }, []);

  // Fetch all backend data
  const loadAllData = async () => {
    try {
      const [anRes, enqRes, catRes, prodRes, ratesRes, setRes] = await Promise.all([
        fetchAnalytics(),
        fetchEnquiries(),
        fetchCategories(),
        fetchProducts(),
        fetchRates(),
        fetchSettings(),
      ]);

      setAnalytics(anRes.data);
      setEnquiries(enqRes);
      setCategories(catRes.data);
      setProducts(prodRes.data);
      setRates(ratesRes.data);
      setSettings(setRes.data);
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadAllData();
    }
  }, [currentUser]);

  const handleLogout = () => {
    sessionStorage.removeItem('skj_admin_token');
    sessionStorage.removeItem('skj_admin_user');
    setCurrentUser(null);
  };

  // If not authenticated, show luxury white & gold login
  if (!currentUser) {
    return <AdminLogin onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  // Handlers for data actions
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateEnquiryStatus(id, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDeleteEnquiry = async (id) => {
    try {
      await deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      alert('Failed to delete enquiry');
    }
  };

  const handleAddCategory = async (newCatData) => {
    const res = await createCategory(newCatData);
    if (res.category) {
      setCategories((prev) => [...prev, res.category]);
    }
  };

  const handleUpdateCategory = async (id, catData) => {
    const res = await updateCategory(id, catData);
    if (res.category) {
      setCategories((prev) =>
        prev.map((c) => (c.id === id || c.slug === id ? res.category : c))
      );
    }
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id && c.slug !== id));
  };

  const handleAddProduct = async (newProdData) => {
    const res = await createProduct(newProdData);
    if (res.product) {
      setProducts((prev) => [res.product, ...prev]);
    }
  };

  const handleUpdateProduct = async (id, prodData) => {
    const res = await updateProduct(id, prodData);
    if (res.product) {
      setProducts((prev) => prev.map((p) => (p.id === id ? res.product : p)));
    }
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdateRates = async (newRates) => {
    const res = await updateRates(newRates);
    if (res.rates) {
      setRates(res.rates);
    }
  };

  const handleUpdateSettings = async (newSettings) => {
    const res = await updateSettings(newSettings);
    if (res.settings) {
      setSettings(res.settings);
    }
  };

  const unreadEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 font-sans flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900">
      <Helmet>
        <title>Admin Console | Shree Kamakshi Jewellery Works</title>
      </Helmet>

      <div>
        {/* Top Executive Header - White & Gold */}
        <header className="bg-white border-b border-amber-200/80 sticky top-0 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
            {/* Left: Brand & Gold Photo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full p-0.5 border-2 border-amber-400 bg-amber-50 shadow-sm">
                  <img
                    src="/images/god.jpg"
                    alt="Shree Kamakshi Devi"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-cinzel text-base sm:text-lg font-bold text-stone-900 leading-tight">
                    Shree Kamakshi
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 uppercase">
                    Admin
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 hidden sm:block">
                  Talaguppa, Karnataka • Showroom Management
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 text-stone-600 hover:text-amber-800 hover:border-amber-300 text-xs font-semibold transition"
              >
                <span>View Live Website</span>
                <FaExternalLinkAlt className="text-[10px]" />
              </a>

              <button
                onClick={loadAllData}
                title="Refresh Live Data"
                className="p-2 rounded-xl text-stone-500 hover:text-amber-700 hover:bg-stone-50 border border-stone-200 transition cursor-pointer"
              >
                <FaSyncAlt className="text-xs" />
              </button>

              <div className="h-6 w-px bg-stone-200 hidden sm:block" />

              <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block text-xs">
                  <span className="font-bold text-stone-900 block leading-tight">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-stone-400">{currentUser.role}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-red-50 text-stone-600 hover:text-red-700 text-xs font-semibold transition cursor-pointer"
                  title="Sign Out"
                >
                  <FaSignOutAlt className="text-xs" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs (White & Gold Pills) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-stone-200/80">
            <button
              onClick={() => setActiveTab('overview')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              <FaChartPie className="text-sm" />
              <span>Overview & Visitors</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer relative ${
                activeTab === 'enquiries'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              <FaEnvelopeOpenText className="text-sm" />
              <span>Customer Enquiries</span>
              {unreadEnquiriesCount > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === 'enquiries' ? 'bg-white text-amber-800' : 'bg-amber-600 text-white'
                }`}>
                  {unreadEnquiriesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'categories'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              <FaThLarge className="text-sm" />
              <span>Categories & Banners</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              <FaGem className="text-sm" />
              <span>Ornaments Catalogue</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              <FaSlidersH className="text-sm" />
              <span>Live Rates & Frontend Control</span>
            </button>
          </div>

          {/* Active Tab View */}
          {activeTab === 'overview' && (
            <OverviewTab
              analytics={analytics}
              enquiries={enquiries}
              rates={rates}
              onTabChange={setActiveTab}
            />
          )}

          {activeTab === 'enquiries' && (
            <EnquiriesTab
              enquiries={enquiries}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteEnquiry}
            />
          )}

          {activeTab === 'categories' && (
            <CategoriesTab
              categories={categories}
              onAddCategory={handleAddCategory}
              onUpdateCategory={handleUpdateCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          )}

          {activeTab === 'products' && (
            <ProductsTab
              products={products}
              categories={categories}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}

          {activeTab === 'settings' && (
            <FrontendSettingsTab
              rates={rates}
              settings={settings}
              onUpdateRates={handleUpdateRates}
              onUpdateSettings={handleUpdateSettings}
            />
          )}
        </main>
      </div>

      {/* Admin Dashboard Footer - Amoga & Shivam Promotion (User requirement) */}
      <footer className="bg-white border-t border-amber-200/80 py-6 px-4 sm:px-6 lg:px-8 mt-12 font-sans text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Shree Kamakshi Jewellery Works • Admin Portal</p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-stone-600">
            <span>Framed & Designed by <strong className="text-amber-800 font-semibold">Amoga</strong></span>
            <span className="text-stone-300">•</span>
            <span>
              Developed by{' '}
              <a
                href="https://my-portfoliyo-nine.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 hover:text-amber-900 font-semibold underline underline-offset-2 inline-flex items-center gap-1 transition"
              >
                <span>Shivam</span>
                <FaExternalLinkAlt className="text-[9px]" />
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AdminDashboard;

