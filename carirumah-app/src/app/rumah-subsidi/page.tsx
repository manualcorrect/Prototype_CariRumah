'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  Filter, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Landmark,
  BadgeCheck,
  Car
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SUBSIDY_HOUSES, DISTRICTS_BANTEN, WA_GLOBAL_LINK } from '@/data/mockData';

export default function RumahSubsidiCatalogPage() {
  const [selectedKabupaten, setSelectedKabupaten] = useState<string>('Semua');
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('Semua');

  const filteredHouses = SUBSIDY_HOUSES.filter(house => {
    const matchKab = selectedKabupaten === 'Semua' || house.kabupaten === selectedKabupaten;
    const matchKec = selectedKecamatan === 'Semua' || house.kecamatan.toLowerCase() === selectedKecamatan.toLowerCase();
    return matchKab && matchKec;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-cyan-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation Bar (PRD requirement) */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4 overflow-x-auto py-1">
            <Link href="/" className="hover:text-cyan-600 transition-colors">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <button 
              onClick={() => { setSelectedKabupaten('Semua'); setSelectedKecamatan('Semua'); }}
              className={`hover:text-cyan-600 transition-colors ${selectedKabupaten === 'Semua' ? 'text-cyan-700 font-bold' : ''}`}
            >
              Banten
            </button>
            {selectedKabupaten !== 'Semua' && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <button 
                  onClick={() => setSelectedKecamatan('Semua')}
                  className={`hover:text-cyan-600 transition-colors ${selectedKecamatan === 'Semua' ? 'text-cyan-700 font-bold' : ''}`}
                >
                  {selectedKabupaten}
                </button>
              </>
            )}
            {selectedKecamatan !== 'Semua' && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-cyan-700 font-bold">{selectedKecamatan}</span>
              </>
            )}
          </div>

          {/* Header Title Banner */}
          <div className="bg-gradient-to-r from-cyan-900 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden mb-8">
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                <Building2 className="w-3.5 h-3.5" />
                <span>Program FLPP Pemerintah — Wilayah Banten</span>
              </div>
              
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Katalog Rumah Subsidi Baru di {selectedKecamatan !== 'Semua' ? selectedKecamatan : selectedKabupaten !== 'Semua' ? selectedKabupaten : 'Serang & Cilegon'}
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Pilihan unit rumah subsidi FLPP resmi developer dengan suku bunga tetap 5% flat hingga 20 tahun, bebas PPN, dan siap akad dengan pendampingan langsung.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-cyan-200">
                <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-emerald-400" /> Bunga 5% Flat</span>
                <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-emerald-400" /> Angsuran Mulai 1 Juta/bln</span>
                <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-emerald-400" /> Bebas Biaya PPN</span>
              </div>
            </div>
          </div>

          {/* Sub-filter Kecamatan Sekitar (Chips) */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Eksplorasi Kecamatan Sekitar:
              </span>
              <span className="text-xs text-slate-500">
                Ditemukan <strong>{filteredHouses.length} proyek cluster</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
              <button
                onClick={() => { setSelectedKabupaten('Semua'); setSelectedKecamatan('Semua'); }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  selectedKecamatan === 'Semua' && selectedKabupaten === 'Semua'
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                Semua Banten
              </button>

              {DISTRICTS_BANTEN.map((dist) => (
                <button
                  key={dist.name}
                  onClick={() => {
                    setSelectedKabupaten(dist.kab);
                    setSelectedKecamatan(dist.name);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                    selectedKecamatan === dist.name
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {dist.name} <span className="text-[10px] opacity-70">({dist.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Subsidy Houses */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredHouses.map((house, idx) => (
                <motion.div
                  key={house.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-cyan-300 transition-all flex flex-col group"
                >
                  {/* House Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={house.imageUrl}
                      alt={house.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Tag Badges */}
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

                    {/* Price Overlay */}
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-md border border-slate-100">
                      <span className="text-[10px] uppercase font-semibold text-slate-500 block">Harga Subsidi FLPP</span>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900">{house.price}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-cyan-700 font-semibold mb-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{house.location}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                        {house.title}
                      </h3>

                      <span className="text-xs text-slate-500 block mb-3 font-medium">
                        Developer: <strong>{house.developer}</strong>
                      </span>

                      {/* Specs */}
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

                    {/* Footer CTA */}
                    <div className="mt-4 pt-3 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Cicilan Tetap Flat</span>
                        <span className="text-sm sm:text-base font-extrabold text-emerald-600">
                          {house.installment}
                        </span>
                      </div>

                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`${WA_GLOBAL_LINK}?text=Halo%20CariRumah,%20saya%20tertarik%20konsultasi%20Rumah%20Subsidi%20${encodeURIComponent(house.title)}%20di%20${encodeURIComponent(house.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow transition-all shrink-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat WhatsApp</span>
                      </motion.a>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Section Keunggulan Lokasi Wilayah Banten (SEO & Trust PRD requirement) */}
          <div className="mt-14 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-600" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Keunggulan Memilih Rumah Subsidi di Wilayah Banten (Serang &amp; Cilegon)
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Kawasan Serang dan Cilegon merupakan koridor strategis dengan pertumbuhan ekonomi pesat berkat integrasi kawasan industri, stasiun kereta relasi Tanah Abang–Rangkasbitung–Merak, serta kemudahan akses Gerbang Tol Serang Barat, Serang Timur, dan Cilegon Timur. Membeli rumah subsidi baru di area ini memberikan potensi kenaikan nilai investasi properti yang sangat menjanjikan dengan beban cicilan yang sangat terjangkau.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-100 text-xs space-y-1">
                <strong className="text-cyan-950 font-bold block">1. Akses Tol Serang–Cilegon</strong>
                <span className="text-slate-600">Hanya 10-15 menit menuju gerbang tol utama untuk mobilitas lancar.</span>
              </div>
              <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-100 text-xs space-y-1">
                <strong className="text-cyan-950 font-bold block">2. Dekat Kawasan Industri</strong>
                <span className="text-slate-600">Dekat dengan sentra industri Nikomas, Krakatau Steel, dan pusat logistik.</span>
              </div>
              <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-100 text-xs space-y-1">
                <strong className="text-cyan-950 font-bold block">3. Sarana Fasilitas Publik</strong>
                <span className="text-slate-600">Akses mudah ke RSUD Banten, kampus ternama, dan pusat perbelanjaan.</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
