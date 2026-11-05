import React, { useState, useRef, useEffect } from 'react';
import {
  FaCoins,
  FaStore,
  FaPhoneAlt,
  FaClock,
  FaUserTie,
  FaSave,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaSyncAlt,
} from 'react-icons/fa';
import { uploadImageFile } from '../../api/upload';
import apiClient from '../../api/client';

export function FrontendSettingsTab({ rates, settings, onUpdateRates, onUpdateSettings }) {
  // Rates form state
  const [gold22, setGold22] = useState(rates?.gold22 || 11468);
  const [gold24, setGold24] = useState(rates?.gold24 || 12510);
  const [silver, setSilver] = useState(rates?.silver || 160);
  const [gold22Change, setGold22Change] = useState(rates?.change?.gold22 || '+ ₹173 (+1.54%)');
  const [gold24Change, setGold24Change] = useState(rates?.change?.gold24 || '+ ₹189 (+1.54%)');
  const [silverChange, setSilverChange] = useState(rates?.change?.silver || '+ ₹2 (+1.00%)');
  const [syncingApi, setSyncingApi] = useState(false);

  useEffect(() => {
    if (rates) {
      if (rates.gold22) setGold22(rates.gold22);
      if (rates.gold24) setGold24(rates.gold24);
      if (rates.silver) setSilver(rates.silver);
      if (rates.change?.gold22) setGold22Change(rates.change.gold22);
      if (rates.change?.gold24) setGold24Change(rates.change.gold24);
      if (rates.change?.silver) setSilverChange(rates.change.silver);
    }
  }, [rates]);

  // Settings form state
  const [shopName, setShopName] = useState(settings?.name || 'Shree Kamakshi Jewellery Works');
  const [tagline, setTagline] = useState(settings?.tagline || 'Traditional Craftsmanship • Pure 916 Hallmark Gold');
  const [phone1, setPhone1] = useState(settings?.phones?.[0] || '9448628575');
  const [phone2, setPhone2] = useState(settings?.phones?.[1] || '8660419854');
  const [email, setEmail] = useState(settings?.email || 'skjgvraikar@gmail.com');
  const [hoursText, setHoursText] = useState(settings?.hours?.display || 'Open every day, 10:00 am – 2:30 pm and 4:00 pm – 9:30 pm. Sunday holiday.');
  const [addressLine, setAddressLine] = useState(settings?.address?.full || 'B H Road, Talaguppa – 577430');

  // About & Owner
  const [ownerName, setOwnerName] = useState(settings?.owner?.name || 'Veerendra G Raikar');
  const [ownerQuote, setOwnerQuote] = useState(settings?.owner?.quote || '');
  const [fatherName, setFatherName] = useState(settings?.owner?.fatherName || 'Late Sri G. Raikar');
  const [fatherTribute, setFatherTribute] = useState(settings?.owner?.fatherTribute || '');
  const [ownerPhoto, setOwnerPhoto] = useState(settings?.owner?.photo || '/images/owner.jpg');

  const [savingRates, setSavingRates] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const photoInputRef = useRef(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const res = await uploadImageFile(file, 'proprietor');
      if (res.url) {
        setOwnerPhoto(res.url);
      }
    } catch (err) {
      alert('Photo upload failed: ' + err.message);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSyncApiNow = async () => {
    setSyncingApi(true);
    try {
      const res = await apiClient.post('/api/rates/sync');
      if (res.data?.rates) {
        onUpdateRates(res.data.rates);
        setSuccessMsg(`✓ Successfully synced live bullion rates at ${res.data.rates.fetchedAtIST || 'just now'}!`);
        setTimeout(() => setSuccessMsg(''), 4500);
      }
    } catch (err) {
      alert('Failed to sync live API: ' + (err.response?.data?.error || err.message));
    } finally {
      setSyncingApi(false);
    }
  };

  const handleSaveRates = async (e) => {
    e.preventDefault();
    setSavingRates(true);
    try {
      await onUpdateRates({
        gold22: Number(gold22),
        gold24: Number(gold24),
        silver: Number(silver),
        change: {
          gold22: gold22Change,
          gold24: gold24Change,
          silver: silverChange,
          gold22Direction: 'up',
          gold24Direction: 'up',
          silverDirection: 'up',
        },
      });
      setSuccessMsg('Live Gold & Silver rates updated successfully on the website!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert('Failed to update rates: ' + err.message);
    } finally {
      setSavingRates(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await onUpdateSettings({
        name: shopName,
        tagline,
        phones: [phone1, phone2],
        email,
        address: {
          ...settings?.address,
          full: addressLine,
        },
        hours: {
          ...settings?.hours,
          display: hoursText,
        },
        owner: {
          ...settings?.owner,
          name: ownerName,
          quote: ownerQuote,
          fatherName,
          fatherTribute,
          photo: ownerPhoto,
        },
      });
      setSuccessMsg('Showroom settings updated successfully on the frontend!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert('Failed to update settings: ' + err.message);
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <input
        type="file"
        ref={photoInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <FaCheckCircle className="text-base text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* SECTION 1: Live Market Rates (Admin Full Control) */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-amber-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-stone-100 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg">
              <FaCoins />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Live Gold & Silver Price Control
              </h3>
              <p className="text-xs text-stone-500">
                Synchronized every 6 hours from live Indian market feeds (Metalcharts API)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
            {rates?.fetchedAtIST && (
              <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
                Last Synced: {rates.fetchedAtIST}
              </span>
            )}
            <button
              type="button"
              onClick={handleSyncApiNow}
              disabled={syncingApi}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition cursor-pointer disabled:opacity-50"
            >
              <FaSyncAlt className={`text-[10px] ${syncingApi ? 'animate-spin' : ''}`} />
              <span>{syncingApi ? 'Syncing...' : 'Sync Live API Now'}</span>
            </button>
          </div>
        </div>

        {/* Small Notice / Disclaimer */}
        <div className="mb-5 p-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-600 text-xs flex items-start gap-2.5">
          <span className="text-amber-600 font-bold mt-0.5">ℹ</span>
          <span>
            <strong>Market Price Notice:</strong> Bullion rates automatically synchronize every 6 hours in Indian Rupee (INR). Showroom final billing prices may vary slightly based on local market fluctuations and GST.
          </span>
        </div>

        <form onSubmit={handleSaveRates} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
              <label className="block text-stone-800 font-bold mb-1">
                Gold 22K (916) Per Gram (₹)
              </label>
              <input
                type="number"
                value={gold22}
                onChange={(e) => setGold22(e.target.value)}
                className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-stone-900 font-bold text-base focus:border-amber-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="+ ₹125 (0.86%)"
                value={gold22Change}
                onChange={(e) => setGold22Change(e.target.value)}
                className="w-full mt-2 p-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-600"
              />
            </div>

            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
              <label className="block text-stone-800 font-bold mb-1">
                Gold 24K (999) Per Gram (₹)
              </label>
              <input
                type="number"
                value={gold24}
                onChange={(e) => setGold24(e.target.value)}
                className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-stone-900 font-bold text-base focus:border-amber-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="+ ₹140 (0.88%)"
                value={gold24Change}
                onChange={(e) => setGold24Change(e.target.value)}
                className="w-full mt-2 p-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-600"
              />
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <label className="block text-stone-800 font-bold mb-1">
                Silver (999) Per Gram (₹)
              </label>
              <input
                type="number"
                value={silver}
                onChange={(e) => setSilver(e.target.value)}
                className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-stone-900 font-bold text-base focus:border-stone-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="+ ₹3 (1.10%)"
                value={silverChange}
                onChange={(e) => setSilverChange(e.target.value)}
                className="w-full mt-2 p-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={savingRates}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold tracking-wider uppercase transition cursor-pointer disabled:opacity-50"
          >
            <FaSave />
            <span>{savingRates ? 'Updating Rates...' : 'Publish New Rates'}</span>
          </button>
        </form>
      </div>

      {/* SECTION 2: Business & Contact Info Control */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-amber-200/80 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
            <FaStore />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900">
              Showroom Details & Contact Info
            </h3>
            <p className="text-xs text-stone-500">
              Control phone numbers, opening hours, showroom address and heritage text
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Jewellery Shop Name
              </label>
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Tagline / Slogan
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Primary Phone (Tap-to-call & WhatsApp)
              </label>
              <input
                type="text"
                value={phone1}
                onChange={(e) => setPhone1(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Secondary Phone
              </label>
              <input
                type="text"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Showroom Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Full Physical Address
              </label>
              <input
                type="text"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">
              Showroom Hours Display Text
            </label>
            <input
              type="text"
              value={hoursText}
              onChange={(e) => setHoursText(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Proprietor & Heritage Details */}
          <div className="pt-4 border-t border-stone-100">
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
              Proprietor & Founder Heritage
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Proprietor Name
                </label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Founder (Father's) Name
                </label>
                <input
                  type="text"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-stone-700 font-semibold mb-1">
                Proprietor Photo (Upload via Cloudinary)
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl border border-stone-200 overflow-hidden bg-stone-100">
                  <img src={ownerPhoto} alt="Owner" className="w-full h-full object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  disabled={uploadingPhoto}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 font-bold text-xs hover:bg-amber-100 transition cursor-pointer"
                >
                  <FaCloudUploadAlt />
                  <span>{uploadingPhoto ? 'Uploading...' : 'Replace Photo (Cloudinary)'}</span>
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={savingSettings}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold tracking-wider uppercase transition cursor-pointer disabled:opacity-50"
          >
            <FaSave />
            <span>{savingSettings ? 'Saving Settings...' : 'Save All Settings'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default FrontendSettingsTab;

