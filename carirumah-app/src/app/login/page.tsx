'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  KeyRound, 
  Phone, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  
  // WhatsApp Number is mandatory first before Google or manual submit
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleSelection, setRoleSelection] = useState<'member' | 'developer'>('member');

  const isValidWhatsapp = whatsappNumber.trim().length >= 10 && /^[0-9+]+$/.test(whatsappNumber.trim());

  const handleGoogleAuth = () => {
    if (!isValidWhatsapp) return;
    // Simulating OAuth Google redirection
    if (roleSelection === 'developer') {
      window.location.href = '/dashboard/admin';
    } else {
      window.location.href = '/dashboard/member';
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidWhatsapp) return;
    window.location.href = '/dashboard/member';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-cyan-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-16 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8"
        >
          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center mx-auto font-bold shadow-xs">
              <Building2 className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {tab === 'login' ? 'Masuk ke Akun Anda' : 'Daftar Akun Baru'}
            </h1>
            <p className="text-xs text-slate-500">
              Kelola listing Takeover KPR atau Proyek Rumah Subsidi Banten
            </p>
          </div>

          {/* Tab Selector: Masuk / Daftar */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-6">
            <button
              onClick={() => setTab('login')}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                tab === 'login'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Masuk
            </button>
            <button
              onClick={() => setTab('register')}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                tab === 'register'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Daftar Baru
            </button>
          </div>

          {/* CRITICAL PRD REQUIREMENT: WhatsApp field must be entered first */}
          <div className="space-y-4">
            <div className="bg-cyan-50/70 border border-cyan-200/80 p-3.5 rounded-2xl">
              <label className="text-xs font-bold text-cyan-950 flex items-center justify-between mb-1">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-700" />
                  Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                </span>
                {isValidWhatsapp && (
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Valid
                  </span>
                )}
              </label>
              
              <input
                type="tel"
                placeholder="Contoh: 085129279843"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 font-medium"
              />
              
              <span className="text-[10px] text-slate-500 mt-1 block">
                Wajib diisi terlebih dahulu untuk verifikasi &amp; aktivasi akun.
              </span>
            </div>

            {/* Role Switcher if registering */}
            {tab === 'register' && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Mendaftar Sebagai:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRoleSelection('member')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      roleSelection === 'member'
                        ? 'bg-cyan-50 border-cyan-500 text-cyan-900 ring-1 ring-cyan-500'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Member (Takeover)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRoleSelection('developer')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      roleSelection === 'developer'
                        ? 'bg-teal-50 border-teal-500 text-teal-900 ring-1 ring-teal-500'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Developer (Cluster)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Google OAuth Button */}
            <div>
              <button
                type="button"
                disabled={!isValidWhatsapp}
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Lanjutkan dengan Google</span>
              </button>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-[10px] text-slate-400 uppercase font-bold">atau manual</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Manual Form */}
            <form onSubmit={handleManualSubmit} className="space-y-3">
              {tab === 'register' && (
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Nama Lengkap</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Nama lengkap Anda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 bg-slate-50"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Alamat Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Kata Sandi</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 bg-slate-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isValidWhatsapp}
                className="w-full py-3 mt-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-cyan-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {tab === 'login' ? 'Masuk ke Dashboard' : 'Buat Akun Sekarang'}
              </button>
            </form>

            {/* Demo access shortcuts for preview */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Akses Cepat Demo:</span>
              <div className="flex gap-2">
                <Link href="/dashboard/member" className="text-cyan-700 font-bold hover:underline">
                  Member
                </Link>
                <span>•</span>
                <Link href="/dashboard/admin" className="text-rose-700 font-bold hover:underline">
                  Admin
                </Link>
              </div>
            </div>

          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
