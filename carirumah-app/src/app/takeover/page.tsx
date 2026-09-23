'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  KeyRound, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  MessageCircle, 
  ShieldCheck, 
  CreditCard, 
  PlusCircle, 
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TAKEOVER_HOUSES, DISTRICTS_BANTEN, WA_GLOBAL_LINK } from '@/data/mockData';

export default function TakeoverCatalogPage() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Semua');

  const filteredTakeovers = selectedDistrict === 'Semua'
    ? TAKEOVER_HOUSES
    : TAKEOVER_HOUSES.filter(t => t.kecamatan.toLowerCase().includes(selectedDistrict.toLowerCase()) || t.kabupaten.toLowerCase().includes(selectedDistrict.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-cyan-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4">
            <Link href="/" className="hover:text-cyan-600 transition-colors">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-cyan-700 font-bold">Katalog Takeover KPR (Oper Kredit)</span>
          </div>

          {/* Banner */}
          <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-cyan-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden mb-8">
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Oper Kredit Resmi Berakta PPAT</span>
              </div>
              
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Katalog Rumah Takeover KPR Siap Huni Banten
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Solusi praktis memiliki rumah siap pakai tanpa proses BI Checking KPR baru yang panjang. Hanya meneruskan sisa angsuran lama dengan perlindungan Akta Notaris PPAT legal.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/takeover/tambah"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Pasang Listing Rumah Anda</span>
                </Link>
              </div>
            </div>
          </div>

          {/* District Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
            <button
              onClick={() => setSelectedDistrict('Semua')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                selectedDistrict === 'Semua'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              Semua Wilayah ({TAKEOVER_HOUSES.length})
            </button>

            {DISTRICTS_BANTEN.map((dist) => (
              <button
                key={dist.name}
                onClick={() => setSelectedDistrict(dist.name)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  selectedDistrict === dist.name
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {dist.name}
              </button>
            ))}
          </div>

          {/* Takeover Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTakeovers.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-300 transition-all flex flex-col group"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[11px] font-bold flex items-center gap-1.5 shadow-xs">
                      <CreditCard className="w-3.5 h-3.5 text-teal-400" />
                      <span>{item.bankOrigin}</span>
                    </div>

                    {item.verifiedLegal && (
                      <div className="absolute top-3 right-3 bg-emerald-600/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[11px] font-bold flex items-center gap-1 shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Legal PPAT</span>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-slate-500 block">DP / Ganti Biaya</span>
                        <span className="text-sm font-extrabold text-teal-700">{item.takeoverDp}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-semibold text-slate-500 block">Sisa Tenor</span>
                        <span className="text-xs font-bold text-slate-700">{item.remainingTenor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-xs text-teal-700 font-semibold mb-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.location}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                        {item.title}
                      </h3>

                      <div className="mt-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1 text-xs text-slate-600">
                        <div className="flex items-center justify-between">
                          <span>Angsuran Bulanan:</span>
                          <strong className="text-slate-900 font-bold">{item.monthlyInstallment}</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Estimasi Sisa Pokok:</span>
                          <span className="text-slate-700 font-medium">{item.outstandingPrincipal}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 flex items-center justify-between gap-3 border-t border-slate-100">
                      <span className="text-xs text-slate-500 font-medium">{item.type}</span>

                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`${WA_GLOBAL_LINK}?text=Halo%20CariRumah,%20saya%20ingin%20info%20lebih%20lanjut%20mengenai%20Takeover%20KPR%20${encodeURIComponent(item.title)}%20(DP:%20${encodeURIComponent(item.takeoverDp)})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all shrink-0"
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
      </main>

      <Footer />
    </div>
  );
}
