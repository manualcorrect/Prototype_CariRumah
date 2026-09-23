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
  PhoneCall
} from 'lucide-react';
import { WA_GLOBAL_LINK, RENOV_SERVICES } from '@/data/mockData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [renovDropdownOpen, setRenovDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
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
                Subsidi & Takeover KPR
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link 
              href="/#subsidi" 
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 hover:bg-cyan-50/60 rounded-lg transition-all"
            >
              Rumah Subsidi
            </Link>

            <Link 
              href="/#takeover" 
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 hover:bg-cyan-50/60 rounded-lg transition-all"
            >
              Takeover KPR
            </Link>

            {/* RenovRumah Mega Menu Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setRenovDropdownOpen(true)}
              onMouseLeave={() => setRenovDropdownOpen(false)}
            >
              <button 
                onClick={() => setRenovDropdownOpen(!renovDropdownOpen)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-cyan-600 hover:bg-cyan-50/60 rounded-lg transition-all cursor-pointer"
              >
                <span>RenovRumah</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${renovDropdownOpen ? 'rotate-180 text-cyan-600' : 'text-slate-400'}`} />
              </button>

              <AnimatePresence>
                {renovDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[540px] bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-4 z-50 overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        <Wrench className="w-4 h-4 text-cyan-600" />
                        <span>Layanan Spesialis Rumah Baru Subsidi</span>
                      </div>
                      <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                        Garansi 1 Tahun
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {RENOV_SERVICES.map((s) => (
                        <a
                          key={s.id}
                          href={WA_GLOBAL_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-cyan-200 hover:bg-cyan-50/40 transition-all group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-cyan-100/60 text-cyan-700 flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                            {s.title[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-900 group-hover:text-cyan-600">
                                {s.title}
                              </span>
                            </div>
                            <span className="text-[11px] font-semibold text-cyan-700 block">
                              {s.startPrice}
                            </span>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {s.description}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Konsultasi estimasi RAB GRATIS</span>
                      <a
                        href={WA_GLOBAL_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Chat Tim Renov
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
            className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3"
          >
            <Link 
              href="/#subsidi" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 font-medium text-slate-800"
            >
              <span>Rumah Subsidi Banten</span>
              <Building2 className="w-4 h-4 text-cyan-600" />
            </Link>
            <Link 
              href="/#takeover" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 font-medium text-slate-800"
            >
              <span>Takeover KPR (Oper Kredit)</span>
              <KeyRound className="w-4 h-4 text-cyan-600" />
            </Link>
            <Link 
              href="/#renov" 
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
