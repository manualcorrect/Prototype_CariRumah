'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, 
  ShieldCheck, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ChevronRight,
  Calculator,
  Box,
  Clock,
  FileCheck2,
  Sliders,
  Layers,
  Star,
  Check,
  Building2,
  Tv,
  Sofa,
  Lightbulb,
  DoorClosed
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WA_GLOBAL_LINK } from '@/data/mockData';

export default function DetailInteriorPage() {
  const [activePackage, setActivePackage] = useState<'basic' | 'premium'>('premium');
  const [sliderPos, setSliderPos] = useState<number>(50);

  const basicItems = [
    "Partisi Ruangan Minimalis Kisi-Kisi Kayu (Multiplek 15mm + Taco HPL)",
    "Backdrop TV Floating Wall 160cm dengan hidden cable organizer",
    "Plafon Drop Ceiling 1 Trap dengan Indirect LED Warm White",
    "Pengecatan Ulang Dinding Ruang Tamu (Cat Dulux EasyClean Anti-Noda)"
  ];

  const premiumItems = [
    "Semua item pada Paket Basic",
    "Kitchen Island Mini Bar Terintegrasi Partisi Ruangan",
    "Pintu Geser Kamar Mandi Semi-Alumunium Estetik",
    "Kabinet Dinding Gantung Storage Tambahan atas TV",
    "Stop Kontak Tambahan Panasonic & Saklar Dimmer Pintar",
    "Free 3D SketchUp Modeling & Render Visual Realistis"
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-cyan-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Breadcrumb Bar */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto py-1">
            <Link href="/" className="hover:text-cyan-600 transition-colors">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/renov-rumah" className="hover:text-cyan-600 transition-colors">RenovRumah</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-cyan-700 font-bold">Paket Interior Minimalis (30/60 &amp; 36/60)</span>
          </div>

          {/* Hero Showcase Section */}
          <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 rounded-3xl p-6 sm:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Spesialis Rumah Subsidi Tipe 30 &amp; 36 Banten</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Paket Desain &amp; Renovasi <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">Interior Minimalis</span> Hunian Subsidi
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  Solusi memaksimalkan ruang terbatas rumah subsidi tipe 30/60 &amp; 36/60 menjadi lapang dan estetik bergaya modern Skandinavia dengan material standar SNI (Jayaboard &amp; Taco HPL) serta proteksi garansi konstruksi 1 tahun.
                </p>

                {/* 4 Trust Metric Pillars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
                    <Box className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                    <span className="text-xs font-bold block">Free 3D Model</span>
                    <span className="text-[10px] text-slate-300">Sketchup visual</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
                    <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                    <span className="text-xs font-bold block">3-7 Hari Kerja</span>
                    <span className="text-[10px] text-slate-300">Pengerjaan cepat</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
                    <FileCheck2 className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                    <span className="text-xs font-bold block">RAB Transparan</span>
                    <span className="text-[10px] text-slate-300">Tanpa mark-up</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                    <span className="text-xs font-bold block">Garansi 1 Thn</span>
                    <span className="text-[10px] text-slate-300">Tertulis di SPK</span>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={`${WA_GLOBAL_LINK}?text=Halo%20CariRumah,%20saya%20tertarik%20dengan%20Paket%20Interior%20Minimalis%20Rumah%20Subsidi%20untuk%20survey%20lokasi`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Konsultasi Desain &amp; Survey Gratis (WA)</span>
                  </a>

                  <a
                    href="#komparasi-paket"
                    className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/20 transition-all"
                  >
                    <span>Pilihan Paket Harga</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Hero Image Card */}
              <div className="lg:col-span-5 relative">
                <div className="bg-white p-3 rounded-3xl shadow-xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80"
                    alt="Hasil Proyek Interior Rumah Subsidi"
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                  <div className="absolute bottom-6 left-6 right-6 bg-slate-900/85 backdrop-blur-md p-3.5 rounded-2xl text-white flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">Hasil Proyek Nyata</span>
                      <p className="text-xs font-bold">Tipe 36/60 Kramatwatu, Kab. Serang</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-bold text-[11px] rounded-lg border border-emerald-500/30">
                      Selesai 5 Hari
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Before & After Showcase Slider */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">Portofolio Transformatif</span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Sebelum &amp; Sesudah Renovasi Interior Rumah Subsidi
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Geser slider di bawah untuk melihat bagaimana ruang tamu standar developer disulap menjadi area lapang dan berkelas.
              </p>
            </div>

            {/* Slider Component */}
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden select-none border border-slate-200">
              {/* After Image (Full background) */}
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=80"
                alt="Sesudah Renovasi"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                Sesudah (After Renovasi)
              </span>

              {/* Before Image (Clipped) */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80"
                  alt="Sebelum Renovasi"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%' }}
                />
                <span className="absolute top-4 left-4 bg-slate-900/80 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Sebelum (Standar Developer)
                </span>
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-2xl"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-cyan-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <Sliders className="w-4 h-4" />
                </div>
              </div>

              {/* Invisible range input for interaction */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              />
            </div>
          </div>

          {/* Komparasi Paket (Basic vs Premium) */}
          <div id="komparasi-paket" className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">Pilihan Spesifikasi &amp; Biaya</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Pilih Paket Interior Sesuai Kebutuhan Anda
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Harga transparan terikat SPK resmi tanpa biaya tersembunyi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Paket 1: Basic */}
              <motion.div
                whileHover={{ y: -4 }}
                className={`rounded-3xl p-6 sm:p-8 border transition-all flex flex-col justify-between ${
                  activePackage === 'basic' 
                    ? 'bg-white border-cyan-500 shadow-xl ring-2 ring-cyan-500/20' 
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">
                      Paket Minimalis Starter
                    </span>
                    <span className="text-xs text-slate-500">Pengerjaan 3-5 Hari</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900">Paket Basic</h3>
                  <div className="mt-2 mb-6">
                    <span className="text-3xl font-extrabold text-cyan-700">Rp 3.500.000</span>
                    <span className="text-xs text-slate-500 block mt-0.5">Estimasi untuk Tipe 30/60 &amp; 36/60</span>
                  </div>

                  <div className="space-y-3 pb-6 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Item Termasuk:</span>
                    {basicItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <a
                    href={`${WA_GLOBAL_LINK}?text=Halo%20Tim%20RenovRumah,%20saya%20tertarik%20pesan%20Paket%20Basic%20Interior%20Minimalis%20(Rp%203.500.000)`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Pilih Paket Basic via WhatsApp</span>
                  </a>
                </div>
              </motion.div>

              {/* Paket 2: Premium */}
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-cyan-950 via-slate-900 to-slate-900 text-white border border-cyan-700/50 shadow-2xl flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500 text-slate-950 font-extrabold text-xs rounded-full shadow-md">
                  Paling Populer ⭐
                </div>

                <div>
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-bold border border-cyan-500/30">
                      Paket Full Makeover
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white">Paket Premium Complete</h3>
                  <div className="mt-2 mb-6">
                    <span className="text-3xl font-extrabold text-cyan-400">Rp 7.800.000</span>
                    <span className="text-xs text-slate-300 block mt-0.5">Lengkap Interior + Mini Bar + Drop Ceiling</span>
                  </div>

                  <div className="space-y-3 pb-6 border-b border-white/10">
                    <span className="text-xs font-bold text-cyan-200 block uppercase tracking-wider">Item Termasuk:</span>
                    {premiumItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <a
                    href={`${WA_GLOBAL_LINK}?text=Halo%20Tim%20RenovRumah,%20saya%20tertarik%20pesan%20Paket%20Premium%20Complete%20Interior%20(Rp%207.800.000)`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-2xl font-extrabold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Pilih Paket Premium via WhatsApp</span>
                  </a>
                </div>
              </motion.div>

            </div>
          </div>

          {/* 4 Tahapan Proses Kerja (SOP Resmi) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">SOP Pengerjaan</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                4 Tahap Mudah Renovasi Interior Tanpa Cemas
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 font-extrabold flex items-center justify-center text-xs">1</span>
                <strong className="text-xs font-bold text-slate-900 block">Konsultasi &amp; Survey Lokasi</strong>
                <p className="text-[11px] text-slate-500">Tim estimator datang mengukur ruangan dan konsultasi konsep desain impian Anda.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 font-extrabold flex items-center justify-center text-xs">2</span>
                <strong className="text-xs font-bold text-slate-900 block">3D Modeling &amp; RAB Final</strong>
                <p className="text-[11px] text-slate-500">Visualisasi 3D SketchUp dan rincian material SNI transparan disepakati bersama.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 font-extrabold flex items-center justify-center text-xs">3</span>
                <strong className="text-xs font-bold text-slate-900 block">Pabrikasi &amp; Instalasi Cepat</strong>
                <p className="text-[11px] text-slate-500">Pengerjaan partisi dan backdrop presisi 3-7 hari kerja tanpa mengotori seluruh rumah.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 font-extrabold flex items-center justify-center text-xs">4</span>
                <strong className="text-xs font-bold text-slate-900 block">Serah Terima &amp; Garansi 1 Thn</strong>
                <p className="text-[11px] text-slate-500">Pengecekan kualitas bersama konsumen dan penyerahan kartu garansi resmi tertulis.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
