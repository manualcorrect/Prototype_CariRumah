'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  KeyRound, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  PlusCircle, 
  MessageCircle, 
  FileText, 
  ShieldCheck, 
  ChevronRight, 
  Eye, 
  Sparkles,
  TrendingUp,
  UserCheck,
  PhoneCall,
  ExternalLink,
  Info
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WA_GLOBAL_LINK } from '@/data/mockData';

interface MemberListing {
  id: string;
  title: string;
  location: string;
  bankOrigin: string;
  takeoverDp: string;
  monthlyInstallment: string;
  status: 'complete' | 'pending';
  progress: number;
  skippedSections: string[];
  checklist: {
    sp3kAndBank: boolean;
    identityVerified: boolean;
    aktaPpat: boolean;
    notarisAssigned: boolean;
  };
  adminNotes?: string;
  submittedAt: string;
}

const INITIAL_MEMBER_LISTINGS: MemberListing[] = [
  {
    id: "LIST-1029",
    title: "Rumah Subsidi Type 36/60 Siap Huni Taman Ciruas Permai",
    location: "Ciruas, Kab. Serang",
    bankOrigin: "Bank BTN Syariah",
    takeoverDp: "Rp 42.000.000",
    monthlyInstallment: "Rp 1.040.000 / bln",
    status: "complete",
    progress: 100,
    skippedSections: [],
    checklist: {
      sp3kAndBank: true,
      identityVerified: true,
      aktaPpat: true,
      notarisAssigned: true
    },
    adminNotes: "Dokumen telah lengkap dan diverifikasi Notaris Rekanan (Kramatwatu). Listing aktif di katalog publik.",
    submittedAt: "18 Sep 2026"
  },
  {
    id: "LIST-1044",
    title: "Oper Kredit Rumah Kramatwatu Blok D-14",
    location: "Kramatwatu, Kab. Serang",
    bankOrigin: "Bank BTN Konvensional",
    takeoverDp: "Rp 38.500.000",
    monthlyInstallment: "Rp 980.000 / bln",
    status: "pending",
    progress: 50,
    skippedSections: ["Bagian C: Foto & Struk KPR", "Bagian D: Kesiapan Dokumen Notaris PPAT"],
    checklist: {
      sp3kAndBank: false,
      identityVerified: true,
      aktaPpat: false,
      notarisAssigned: false
    },
    adminNotes: "Menunggu lampiran rekening koran 3 bulan terakhir dan foto tampak depan rumah.",
    submittedAt: "22 Sep 2026"
  }
];

