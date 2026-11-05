import React, { useState, useRef } from 'react';
import {
  FaPlus,
  FaTrashAlt,
  FaUpload,
  FaEdit,
  FaImage,
  FaCheck,
  FaTimes,
  FaCloudUploadAlt,
} from 'react-icons/fa';
import { uploadImageFile } from '../../api/upload';

export function CategoriesTab({ categories, onAddCategory, onUpdateCategory, onDeleteCategory }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [uploadingId, setUploadingId] = useState(null);
  const [uploadError, setUploadError] = useState('');

  // Form states for Add Category
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatTagline, setNewCatTagline] = useState('');
  const [newCatAccent, setNewCatAccent] = useState('Hallmark 916');
  const [newCatImage, setNewCatImage] = useState('/images/products/lakshmi-temple-necklace.webp');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hidden file input reference for replacement
  const fileInputRef = useRef(null);
  const [targetCategoryForUpload, setTargetCategoryForUpload] = useState(null);

  // Trigger file dialog for replacing existing category image
  const handleTriggerReplaceImage = (cat) => {
    setTargetCategoryForUpload(cat);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // Handle file selection and upload to Cloudinary
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setUploadingId(targetCategoryForUpload?.id || 'new');

    try {
      const res = await uploadImageFile(file, 'categories');
      if (res.url) {
        if (targetCategoryForUpload) {
          // Replace image on existing category
          await onUpdateCategory(targetCategoryForUpload.id, {
            image: res.url,
          });
        } else {
          // Setting image for new category being created
          setNewCatImage(res.url);
        }
      }
    } catch (err) {
      setUploadError('Failed to upload image to Cloudinary: ' + (err.response?.data?.error || err.message));
    } finally {
      setUploadingId(null);
      setTargetCategoryForUpload(null);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setIsSubmitting(true);
    try {
      const slug = newCatSlug.trim() || newCatName.trim();
      await onAddCategory({
        name: newCatName.trim(),
        slug,
        tagline: newCatTagline.trim() || 'Exquisite Handcrafted Jewellery',
        count: '0 Designs',
        accent: newCatAccent.trim() || 'BIS 916',
        image: newCatImage,
      });

      // Reset form
      setNewCatName('');
      setNewCatSlug('');
      setNewCatTagline('');
      setNewCatAccent('Hallmark 916');
      setNewCatImage('/images/products/lakshmi-temple-necklace.webp');
      setIsAdding(false);
    } catch (err) {
      alert('Failed to create category: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveEdit = async (catId, updatedFields) => {
    try {
      await onUpdateCategory(catId, updatedFields);
      setEditingCat(null);
    } catch (err) {
      alert('Failed to update category: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Hidden file input for Cloudinary Image Replacement */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-stone-900">
            Jewellery Categories & Showcase
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Add new categories, upload category banner photos (via Cloudinary), or remove/replace images
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:from-amber-700 hover:to-amber-600 transition cursor-pointer self-start sm:self-auto"
        >
          <FaPlus />
          <span>{isAdding ? 'Close Form' : 'Add New Category'}</span>
        </button>
      </div>

      {uploadError && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
          {uploadError}
        </div>
      )}

      {/* Add New Category Panel */}
      {isAdding && (
        <div className="bg-white p-6 rounded-3xl border-2 border-amber-400 shadow-md">
          <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FaPlus className="text-amber-600" />
            <span>Create New Jewellery Category</span>
          </h4>

          <form onSubmit={handleCreateCategory} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Category Name * (e.g. Kasu Mala, Antique Haras)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mangalsutra & Black Beads"
                  value={newCatName}
                  onChange={(e) => {
                    setNewCatName(e.target.value);
                    if (!newCatSlug) {
                      setNewCatSlug(e.target.value.replace(/\s+/g, '-'));
                    }
                  }}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  URL Slug (unique key)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mangalsutra"
                  value={newCatSlug}
                  onChange={(e) => setNewCatSlug(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Tagline / Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Traditional sacred black bead necklaces"
                  value={newCatTagline}
                  onChange={(e) => setNewCatTagline(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Purity / Accent Badge
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gold 22K 916 or Hallmark 916"
                  value={newCatAccent}
                  onChange={(e) => setNewCatAccent(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Category Image Upload */}
            <div>
              <label className="block text-stone-700 font-semibold mb-2">
                Category Showcase Photo (Cloudinary Upload)
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl border border-stone-200 overflow-hidden bg-stone-50 flex items-center justify-center">
                  <img
                    src={newCatImage}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setTargetCategoryForUpload(null);
                      if (fileInputRef.current) fileInputRef.current.click();
                    }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 font-bold text-xs hover:bg-amber-100 transition cursor-pointer"
                  >
                    <FaCloudUploadAlt className="text-sm" />
                    <span>Upload Image from Device (Cloudinary)</span>
                  </button>
                  <p className="text-[11px] text-stone-500">
                    Supports JPG, PNG, WEBP. Directly uploads to Cloudinary storage.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold tracking-wider uppercase transition cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save & Publish Category'}
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

      {/* Existing Categories Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(categories || []).map((cat) => {
          const isUploadingThis = uploadingId === cat.id;

          return (
            <div
              key={cat.id || cat.slug}
              className="bg-white rounded-3xl border border-amber-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition"
            >
              {/* Category Image Header with overlay upload button */}
              <div className="relative aspect-[16/10] bg-stone-50 border-b border-stone-100 p-4 flex items-center justify-center overflow-hidden group">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />

                {/* Cloudinary Replace Photo Action Overlay */}
                <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 gap-2 text-white">
                  <button
                    onClick={() => handleTriggerReplaceImage(cat)}
                    disabled={isUploadingThis}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-lg transition cursor-pointer"
                  >
                    <FaCloudUploadAlt />
                    <span>{isUploadingThis ? 'Uploading...' : 'Replace Photo (Cloudinary)'}</span>
                  </button>
                  <span className="text-[10px] text-stone-200">
                    Removes old photo & applies new image
                  </span>
                </div>

                {/* Accent Tag */}
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  {cat.accent || 'Hallmark 916'}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                {editingCat === cat.id ? (
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-stone-600 font-semibold mb-1">Name</label>
                      <input
                        type="text"
                        defaultValue={cat.name}
                        id={`edit-name-${cat.id}`}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-semibold mb-1">Tagline</label>
                      <input
                        type="text"
                        defaultValue={cat.tagline}
                        id={`edit-tagline-${cat.id}`}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const name = document.getElementById(`edit-name-${cat.id}`).value;
                          const tagline = document.getElementById(`edit-tagline-${cat.id}`).value;
                          handleSaveEdit(cat.id, { name, tagline });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-1"
                      >
                        <FaCheck /> Save
                      </button>
                      <button
                        onClick={() => setEditingCat(null)}
                        className="px-3 py-1.5 rounded-lg bg-stone-100 text-stone-600 font-semibold text-xs flex items-center gap-1"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-base font-bold text-stone-900 mb-1">
                      {cat.name}
                    </h4>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {cat.tagline}
                    </p>
                  </div>
                )}

                {/* Footer Controls */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleTriggerReplaceImage(cat)}
                    className="inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-900 font-bold transition cursor-pointer"
                  >
                    <FaImage className="text-xs" />
                    <span>Change Image</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingCat(cat.id)}
                      className="p-1.5 text-stone-400 hover:text-stone-700 transition"
                      title="Edit Category Details"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to remove the category "${cat.name}"?`)) {
                          onDeleteCategory(cat.id);
                        }
                      }}
                      className="p-1.5 text-stone-400 hover:text-red-600 transition"
                      title="Remove Category"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoriesTab;

