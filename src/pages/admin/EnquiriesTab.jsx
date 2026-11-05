import React, { useState } from 'react';
import {
  FaSearch,
  FaPhoneAlt,
  FaWhatsapp,
  FaTrashAlt,
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaFilter,
} from 'react-icons/fa';

export function EnquiriesTab({ enquiries, onStatusChange, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredEnquiries = (enquiries || []).filter((item) => {
    const matchesSearch =
      (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.phone || '').includes(searchTerm) ||
      (item.message || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.type || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || item.status?.toUpperCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getCleanPhone = (phone = '') => {
    return phone.replace(/[^0-9]/g, '');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Action Bar */}
      <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search by customer name, phone, or design enquiry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {['ALL', 'NEW', 'CONTACTED', 'COMPLETED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wider transition ${
                statusFilter === st
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st === 'ALL' ? 'All Messages' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries List */}
      <div className="bg-white rounded-3xl border border-amber-200/80 shadow-sm overflow-hidden">
        {filteredEnquiries.length === 0 ? (
          <div className="py-16 text-center text-stone-500">
            <FaEnvelope className="mx-auto text-4xl text-stone-300 mb-3" />
            <p className="text-sm font-semibold text-stone-700">No customer enquiries found</p>
            <p className="text-xs text-stone-400 mt-1">
              {searchTerm ? 'Try adjusting your search query' : 'Customer submissions from the website will appear here'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {filteredEnquiries.map((enq) => {
              const cleanPhone = getCleanPhone(enq.phone);
              const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
                `Namaskara ${enq.name}! Thank you for contacting Shree Kamakshi Jewellery Works, Talaguppa regarding "${enq.type}". How can we assist you today?`
              )}`;

              return (
                <div
                  key={enq.id}
                  className="p-5 sm:p-6 hover:bg-amber-50/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left Column: Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-stone-900">
                        {enq.name}
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 uppercase">
                        {enq.type}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          enq.status === 'New'
                            ? 'bg-emerald-100 text-emerald-800'
                            : enq.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {enq.status || 'New'}
                      </span>
                    </div>

                    {/* Customer Message */}
                    <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200/60 max-w-3xl">
                      "{enq.message}"
                    </p>

                    {/* Timestamp & Contact Info */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
                      <span className="flex items-center gap-1">
                        <FaClock className="text-stone-400 text-[10px]" />
                        <span>
                          {enq.createdAt
                            ? new Date(enq.createdAt).toLocaleString('en-IN', {
                                dateStyle: 'medium',
                                timeStyle: 'short',
                              })
                            : 'Recent'}
                        </span>
                      </span>

                      {enq.email && (
                        <span className="flex items-center gap-1 text-stone-600">
                          <FaEnvelope className="text-stone-400 text-[10px]" />
                          <span>{enq.email}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Instant Action Buttons */}
                  <div className="flex flex-wrap md:flex-col lg:flex-row items-center gap-2 self-start md:self-center">
                    {/* Direct WhatsApp Call */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
                    >
                      <FaWhatsapp className="text-sm" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Direct Phone Call */}
                    <a
                      href={`tel:${enq.phone}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs shadow-sm transition"
                    >
                      <FaPhoneAlt className="text-xs" />
                      <span>{enq.phone}</span>
                    </a>

                    {/* Status Changer Select */}
                    <select
                      value={enq.status || 'New'}
                      onChange={(e) => onStatusChange(enq.id, e.target.value)}
                      className="py-1.5 px-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 cursor-pointer focus:outline-none"
                    >
                      <option value="New">Mark New</option>
                      <option value="Contacted">Mark Contacted</option>
                      <option value="Completed">Mark Completed</option>
                    </select>

                    {/* Delete Button */}
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete enquiry from ${enq.name}?`)) {
                          onDelete(enq.id);
                        }
                      }}
                      className="p-2 text-stone-400 hover:text-red-600 transition cursor-pointer"
                      title="Delete enquiry"
                    >
                      <FaTrashAlt className="text-xs" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default EnquiriesTab;