export default function MemberDashboard() {
  const [listings, setListings] = useState<MemberListing[]>(INITIAL_MEMBER_LISTINGS);
  const [selectedListing, setSelectedListing] = useState<MemberListing>(INITIAL_MEMBER_LISTINGS[1]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-cyan-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Breadcrumb & User Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-700 mb-1">
                <span>Dashboard Member</span>
                <span>/</span>
                <span className="text-slate-500">Kelola Listing Takeover</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Halo, Bapak Wisnu Pratama 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Pantau status verifikasi kelengkapan dokumen legalitas dan listing oper kredit Anda.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/takeover/tambah"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Pasang Listing Baru</span>
              </Link>
              
              <a
                href={`${WA_GLOBAL_LINK}?text=Halo%20Admin%20CariRumah,%20saya%20member%20Wisnu%20(ID:%20LIST-1044)%20ingin%20konsultasi%20kelengkapan%20dokumen`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Bantuan Admin WA</span>
              </a>
            </div>
          </div>

          {/* Tips Edukasi Konversi Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-cyan-500/10 border border-amber-300/60 p-4 sm:p-5 flex items-start gap-4"
          >
            <div className="p-2.5 rounded-xl bg-amber-500 text-white shrink-0 shadow-xs">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Tips Konversi: Ganti DP Realistis Menarik Pembeli 2x Lebih Cepat</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase">Rekomendasi</span>
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Di wilayah Serang &amp; Cilegon, pembeli takeover memprioritaskan unit yang telah siap huni dengan DP ganti biaya di kisaran <strong>Rp 30 - 45 Juta</strong>. Sisa cicilan yang di bawah Rp 1,1 Juta/bulan rata-rata closing dalam waktu kurang dari 14 hari.
              </p>
            </div>
          </motion.div>

          {/* Main Grid: Left Listings List, Right Detail Progress */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: List of properties owned by member */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  Daftar Properti Anda ({listings.length})
                </h3>
                <span className="text-xs text-slate-500 font-medium">Klik untuk melihat detail</span>
              </div>

              {listings.map((item) => {
                const isSelected = selectedListing.id === item.id;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedListing(item)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-white border-cyan-500 shadow-md ring-2 ring-cyan-500/10' 
                        : 'bg-white/80 hover:bg-white border-slate-200 shadow-xs hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {item.id}
                      </span>
                      {item.status === 'complete' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Tayang (Complete)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Pending Review ({item.progress}%)</span>
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                      {item.title}
                    </h4>

                    <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
                      <span>{item.location} • {item.bankOrigin}</span>
                      <strong className="text-teal-700 font-bold">{item.takeoverDp}</strong>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] mb-1 font-medium text-slate-500">
                        <span>Kelengkapan Dokumen</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${item.status === 'complete' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Column: Selected Listing Deep-Dive Progress Tracker */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-6">
                
                {/* Header Detail */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">ID: {selectedListing.id}</span>
                      <span className="text-xs text-slate-400">• Diajukan pada {selectedListing.submittedAt}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      {selectedListing.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {selectedListing.location} • DP: <strong className="text-teal-700">{selectedListing.takeoverDp}</strong> • Angsuran: <strong className="text-slate-800">{selectedListing.monthlyInstallment}</strong>
                    </p>
                  </div>

                  {selectedListing.status === 'complete' ? (
                    <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold shrink-0 inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Terverifikasi Publik
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-bold shrink-0 inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      Dalam Peninjauan
                    </span>
                  )}
                </div>

                {/* Section yang di-skip (Jika ada) */}
                {selectedListing.skippedSections.length > 0 && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-800">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Bagian yang Anda Lewati Saat Pengisian:</span>
                    </div>
                    <ul className="text-xs text-rose-700 list-disc list-inside space-y-0.5 ml-1">
                      {selectedListing.skippedSections.map((sec, sIdx) => (
                        <li key={sIdx}><strong>{sec}</strong></li>
                      ))}
                    </ul>
                    <p className="text-[11px] text-rose-600 pt-1">
                      Tim admin agensi kami akan membantu verifikasi kelengkapan berkas di atas secara langsung melalui WhatsApp.
                    </p>
                  </div>
                )}

                {/* Catatan Admin / Status Override (Transparansi) */}
                {selectedListing.adminNotes && (
                  <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200/80 text-cyan-950">
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-900 mb-1">
                      <Info className="w-4 h-4 text-cyan-600" />
                      <span>Catatan Tim Admin CariRumah:</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      "{selectedListing.adminNotes}"
                    </p>
                  </div>
                )}

                {/* Progress Tracker Checklist Legalitas */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-600" />
                    <span>Checklist Legalitas &amp; Notaris PPAT</span>
                  </h4>

                  <div className="space-y-3">
                    {/* Item 1 */}
                    <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/60">
                      <div className={`p-1.5 rounded-lg shrink-0 ${selectedListing.checklist.sp3kAndBank ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">1. Rekening Koran &amp; Bukti Angsuran KPR</span>
                          <span className={`font-semibold ${selectedListing.checklist.sp3kAndBank ? 'text-emerald-700' : 'text-slate-400'}`}>
                            {selectedListing.checklist.sp3kAndBank ? 'Lengkap & Valid' : 'Belum Diverifikasi'}
                          </span>
                        </div>
                        <p className="text-slate-500 mt-0.5">Memastikan status pembayaran lancar dan sisa pokok akurat.</p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/60">
                      <div className={`p-1.5 rounded-lg shrink-0 ${selectedListing.checklist.identityVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">2. Verifikasi Identitas &amp; WhatsApp Pemilik</span>
                          <span className={`font-semibold ${selectedListing.checklist.identityVerified ? 'text-emerald-700' : 'text-slate-400'}`}>
                            {selectedListing.checklist.identityVerified ? 'Terverifikasi' : 'Menunggu'}
                          </span>
                        </div>
                        <p className="text-slate-500 mt-0.5">Mencegah listing palsu dan memastikan kontak valid.</p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/60">
                      <div className={`p-1.5 rounded-lg shrink-0 ${selectedListing.checklist.notarisAssigned ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">3. Notaris Rekanan PPAT Ditunjuk</span>
                          <span className={`font-semibold ${selectedListing.checklist.notarisAssigned ? 'text-emerald-700' : 'text-slate-400'}`}>
                            {selectedListing.checklist.notarisAssigned ? 'Notaris Ditunjuk' : 'Dalam Antrean'}
                          </span>
                        </div>
                        <p className="text-slate-500 mt-0.5">Pendampingan legalitas pembuatan Akta Kuasa Menjual &amp; Perjanjian Pengalihan Hak.</p>
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/60">
                      <div className={`p-1.5 rounded-lg shrink-0 ${selectedListing.checklist.aktaPpat ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">4. Siap Tanda Tangan Akta Notaris PPAT</span>
                          <span className={`font-semibold ${selectedListing.checklist.aktaPpat ? 'text-emerald-700' : 'text-slate-400'}`}>
                            {selectedListing.checklist.aktaPpat ? 'Siap Akad' : 'Tahap Akhir'}
                          </span>
                        </div>
                        <p className="text-slate-500 mt-0.5">Tanda tangan akta pengalihan resmi saat pembeli terkonfirmasi.</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    Perlu update foto atau data cicilan?
                  </span>
                  <a
                    href={`${WA_GLOBAL_LINK}?text=Halo%20Admin%20CariRumah,%20saya%20ingin%20memperbarui%20data%20listing%20saya%20(ID:%20${selectedListing.id})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Kirim Dokumen Tambahan (WA)</span>
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
