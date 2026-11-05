import React, { useState, useRef } from 'react';
import {
  FaPlus,
  FaTrashAlt,
  FaSearch,
  FaImage,
  FaCloudUploadAlt,
  FaGem,
  FaCheck,
  FaTimes,
  FaEdit,
} from 'react-icons/fa';
import { uploadImageFile } from '../../api/upload';

export function ProductsTab({ products, categories, onAddProduct, onUpdateProduct, onDeleteProduct }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  // New Product Form
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories?.[0]?.slug || 'Necklaces');
  const [tag, setTag] = useState('Handcrafted');
  const [badge, setBadge] = useState('BIS 916');
  const [image, setImage] = useState('/images/products/lakshmi-temple-necklace.webp');
  const [featured, setFeatured] = useState(false);

  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadImageFile(file, 'products');
      if (res.url) {
        setImage(res.url);
      }
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await onAddProduct({
        name: name.trim(),
        category,
        tag,
        badge,
        images: [image],
        featured,
      });

      setName('');
      setImage('/images/products/lakshmi-temple-necklace.webp');
      setIsAdding(false);
    } catch (err) {
      alert('Failed to save product: ' + err.message);
    }
  };

  const filteredProducts = (products || []).filter((p) => {
    const matchesSearch = (p.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCat === 'ALL' || p.category === selectedCat;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 font-sans">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Top Filter and Actions */}
      <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search ornaments by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        {/* Category Filter & Add Product Button */}
        <div className="flex items-center gap-3">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700 font-semibold focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">All Categories</option>
            {(categories || []).map((cat) => (
              <option key={cat.id || cat.slug} value={cat.slug || cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:from-amber-700 hover:to-amber-600 transition cursor-pointer"
          >
            <FaPlus />
            <span>{isAdding ? 'Close' : 'Add Ornament'}</span>
          </button>
        </div>
      </div>

      {/* Add New Product Form */}
      {isAdding && (
        <div className="bg-white p-6 rounded-3xl border-2 border-amber-400 shadow-md">
          <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FaPlus className="text-amber-600" />
            <span>Add New Ornament to Showroom</span>
          </h4>

          <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Ornament Name * (e.g. Temple Choker)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Bridal Lakshmi Haram"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500"
                >
                  {(categories || []).map((cat) => (
                    <option key={cat.id || cat.slug} value={cat.slug || cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Hallmark / Purity Badge
                </label>
                <input
                  type="text"
                  placeholder="e.g. BIS 916 Hallmark"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-stone-700 font-semibold mb-2">
                Ornament Photo (Upload via Cloudinary)
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl border border-stone-200 overflow-hidden bg-stone-50 flex items-center justify-center">
                  <img src={image} alt="Preview" className="w-full h-full object-contain" />
                </div>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 font-bold text-xs hover:bg-amber-100 transition cursor-pointer"
                  >
                    <FaCloudUploadAlt />
                    <span>{uploading ? 'Uploading to Cloudinary...' : 'Select Photo to Upload'}</span>
                  </button>
                  <p className="text-[11px] text-stone-500">
                    High resolution photo uploaded straight to Cloudinary
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Save Ornament
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-amber-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition"
          >
            <div className="relative aspect-square bg-stone-50 p-3 flex items-center justify-center border-b border-stone-100">
              <img
                src={p.images?.[0] || '/images/products/lakshmi-temple-necklace.webp'}
                alt={p.name}
                className="max-h-full max-w-full object-contain"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                {p.category}
              </span>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <h5 className="text-xs font-bold text-stone-900 line-clamp-2 leading-snug">
                  {p.name}
                </h5>
                <span className="text-[10px] text-stone-500 block mt-1">
                  {p.badge || 'BIS 916'}
                </span>
              </div>

              <div className="pt-2 mt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-[10px] font-semibold text-emerald-700">In Catalogue</span>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete "${p.name}"?`)) {
                      onDeleteProduct(p.id);
                    }
                  }}
                  className="p-1 text-stone-400 hover:text-red-600 transition"
                  title="Delete product"
                >
                  <FaTrashAlt className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsTab;

