'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
  BadgeCheck,
  Car
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SUBSIDY_HOUSES, DISTRICTS_BANTEN, WA_GLOBAL_LINK } from '@/data/mockData';

function SubsidyCatalogContent() {
  const searchParams = useSearchParams();
  const kabQuery = searchParams.get('kab');
  const kecQuery = searchParams.get('kec');

  const [selectedKabupaten, setSelectedKabupaten] = useState<string>(kabQuery || 'Semua');
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>(kecQuery || 'Semua');

  useEffect(() => {
    if (kabQuery) setSelectedKabupaten(kabQuery);
    else setSelectedKabupaten('Semua');

    if (kecQuery) setSelectedKecamatan(kecQuery);
    else setSelectedKecamatan('Semua');
  }, [kabQuery, kecQuery]);

  // Actual filter logic based on kabupaten and kecamatan
  const filteredHouses = SUBSIDY_HOUSES.filter(house => {
    const matchKab = selectedKabupaten === 'Semua' || house.kabupaten.toLowerCase() === selectedKabupaten.toLowerCase();
    const matchKec = selectedKecamatan === 'Semua' || house.kecamatan.toLowerCase() === selectedKecamatan.toLowerCase();
    return matchKab && matchKec;
  });

  // Calculate actual item counts per district
  const getDistrictCount = (districtName: string) => {
    return SUBSIDY_HOUSES.filter(h => h.kecamatan.toLowerCase() === districtName.toLowerCase()).length;
  };

  const currentDistricts = selectedKabupaten === 'Semua'
    ? DISTRICTS_BANTEN
    : DISTRICTS_BANTEN.filter(d => d.kab.toLowerCase() === selectedKabupaten.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Breadcrumb Navigation Bar (PRD requirement) */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4 overflow-x-auto py-1">
        <Link href="/" className="hover:text-cyan-600 transition-colors">Beranda</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <button 
          onClick={() => { setSelectedKabupaten('Semua'); setSelectedKecamatan('Semua'); }}
          className={`hover:text-cyan-600 transition-colors ${selectedKabupaten === 'Semua' ? 'text-cyan-700 font-bold' : ''}`}
        >
          Semua Banten
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
            Katalog Rumah Subsidi di {selectedKecamatan !== 'Semua' ? `Kec. ${selectedKecamatan}` : selectedKabupaten !== 'Semua' ? selectedKabupaten : 'Seluruh Wilayah Banten'}
          </h1>
          
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {selectedKecamatan !== 'Semua' 
              ? `Menampilkan seluruh listing perumahan subsidi FLPP yang terdaftar di wilayah Kecamatan ${selectedKecamatan}, ${selectedKabupaten}.` 
              : selectedKabupaten !== 'Semua'
                ? `Menampilkan seluruh listing rumah subsidi dari seluruh kecamatan yang ada di ${selectedKabupaten}.`
                : `Pilihan unit rumah subsidi FLPP resmi developer di seluruh Banten dengan suku bunga tetap 5% flat hingga 20 tahun.`}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-cyan-200">
            <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-emerald-400" /> Bunga 5% Flat</span>
            <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-emerald-400" /> Angsuran Mulai 1 Juta/bln</span>
            <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-emerald-400" /> Bebas Biaya PPN</span>
          </div>
        </div>
      </div>

      {/* City & District Filter Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs mb-8 space-y-4">
        
        {/* Level 1: Pilih Kabupaten/Kota */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            1. Pilih Wilayah Kota / Kabupaten:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSelectedKabupaten('Semua'); setSelectedKecamatan('Semua'); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedKabupaten === 'Semua'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Semua Banten ({SUBSIDY_HOUSES.length} Unit)
            </button>

            {['Kabupaten Serang', 'Kota Serang', 'Kota Cilegon'].map(kab => {
              const count = SUBSIDY_HOUSES.filter(h => h.kabupaten.toLowerCase() === kab.toLowerCase()).length;
              return (
                <button
                  key={kab}
                  onClick={() => { setSelectedKabupaten(kab); setSelectedKecamatan('Semua'); }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedKabupaten === kab
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {kab} {count > 0 ? `(${count} Unit)` : ''}
                </button>
              );
            })}
          </div>
        </div>

        {/* Level 2: Sub-filter Kecamatan */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              2. Filter Kecamatan Spesifik {selectedKabupaten !== 'Semua' ? `(${selectedKabupaten})` : ''}:
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              Hasil: <strong>{filteredHouses.length} Unit Listing</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
            <button
              onClick={() => setSelectedKecamatan('Semua')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedKecamatan === 'Semua'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200'
              }`}
            >
              Semua Kecamatan
            </button>

            {currentDistricts.map((dist) => {
              const count = getDistrictCount(dist.name);
              const isSelected = selectedKecamatan.toLowerCase() === dist.name.toLowerCase();

              return (
                <button
                  key={dist.name}
                  onClick={() => {
                    setSelectedKabupaten(dist.kab);
                    setSelectedKecamatan(dist.name);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{dist.name}</span>
                  {count > 0 && (
                    <span className={`ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-white text-cyan-800' : 'bg-cyan-100 text-cyan-800'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Grid of Subsidy Houses */}
      {filteredHouses.length > 0 ? (
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
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-14 h-14 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center mx-auto">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Belum Ada Unit di Kecamatan {selectedKecamatan}</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Saat ini belum ada listing rumah subsidi baru yang terdaftar di kecamatan ini. Anda dapat melihat unit di kecamatan tetangga atau berkonsultasi via WhatsApp.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setSelectedKecamatan('Semua')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Lihat Seluruh {selectedKabupaten !== 'Semua' ? selectedKabupaten : 'Banten'}
            </button>
            <a
              href={`${WA_GLOBAL_LINK}?text=Halo%20CariRumah,%20apakah%20ada%20info%20rumah%20subsidi%20di%20Kecamatan%20${encodeURIComponent(selectedKecamatan)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Tanya Unit di Kecamatan Ini</span>
            </a>
          </div>
        </div>
      )}

      {/* Section Keunggulan Lokasi Wilayah Banten */}
      <div className="mt-14 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Keunggulan Memilih Rumah Subsidi di Wilayah Banten (Serang &amp; Cilegon)
          </h2>
        </div>
        
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Kawasan Serang dan Cilegon merupakan koridor strategis dengan pertumbuhan ekonomi pesat berkat integrasi kawasan industri, stasiun kereta api relasi Tanah Abang–Rangkasbitung–Merak, serta kemudahan akses Gerbang Tol Serang Barat, Serang Timur, dan Cilegon Timur. Membeli rumah subsidi baru di area ini memberikan potensi kenaikan nilai investasi properti yang sangat menjanjikan dengan beban cicilan yang sangat terjangkau.
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
  );
}

export default function RumahSubsidiCatalogPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-cyan-500 selection:text-white">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <Suspense fallback={<div className="text-center py-20 text-slate-500">Memuat Katalog...</div>}>
          <SubsidyCatalogContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
