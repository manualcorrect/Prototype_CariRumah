'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  KeyRound, 
  Wrench, 
  Info, 
  MessageCircle, 
  User, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  MapPin,
  ChevronRight,
  BadgePercent,
  CheckCircle2
} from 'lucide-react';
import { WA_GLOBAL_LINK, RENOV_SERVICES, DISTRICTS_BANTEN, SUBSIDY_HOUSES } from '@/data/mockData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [renovDropdownOpen, setRenovDropdownOpen] = useState(false);
  const [subsidiDropdownOpen, setSubsidiDropdownOpen] = useState(false);
  const [activeCityTab, setActiveCityTab] = useState<'all' | 'kab-serang' | 'kota-serang' | 'kota-cilegon'>('all');

  const filteredDistricts = activeCityTab === 'all'
    ? DISTRICTS_BANTEN
    : activeCityTab === 'kab-serang'
      ? DISTRICTS_BANTEN.filter(d => d.kab === 'Kabupaten Serang')
      : activeCityTab === 'kota-serang'
        ? DISTRICTS_BANTEN.filter(d => d.kab === 'Kota Serang')
        : DISTRICTS_BANTEN.filter(d => d.kab === 'Kota Cilegon');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-cyan-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-cyan-500/20"
            >
              <Building2 className="w-6 h-6" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-cyan-600 transition-colors">
                CariRumah<span className="text-cyan-500 text-xs font-semibold ml-1 px-1.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200">Banten</span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 -mt-1">
                Subsidi &amp; Takeover KPR
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Mega-Menus */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            
            {/* 1. MEGA-MENU RUMAH SUBSIDI */}
            <div 
              className="relative"
              onMouseEnter={() => setSubsidiDropdownOpen(true)}
              onMouseLeave={() => setSubsidiDropdownOpen(false)}
            >
              <Link 
                href="/rumah-subsidi" 
                className="flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 hover:bg-cyan-50/60 rounded-lg transition-all cursor-pointer"
              >
                <span>Rumah Subsidi</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${subsidiDropdownOpen ? 'rotate-180 text-cyan-600' : 'text-slate-400'}`} />
              </Link>

              <AnimatePresence>
                {subsidiDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-2 w-[720px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5 z-50 overflow-hidden"
                  >
                    {/* Header Bar */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                        <Building2 className="w-4 h-4 text-cyan-600" />
                        <span>Katalog Rumah Baru Subsidi FLPP Banten</span>
                      </div>
                      <span className="text-[11px] font-semibold text-cyan-800 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
                        Bunga Flat 5% Hingga 20 Tahun
                      </span>
                    </div>

                    {/* Content Grid: Left Tabs, Right Districts */}
                    <div className="grid grid-cols-12 gap-4">
                      
                      {/* Left: City Filter Tabs */}
                      <div className="col-span-4 space-y-1.5 border-r border-slate-100 pr-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                          Pilih Wilayah:
                        </span>

                        <button
                          type="button"
                          onClick={() => setActiveCityTab('all')}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                            activeCityTab === 'all'
                              ? 'bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-xs'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>Semua Banten</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveCityTab('kab-serang')}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                            activeCityTab === 'kab-serang'
                              ? 'bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-xs'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>Kabupaten Serang</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveCityTab('kota-serang')}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                            activeCityTab === 'kota-serang'
                              ? 'bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-xs'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>Kota Serang</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveCityTab('kota-cilegon')}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                            activeCityTab === 'kota-cilegon'
                              ? 'bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-xs'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>Kota Cilegon</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                        </button>
                      </div>

                      {/* Right: District Cards in selected City */}
                      <div className="col-span-8 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
                          <span>Kecamatan Pilihan Subsidi:</span>
                          <Link 
                            href="/rumah-subsidi" 
                            className="text-cyan-600 hover:underline flex items-center gap-0.5"
                          >
                            <span>Buka Katalog Penuh</span>
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {filteredDistricts.map((d) => (
                            <Link
                              key={d.name}
                              href="/rumah-subsidi"
                              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-cyan-300 hover:bg-cyan-50/40 transition-all group"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-cyan-100/70 text-cyan-700 flex items-center justify-center font-bold text-xs group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                                  <MapPin className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-slate-800 group-hover:text-cyan-700 block">
                                    {d.name}
                                  </span>
                                  <span className="text-[10px] text-slate-400 block -mt-0.5">
                                    {d.kab}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-100">
                                {d.count} Unit
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Bottom Mega-Menu Footer */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Bebas PPN</span>
                        <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Cicilan 1 Jt/bln</span>
                      </div>

                      <a
                        href={`${WA_GLOBAL_LINK}?text=Halo%20CariRumah,%20saya%20ingin%20info%20katalog%20Rumah%20Subsidi%20FLPP%20Banten`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Tanya Rumah Subsidi (WA)</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. TAKEOVER KPR */}
            <Link 
              href="/takeover" 
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 hover:bg-cyan-50/60 rounded-lg transition-all"
            >
              Takeover KPR
            </Link>

            {/* 3. MEGA-MENU RENOV RUMAH */}
            <div 
              className="relative"
              onMouseEnter={() => setRenovDropdownOpen(true)}
              onMouseLeave={() => setRenovDropdownOpen(false)}
            >
              <Link 
                href="/renov-rumah"
                className="flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 hover:bg-cyan-50/60 rounded-lg transition-all cursor-pointer"
              >
                <span>RenovRumah</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${renovDropdownOpen ? 'rotate-180 text-cyan-600' : 'text-slate-400'}`} />
              </Link>

              <AnimatePresence>
                {renovDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[680px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5 z-50 overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                        <Wrench className="w-4 h-4 text-cyan-600" />
                        <span>Layanan Renovasi Spesialis Rumah Baru Subsidi</span>
                      </div>
                      <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                        Garansi Konstruksi 1 Tahun
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {RENOV_SERVICES.map((s) => (
                        <Link
                          key={s.id}
                          href="/renov-rumah"
                          className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-cyan-300 hover:bg-cyan-50/40 transition-all group cursor-pointer"
                        >
                          <div className="w-9 h-9 rounded-lg bg-cyan-100/70 text-cyan-700 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                            {s.title[0]}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-bold text-slate-900 group-hover:text-cyan-700">
                                {s.title}
                              </span>
                              <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-1.5 py-0.5 rounded">
                                {s.startPrice}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {s.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Estimasi transparan, material SNI &amp; tanpa biaya tersembunyi</span>
                      <a
                        href={`${WA_GLOBAL_LINK}?text=Halo%20Tim%20RenovRumah,%20saya%20ingin%20konsultasi%20estimasi%20RAB%20Renovasi%20Rumah%20Subsidi`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Konsultasi RAB Gratis (WA)</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. TENTANG KAMI */}
            <Link 
              href="/#tentang" 
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 hover:bg-cyan-50/60 rounded-lg transition-all"
            >
              Tentang Kami
            </Link>
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={WA_GLOBAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi Kami</span>
            </motion.a>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm border border-slate-200 transition-all"
              >
                <User className="w-4 h-4 text-slate-600" />
                <span>Masuk / Daftar</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={WA_GLOBAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-600 text-white shadow-sm"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2"
          >
            <Link 
              href="/rumah-subsidi" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 font-medium text-slate-800"
            >
              <span>Katalog Rumah Subsidi Banten</span>
              <Building2 className="w-4 h-4 text-cyan-600" />
            </Link>
            <Link 
              href="/takeover" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 font-medium text-slate-800"
            >
              <span>Takeover KPR (Oper Kredit)</span>
              <KeyRound className="w-4 h-4 text-cyan-600" />
            </Link>
            <Link 
              href="/renov-rumah" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 font-medium text-slate-800"
            >
              <span>Layanan RenovRumah</span>
              <Wrench className="w-4 h-4 text-cyan-600" />
            </Link>
            <Link 
              href="/#tentang" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 font-medium text-slate-800"
            >
              <span>Tentang Kami</span>
              <Info className="w-4 h-4 text-cyan-600" />
            </Link>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={WA_GLOBAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-sm"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Konsultasi WhatsApp</span>
              </a>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl border border-slate-200"
              >
                <User className="w-4 h-4 text-slate-600" />
                <span>Login / Pasang Listing</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
