'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  KeyRound, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  CreditCard,
  PlusCircle,
  ArrowRight
} from 'lucide-react';
import { TAKEOVER_HOUSES, WA_GLOBAL_LINK } from '@/data/mockData';

export default function TakeoverRail() {
  return (
    <section id="takeover" className="py-16 bg-slate-50/80 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 border border-teal-200 text-teal-900 text-xs font-bold mb-2">
              <KeyRound className="w-3.5 h-3.5 text-teal-700" />
              <span>Oper Kredit Resmi &amp; Legal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Listing Takeover KPR Pilihan Minggu Ini
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Rumah siap huni langsung lanjut cicilan lama (bebas BI Checking ketat KPR baru), legalitas akta Notaris PPAT terjamin.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/takeover/tambah"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-cyan-700 border border-cyan-300 rounded-xl text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all"
            >
              <PlusCircle className="w-4 h-4 text-cyan-600" />
              <span>Pasang Listing Takeover</span>
            </Link>
          </div>
        </div>

        {/* Takeover Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TAKEOVER_HOUSES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-300 transition-all flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Bank Origin Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[11px] font-bold flex items-center gap-1.5 shadow-xs">
                  <CreditCard className="w-3.5 h-3.5 text-teal-400" />
                  <span>{item.bankOrigin}</span>
                </div>

                {/* Verified Legal Badge */}
                {item.verifiedLegal && (
                  <div className="absolute top-3 right-3 bg-emerald-600/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[11px] font-bold flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Legal Notaris PPAT</span>
                  </div>
                )}

                {/* DP Ganti Biaya Tag */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-slate-100 flex items-center justify-between">
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

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-xs text-teal-700 font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.location}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Financial & Specs overview */}
                  <div className="mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span>Cicilan Bulanan:</span>
                      <strong className="text-slate-900 font-bold">{item.monthlyInstallment}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Estimasi Sisa Pokok:</span>
                      <span className="text-slate-700 font-medium">{item.outstandingPrincipal}</span>
                    </div>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-4 pt-3 flex items-center justify-between gap-3 border-t border-slate-100">
                  <div className="text-xs text-slate-500">
                    <span>Tipe Unit: </span>
                    <strong className="text-slate-800">{item.type}</strong>
                  </div>

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`${WA_GLOBAL_LINK}?text=Halo%20CariRumah,%20saya%20ingin%20info%20lebih%20lanjut%20mengenai%20Takeover%20KPR%20${encodeURIComponent(item.title)}%20(DP:%20${encodeURIComponent(item.takeoverDp)})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow transition-all shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Tanya Takeover</span>
                  </motion.a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner CTA for Owners wishing to takeover their mortgage */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 p-6 sm:p-8 text-white relative overflow-hidden shadow-xl"
        >
          <div className="absolute right-0 top-0 w-80 h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400 to-transparent" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center lg:text-left">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30 inline-block">
                Solusi Pemilik Rumah
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                Punya KPR Berjalan yang Ingin Di-Takeover (Oper Kredit)?
              </h3>
              <p className="text-sm text-slate-300 max-w-2xl">
                Daftarkan rumah Anda. Tim kami akan membantu pemasaran ke calon pembeli terverifikasi dan mengurus legalitas Notaris PPAT secara aman dan transparan.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm shadow-md transition-all"
              >
                <span>Pasang Listing Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`${WA_GLOBAL_LINK}?text=Halo%20CariRumah,%20saya%20pemilik%20rumah%20ingin%20konsultasi%20oper%20kredit%20takeover%20KPR`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi Pemilik</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
