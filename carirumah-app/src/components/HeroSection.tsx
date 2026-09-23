'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  MapPin, 
  BadgePercent, 
  CheckCircle2,
  Building,
  KeyRound
} from 'lucide-react';
import { WA_GLOBAL_LINK } from '@/data/mockData';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cyan-50/60 via-white to-slate-50 pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* Background glowing blurred circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-cyan-200 text-cyan-800 shadow-xs text-xs sm:text-sm font-semibold"
            >
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <span>Pusat Rumah Subsidi &amp; Takeover KPR Wilayah Banten</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]"
            >
              Wujudkan Impian Punya{' '}
              <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Rumah Nyaman
              </span>{' '}
              di Serang &amp; Cilegon
            </motion.h1>

            {/* Sub-headline / Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Temukan unit <strong>Rumah Subsidi FLPP Flat 5%</strong> resmi developer, atau <strong>Takeover KPR (Oper Kredit)</strong> siap huni dengan pendampingan Notaris PPAT legal sampai selesai.
            </motion.p>

            {/* Key Value Propositions Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2"
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 bg-white/80 border border-slate-200/80 rounded-xl p-2.5 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Cicilan Mulai 1 Juta/bln</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 bg-white/80 border border-slate-200/80 rounded-xl p-2.5 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Akta Notaris PPAT Resmi</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 bg-white/80 border border-slate-200/80 rounded-xl p-2.5 shadow-xs col-span-2 sm:col-span-1">
                <BadgePercent className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Bunga Subsidi Flat 5%</span>
              </div>
            </motion.div>

            {/* Action CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#subsidi"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm sm:text-base shadow-md shadow-cyan-600/20 hover:shadow-lg transition-all"
              >
                <Building className="w-4 h-4" />
                <span>Katalog Rumah Subsidi</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#takeover"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-300 shadow-xs hover:border-cyan-300 transition-all"
              >
                <KeyRound className="w-4 h-4 text-cyan-600" />
                <span>Lihat Takeover KPR</span>
              </motion.a>
            </motion.div>

          </div>

          {/* Right Hero Interactive Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-white p-3 border border-slate-200 shadow-xl">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
                  alt="Rumah Subsidi Banten"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Status Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-slate-800 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Unit Siap Akad &amp; Huni</span>
                </div>

                {/* Floating Location Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/85 backdrop-blur-md p-3 rounded-xl text-white flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-300 block">Kramatwatu &amp; Ciruas, Serang</span>
                    <span className="text-sm font-bold">Cicilan Flat Rp 1.080.000 / bln</span>
                  </div>
                  <a
                    href={`${WA_GLOBAL_LINK}?text=Halo%20CariRumah,%20saya%20ingin%20tanya%20info%20Rumah%20Subsidi%20Kramatwatu`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    Tanya WA
                  </a>
                </div>
              </div>
            </div>

            {/* Small floating counter card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="absolute -bottom-5 -left-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-lg hidden sm:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block font-medium">Cakupan Wilayah</span>
                <span className="text-sm font-bold text-slate-900">Serang, Cilegon &amp; Sekitarnya</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
