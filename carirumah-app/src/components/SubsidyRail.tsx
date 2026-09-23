'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  MessageCircle, 
  Check, 
  Filter, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SUBSIDY_HOUSES, DISTRICTS_BANTEN, WA_GLOBAL_LINK, SubsidyHouse } from '@/data/mockData';

export default function SubsidyRail() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Semua');

  const filteredHouses = selectedDistrict === 'Semua' 
    ? SUBSIDY_HOUSES 
    : SUBSIDY_HOUSES.filter(h => h.kecamatan.toLowerCase().includes(selectedDistrict.toLowerCase()) || h.kabupaten.toLowerCase().includes(selectedDistrict.toLowerCase()));

  return (
    <section id="subsidi" className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-200 text-cyan-800 text-xs font-bold mb-2">
              <Building2 className="w-3.5 h-3.5 text-cyan-600" />
              <span>Program Resmi FLPP Banten</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Rekomendasi Rumah Baru Subsidi Pilihan
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Bunga tetap 5% flat hingga 20 tahun, tanpa kenaikan cicilan, langsung dari pengembang resmi.
            </p>
          </div>

          <a
            href={`${WA_GLOBAL_LINK}?text=Halo%20CariRumah,%20saya%20ingin%20info%20seluruh%20proyek%20Rumah%20Subsidi%20di%20Banten`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-700 hover:text-cyan-800 transition-colors"
          >
            <span>Konsultasi Semua Unit</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* District Filter Chips with Animation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
          <button
            onClick={() => setSelectedDistrict('Semua')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              selectedDistrict === 'Semua'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
          >
            Semua Wilayah ({SUBSIDY_HOUSES.length})
          </button>

          {DISTRICTS_BANTEN.slice(0, 6).map((dist) => (
            <button
              key={dist.name}
              onClick={() => setSelectedDistrict(dist.name)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                selectedDistrict === dist.name
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              {dist.name}
            </button>
          ))}
        </div>

        {/* Houses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredHouses.map((house, idx) => (
              <motion.div
                key={house.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-cyan-300 transition-all flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={house.imageUrl}
                    alt={house.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge tags */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {house.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold rounded-lg shadow-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-100">
                    <span className="text-[10px] uppercase font-semibold text-slate-500 block">Harga Subsidi</span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900">{house.price}</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-cyan-700 font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{house.location}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-1">
                      {house.title}
                    </h3>
                    
                    <span className="text-xs text-slate-500 block mb-3 font-medium">
                      Oleh {house.developer}
                    </span>

                    {/* Specifications */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-slate-700 text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-cyan-600" />
                        <span>{house.bedrooms} KT</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-cyan-600" />
                        <span>{house.bathrooms} KM</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize className="w-4 h-4 text-cyan-600" />
                        <span>{house.buildingArea}/{house.landArea} m²</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Cicilan + WhatsApp Button */}
                  <div className="mt-4 pt-3 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Estimasi Cicilan Flat</span>
                      <span className="text-sm sm:text-base font-extrabold text-emerald-600">
                        {house.installment}
                      </span>
                    </div>

                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={`${WA_GLOBAL_LINK}?text=Halo%20CariRumah,%20saya%20tertarik%20dengan%20Rumah%20Subsidi%20${encodeURIComponent(house.title)}%20di%20${encodeURIComponent(house.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow transition-all shrink-0"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Tanya Unit</span>
                    </motion.a>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
