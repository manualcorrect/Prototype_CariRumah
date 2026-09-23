'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { WA_GLOBAL_LINK, RENOV_SERVICES, DISTRICTS_BANTEN, SUBSIDY_HOUSES } from '@/data/mockData';

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [renovDropdownOpen, setRenovDropdownOpen] = useState(false);
  
  // Click-based mega-menu state for Rumah Subsidi
  const [subsidiDropdownOpen, setSubsidiDropdownOpen] = useState(false);
  const [activeCityTab, setActiveCityTab] = useState<'all' | 'Kabupaten Serang' | 'Kota Serang' | 'Kota Cilegon'>('Kabupaten Serang');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const renovRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSubsidiDropdownOpen(false);
      }
      if (renovRef.current && !renovRef.current.contains(event.target as Node)) {
        setRenovDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Dynamic counting based on actual registered items in SUBSIDY_HOUSES
  const getSubsidyCount = (districtName?: string, kabName?: string) => {
    if (districtName) {
      return SUBSIDY_HOUSES.filter(h => h.kecamatan.toLowerCase() === districtName.toLowerCase()).length;
    }
    if (kabName && kabName !== 'all') {
      return SUBSIDY_HOUSES.filter(h => h.kabupaten.toLowerCase() === kabName.toLowerCase()).length;
    }
    return SUBSIDY_HOUSES.length;
  };

  const filteredDistricts = activeCityTab === 'all'
    ? DISTRICTS_BANTEN
    : DISTRICTS_BANTEN.filter(d => d.kab === activeCityTab);

  // When city tab is clicked: ONLY switch the active city tab inside mega-menu (NO REDIRECT)
  const handleCityTabClick = (city: 'all' | 'Kabupaten Serang' | 'Kota Serang' | 'Kota Cilegon') => {
    setActiveCityTab(city);
  };

  // When "Tampilkan Seluruh [Kota]" is clicked: Redirect to the entire city
  const handleViewAllInCity = (city: 'all' | 'Kabupaten Serang' | 'Kota Serang' | 'Kota Cilegon') => {
    setSubsidiDropdownOpen(false);
    if (city === 'all') {
      router.push('/rumah-subsidi');
    } else {
      router.push(`/rumah-subsidi?kab=${encodeURIComponent(city)}`);
    }
  };

  // When a specific district is clicked: Redirect directly to that district
  const handleDistrictClick = (districtName: string, kabName: string) => {
    setSubsidiDropdownOpen(false);
    router.push(`/rumah-subsidi?kab=${encodeURIComponent(kabName)}&kec=${encodeURIComponent(districtName)}`);
  };

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

          {/* Desktop Navigation with Clickable Mega-Menus */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            
            {/* 1. MEGA-MENU RUMAH SUBSIDI (CLICK TO OPEN & TOGGLE CITIES) */}
            <div className="relative" ref={dropdownRef}>
              <button 
                type="button"
                onClick={() => setSubsidiDropdownOpen(!subsidiDropdownOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  subsidiDropdownOpen 
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20' 
                    : 'text-slate-700 hover:text-cyan-600 hover:bg-cyan-50/60'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Rumah Subsidi</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${subsidiDropdownOpen ? 'rotate-180 text-white' : 'text-slate-400'}`} />
              </button>

              <AnimatePresence>
                {subsidiDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-2 w-[760px] bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 z-50 overflow-hidden"
                  >
                    {/* Header Bar */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                          <Building2 className="w-4 h-4 text-cyan-600" />
                          <span>Pilih Kota &amp; Kecamatan Rumah Subsidi</span>
                        </div>
                        <span className="text-xs text-slate-500">
                          Pilih kota di kiri untuk memperbarui daftar kecamatan di kanan
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-cyan-800 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
                        FLPP Flat 5%
                      </span>
                    </div>

                    {/* Content Grid: Left City Tabs, Right Dynamic District Cards */}
                    <div className="grid grid-cols-12 gap-5">
                      
                      {/* Left: City Filter Tabs (CLICK TO SWITCH DISTRICTS) */}
                      <div className="col-span-4 space-y-2 border-r border-slate-100 pr-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          1. Pilih Kota / Kabupaten:
                        </span>

                        <button
                          type="button"
                          onClick={() => handleCityTabClick('all')}
                          className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-left transition-all cursor-pointer ${
                            activeCityTab === 'all'
                              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                              : 'text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/60'
                          }`}
                        >
                          <span>Semua Banten</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            activeCityTab === 'all' ? 'bg-white text-cyan-800' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {getSubsidyCount()} Unit
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCityTabClick('Kabupaten Serang')}
                          className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-left transition-all cursor-pointer ${
                            activeCityTab === 'Kabupaten Serang'
                              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                              : 'text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/60'
                          }`}
                        >
                          <span>Kabupaten Serang</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            activeCityTab === 'Kabupaten Serang' ? 'bg-white text-cyan-800' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {getSubsidyCount(undefined, 'Kabupaten Serang')} Unit
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCityTabClick('Kota Serang')}
                          className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-left transition-all cursor-pointer ${
                            activeCityTab === 'Kota Serang'
                              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                              : 'text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/60'
                          }`}
                        >
                          <span>Kota Serang</span>
                          {getSubsidyCount(undefined, 'Kota Serang') > 0 ? (
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                              activeCityTab === 'Kota Serang' ? 'bg-white text-cyan-800' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {getSubsidyCount(undefined, 'Kota Serang')} Unit
                            </span>
                          ) : null}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCityTabClick('Kota Cilegon')}
                          className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-left transition-all cursor-pointer ${
                            activeCityTab === 'Kota Cilegon'
                              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                              : 'text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/60'
                          }`}
                        >
                          <span>Kota Cilegon</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            activeCityTab === 'Kota Cilegon' ? 'bg-white text-cyan-800' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {getSubsidyCount(undefined, 'Kota Cilegon')} Unit
                          </span>
                        </button>
                      </div>

                      {/* Right: Dynamic Districts in the active city tab */}
                      <div className="col-span-8 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            2. Pilih Kecamatan di {activeCityTab !== 'all' ? activeCityTab : 'Banten'}:
                          </span>

                          {/* Button to view all in currently chosen city */}
                          <button
                            type="button"
                            onClick={() => handleViewAllInCity(activeCityTab)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:text-cyan-900 bg-cyan-50 hover:bg-cyan-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            <span>Lihat Semua Unit di {activeCityTab !== 'all' ? activeCityTab : 'Banten'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Animated District Cards List */}
                        <div className="grid grid-cols-2 gap-2 max-h-[250px] overflow-y-auto pr-1">
                          <AnimatePresence mode="wait">
                            {filteredDistricts.map((d) => {
                              const count = getSubsidyCount(d.name);
                              return (
                                <motion.button
                                  key={`${activeCityTab}-${d.name}`}
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.15 }}
                                  type="button"
                                  onClick={() => handleDistrictClick(d.name, d.kab)}
                                  className="flex items-center justify-between p-2.5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-cyan-400 hover:bg-cyan-50/60 transition-all text-left group cursor-pointer"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-7 h-7 rounded-lg bg-cyan-100/80 text-cyan-700 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                                      <MapPin className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0">
                                      <span className="text-xs font-bold text-slate-800 group-hover:text-cyan-700 block truncate">
                                        {d.name}
                                      </span>
                                      <span className="text-[10px] text-slate-400 block truncate -mt-0.5">
                                        {d.kab}
                                      </span>
                                    </div>
                                  </div>

                                  {count > 0 ? (
                                    <span className="text-[10px] font-bold text-cyan-700 bg-cyan-100/80 px-2 py-0.5 rounded-md shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                                      {count} Unit
                                    </span>
                                  ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-cyan-600 shrink-0" />
                                  )}
                                </motion.button>
                              );
                            })}
                          </AnimatePresence>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Mega-Menu Footer */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Bebas PPN</span>
                        <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Angsuran 1 Jt/bln</span>
                      </div>

                      <a
                        href={`${WA_GLOBAL_LINK}?text=Halo%20CariRumah,%20saya%20ingin%20info%20katalog%20Rumah%20Subsidi%20FLPP%20Banten`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Konsultasi Rumah Subsidi (WA)</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. TAKEOVER KPR */}
            <Link 
              href="/takeover" 
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 hover:bg-cyan-50/60 rounded-xl transition-all"
            >
              Takeover KPR
            </Link>

            {/* 3. MEGA-MENU RENOV RUMAH */}
            <div className="relative" ref={renovRef}>
              <button 
                type="button"
                onClick={() => setRenovDropdownOpen(!renovDropdownOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  renovDropdownOpen 
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20' 
                    : 'text-slate-700 hover:text-cyan-600 hover:bg-cyan-50/60'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>RenovRumah</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${renovDropdownOpen ? 'rotate-180 text-white' : 'text-slate-400'}`} />
              </button>

              <AnimatePresence>
                {renovDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[700px] bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 z-50 overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                        <Wrench className="w-4 h-4 text-cyan-600" />
                        <span>Layanan Renovasi Spesialis Rumah Baru Subsidi</span>
                      </div>
                      <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                        Garansi Konstruksi 1 Tahun
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {RENOV_SERVICES.map((s) => (
                        <Link
                          key={s.id}
                          href="/renov-rumah"
                          onClick={() => setRenovDropdownOpen(false)}
                          className="flex items-start gap-3 p-3 rounded-2xl border border-slate-100 hover:border-cyan-300 hover:bg-cyan-50/40 transition-all group cursor-pointer"
                        >
                          <div className="w-9 h-9 rounded-xl bg-cyan-100/80 text-cyan-700 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-all">
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

                    <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Estimasi transparan, material SNI &amp; tanpa biaya tersembunyi</span>
                      <a
                        href={`${WA_GLOBAL_LINK}?text=Halo%20Tim%20RenovRumah,%20saya%20ingin%20konsultasi%20estimasi%20RAB%20Renovasi%20Rumah%20Subsidi`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
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
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 hover:bg-cyan-50/60 rounded-xl transition-all"
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
