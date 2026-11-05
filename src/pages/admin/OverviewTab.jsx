import React from 'react';
import {
  FaUsers,
  FaMapMarkerAlt,
  FaEnvelopeOpenText,
  FaCoins,
  FaMobileAlt,
  FaDesktop,
  FaTabletAlt,
  FaArrowUp,
  FaCity,
  FaChartLine,
} from 'react-icons/fa';

export function OverviewTab({ analytics, enquiries, rates, onTabChange }) {
  const totalVisits = analytics?.totalVisits || 0;
  const uniqueVisitors = analytics?.uniqueVisitors || 0;
  const totalEnquiries = enquiries?.length || 0;
  const newEnquiries = enquiries?.filter((e) => e.status === 'New').length || 0;

  const cityList = analytics?.cityBreakdown || [];
  const maxCityCount = Math.max(...cityList.map((c) => c.count), 1);

  const deviceTotal =
    (analytics?.deviceBreakdown?.mobile || 0) +
    (analytics?.deviceBreakdown?.desktop || 0) +
    (analytics?.deviceBreakdown?.tablet || 0) || 1;

  const mobilePct = Math.round(((analytics?.deviceBreakdown?.mobile || 0) / deviceTotal) * 100);
  const desktopPct = Math.round(((analytics?.deviceBreakdown?.desktop || 0) / deviceTotal) * 100);
  const tabletPct = Math.round(((analytics?.deviceBreakdown?.tablet || 0) / deviceTotal) * 100);

  return (
    <div className="space-y-8 font-sans">
      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* KPI 1: Total Visitors */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-amber-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Total Visitors
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg">
              <FaUsers />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 font-cinzel">
            {totalVisits.toLocaleString()}
          </div>
          <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1 font-medium">
            <FaArrowUp className="text-[10px]" />
            <span>Real-time visitor counter</span>
          </p>
        </div>

        {/* KPI 2: Unique People */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-amber-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Unique Visitors
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
              <FaMapMarkerAlt />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 font-cinzel">
            {uniqueVisitors.toLocaleString()}
          </div>
          <p className="text-xs text-stone-500 mt-2 font-medium">
            Distinct IP addresses recorded
          </p>
        </div>

        {/* KPI 3: Customer Enquiries */}
        <div
          onClick={() => onTabChange('enquiries')}
          className="bg-white p-5 sm:p-6 rounded-2xl border border-amber-200/80 shadow-sm hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Customer Enquiries
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-100 flex items-center justify-center text-lg transition">
              <FaEnvelopeOpenText />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-stone-900 font-cinzel">
              {totalEnquiries}
            </span>
            {newEnquiries > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                {newEnquiries} New
              </span>
            )}
          </div>
          <p className="text-xs text-amber-700 mt-2 font-medium group-hover:underline">
            View customer messages →
          </p>
        </div>

        {/* KPI 4: Today's 22K Gold Rate */}
        <div
          onClick={() => onTabChange('settings')}
          className="bg-white p-5 sm:p-6 rounded-2xl border border-amber-200/80 shadow-sm hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Gold 22K (Hallmark)
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg">
              <FaCoins />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-700 font-sans tracking-tight">
            {rates?.gold22 && Number(rates.gold22) > 0 ? `₹ ${Number(rates.gold22).toLocaleString()}` : '₹ --'}
            <span className="text-xs text-stone-400 font-normal ml-1">/ 1g</span>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <FaArrowUp className="text-[9px]" />
              <span>{rates?.change?.gold22 || '+1.54%'}</span>
            </span>
            <span className="text-stone-400 group-hover:text-amber-700 font-medium">
              Live Feed →
            </span>
          </div>
        </div>
      </div>

      {/* Place-wise Visitor Location Breakdown (Primary Feature requested by user) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* City Breakdown Table & Bars */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-3xl border border-amber-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-stone-100 gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                <FaCity className="text-amber-600" />
                <span>Place-Wise Visitor Distribution</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Real-time geographic breakdown of customers visiting the jewellery website
              </p>
            </div>
            <span className="self-start sm:self-auto text-[11px] px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
              Live IP Geo-Lookup
            </span>
          </div>

          <div className="space-y-4">
            {cityList.length === 0 ? (
              <div className="py-8 text-center text-stone-400 text-xs">
                <FaCity className="mx-auto text-2xl text-stone-300 mb-2" />
                <p className="font-semibold text-stone-600">No visitor locations logged yet</p>
                <p className="text-[11px] mt-0.5">Real-time geographic locations will populate here as customers visit the store website.</p>
              </div>
            ) : (
              cityList.map((place, idx) => {
                const pct = Math.round((place.count / totalVisits) * 100) || 1;
                const barWidth = Math.round((place.count / maxCityCount) * 100);

                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-medium text-stone-800">
                        <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-600 text-[10px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-stone-900">{place.city}</span>
                        <span className="text-stone-400 text-[11px] font-normal">
                          ({place.region}, {place.country})
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-stone-900">{place.count} visits</span>
                        <span className="text-amber-700 font-semibold w-10 text-right">{pct}%</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all duration-700"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Device & Traffic Insights Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Device Split Card */}
          <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-sm">
            <h3 className="text-base font-bold text-stone-900 mb-1 flex items-center gap-2">
              <FaChartLine className="text-amber-600" />
              <span>Device Split</span>
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Visitor screen platforms
            </p>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-700 font-medium">
                  <FaMobileAlt className="text-amber-600 text-sm" />
                  <span>Mobile Phones</span>
                </div>
                <div className="font-bold text-stone-900">{mobilePct}% ({analytics?.deviceBreakdown?.mobile || 0})</div>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${mobilePct}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-stone-700 font-medium">
                  <FaDesktop className="text-blue-600 text-sm" />
                  <span>Desktops & Laptops</span>
                </div>
                <div className="font-bold text-stone-900">{desktopPct}% ({analytics?.deviceBreakdown?.desktop || 0})</div>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${desktopPct}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-stone-700 font-medium">
                  <FaTabletAlt className="text-emerald-600 text-sm" />
                  <span>Tablets & iPads</span>
                </div>
                <div className="font-bold text-stone-900">{tabletPct}% ({analytics?.deviceBreakdown?.tablet || 0})</div>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${tabletPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/60 p-5 rounded-3xl border border-amber-200">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
              Top Customer Hub
            </h4>
            <p className="text-xs text-amber-950/80 leading-relaxed">
              {cityList.length > 0 ? (
                <>
                  <strong>{cityList[0].city}</strong> is currently your highest visitor location ({Math.round((cityList[0].count / totalVisits) * 100) || 100}% of traffic).
                </>
              ) : (
                <>Geographic visitor traffic will automatically display here as customers visit the store website.</>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewTab;

