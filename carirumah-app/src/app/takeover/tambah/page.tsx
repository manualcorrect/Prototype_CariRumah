'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  CreditCard, 
  Camera, 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  SkipForward, 
  MessageCircle, 
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WA_GLOBAL_LINK, DISTRICTS_BANTEN } from '@/data/mockData';

export default function AddTakeoverListingPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [skippedSteps, setSkippedSteps] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form states
  // Bagian A
  const [houseType, setHouseType] = useState('Subsidi FLPP');
  const [kabupaten, setKabupaten] = useState('Kabupaten Serang');
  const [kecamatan, setKecamatan] = useState('Kramatwatu');
  const [address, setAddress] = useState('');
  const [blockNumber, setBlockNumber] = useState('');

  // Bagian B
  const [bankOrigin, setBankOrigin] = useState('Bank BTN');
  const [takeoverDp, setTakeoverDp] = useState('');
  const [monthlyInstallment, setMonthlyInstallment] = useState('');
  const [remainingTenor, setRemainingTenor] = useState('15 Tahun');
  const [outstandingPrincipal, setOutstandingPrincipal] = useState('');

  // Bagian C
  const [hasPhotos, setHasPhotos] = useState(false);

  // Bagian D
  const [notarisPreference, setNotarisPreference] = useState('Notaris Rekanan CariRumah (Serang/Cilegon)');
  const [hasSp3k, setHasSp3k] = useState(false);
  const [hasRekKoran, setHasRekKoran] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleSkip = () => {
    if (!skippedSteps.includes(currentStep)) {
      setSkippedSteps([...skippedSteps, currentStep]);
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const stepTitles = [
    "Identitas & Lokasi Unit",
    "Skema Finansial & KPR",
    "Dokumentasi & Struk KPR",
    "Kesiapan Notaris PPAT"
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-cyan-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-700 mb-2">
            <Link href="/dashboard/member" className="hover:underline">Dashboard Member</Link>
            <span>/</span>
            <span className="text-slate-500">Pasang Listing Takeover Baru</span>
          </div>

          {!isSubmitted ? (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
              
              {/* Header Title */}
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Formulir Pendaftaran Listing Takeover (Oper Kredit)
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Isi data yang Anda ketahui. Jika belum memiliki dokumen pendukung tertentu saat ini, Anda dapat menekan tombol <strong>"Lewati Bagian Ini"</strong>.
                </p>
              </div>

              {/* Step Progress Indicators */}
              <div className="grid grid-cols-4 gap-2 pt-2 pb-4 border-b border-slate-100">
                {stepTitles.map((title, idx) => {
                  const stepNum = idx + 1;
                  const isCurrent = currentStep === stepNum;
                  const isPast = currentStep > stepNum;
                  const isSkipped = skippedSteps.includes(stepNum);

                  return (
                    <div key={idx} className="flex flex-col">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCurrent 
                            ? 'bg-cyan-600 text-white shadow-xs' 
                            : isPast 
                              ? isSkipped ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-400'
                        }`}>
                          {isPast && !isSkipped ? <CheckCircle2 className="w-4 h-4" /> : stepNum}
                        </div>
                        <span className={`text-[11px] font-bold truncate hidden sm:inline ${isCurrent ? 'text-cyan-700' : 'text-slate-500'}`}>
                          {isSkipped ? 'Dilewati' : `Bagian ${String.fromCharCode(65 + idx)}`}
                        </span>
                      </div>
                      <div className={`h-1.5 rounded-full ${
                        isCurrent 
                          ? 'bg-cyan-500' 
                          : isPast 
                            ? isSkipped ? 'bg-amber-400' : 'bg-emerald-500' 
                            : 'bg-slate-100'
                      }`} />
                    </div>
                  );
                })}
              </div>

              {/* STEP CONTENT WITH ANIMATION */}
              <AnimatePresence mode="wait">
                
                {/* BAGIAN A */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <MapPin className="w-5 h-5 text-cyan-600" />
                      <h2 className="text-base font-bold text-slate-900">Bagian A: Identitas &amp; Lokasi Unit Rumah</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Program Rumah</label>
                        <select
                          value={houseType}
                          onChange={(e) => setHouseType(e.target.value)}
                          className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                        >
                          <option>Rumah Subsidi FLPP</option>
                          <option>Rumah Komersil / Non-Subsidi</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Kabupaten / Kota</label>
                        <select
                          value={kabupaten}
                          onChange={(e) => setKabupaten(e.target.value)}
                          className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                        >
                          <option>Kabupaten Serang</option>
                          <option>Kota Serang</option>
                          <option>Kota Cilegon</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Kecamatan</label>
                        <select
                          value={kecamatan}
                          onChange={(e) => setKecamatan(e.target.value)}
                          className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                        >
                          {DISTRICTS_BANTEN.map(d => (
                            <option key={d.name} value={d.name}>{d.name} ({d.kab})</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Nama Perumahan &amp; Blok</label>
                        <input
                          type="text"
                          placeholder="Contoh: Perumahan Griya Kramatwatu Blok C-12"
                          value={blockNumber}
                          onChange={(e) => setBlockNumber(e.target.value)}
                          className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Alamat Lengkap / Patokan</label>
                      <textarea
                        rows={2}
                        placeholder="Contoh: Jl. Raya Cilegon Km 8, dekat Polsek Kramatwatu"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </motion.div>
                )}

                {/* BAGIAN B */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <CreditCard className="w-5 h-5 text-cyan-600" />
                      <h2 className="text-base font-bold text-slate-900">Bagian B: Skema Finansial &amp; Sisa Hutang KPR</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Bank Penyalur KPR Asal</label>
                        <select
                          value={bankOrigin}
                          onChange={(e) => setBankOrigin(e.target.value)}
                          className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                        >
                          <option>Bank BTN Konvensional</option>
                          <option>Bank BTN Syariah</option>
                          <option>Bank BRI</option>
                          <option>Bank BJB / BJB Syariah</option>
                          <option>Bank Mandiri</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">DP / Ganti Biaya yang Diinginkan</label>
                        <input
                          type="text"
                          placeholder="Contoh: Rp 38.500.000 (Bisa nego)"
                          value={takeoverDp}
                          onChange={(e) => setTakeoverDp(e.target.value)}
                          className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Cicilan Bulanan Berjalan</label>
                        <input
                          type="text"
                          placeholder="Contoh: Rp 1.050.000 / bln"
                          value={monthlyInstallment}
                          onChange={(e) => setMonthlyInstallment(e.target.value)}
                          className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Sisa Tenor Berjalan</label>
                        <select
                          value={remainingTenor}
                          onChange={(e) => setRemainingTenor(e.target.value)}
                          className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                        >
                          <option>10 Tahun lagi</option>
                          <option>12 Tahun lagi</option>
                          <option>15 Tahun lagi</option>
                          <option>18 Tahun lagi</option>
                          <option>20 Tahun lagi</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* BAGIAN C */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <Camera className="w-5 h-5 text-cyan-600" />
                      <h2 className="text-base font-bold text-slate-900">Bagian C: Dokumentasi Foto &amp; Struk KPR</h2>
                    </div>

                    <div className="border-2 border-dashed border-slate-300 hover:border-cyan-500 rounded-2xl p-6 text-center bg-slate-50/70 transition-all cursor-pointer">
                      <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <span className="text-xs sm:text-sm font-bold text-slate-700 block">
                        Unggah Foto Tampak Depan, Ruang Tamu, &amp; Struk Angsuran Terakhir
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-1">
                        Format JPG, PNG (Maks 10MB per berkas)
                      </span>
                      <button
                        type="button"
                        onClick={() => setHasPhotos(!hasPhotos)}
                        className="mt-3 px-3 py-1.5 bg-slate-200 text-slate-800 rounded-lg text-xs font-bold hover:bg-slate-300"
                      >
                        {hasPhotos ? '✓ 3 Foto Terpilih' : 'Pilih File Foto'}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* BAGIAN D */}
                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <FileText className="w-5 h-5 text-cyan-600" />
                      <h2 className="text-base font-bold text-slate-900">Bagian D: Kesiapan Dokumen Notaris PPAT</h2>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Notaris Rekanan PPAT</label>
                        <select
                          value={notarisPreference}
                          onChange={(e) => setNotarisPreference(e.target.value)}
                          className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                        >
                          <option>Notaris Rekanan CariRumah (Serang / Cilegon / Kramatwatu)</option>
                          <option>Notaris Pilihan Sendiri</option>
                        </select>
                      </div>

                      <div className="pt-2 space-y-2">
                        <span className="text-xs font-bold text-slate-700 block">Checklist Berkas yang Sudah Siap:</span>
                        
                        <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={hasSp3k}
                            onChange={(e) => setHasSp3k(e.target.checked)}
                            className="w-4 h-4 rounded text-cyan-600"
                          />
                          <span className="text-xs text-slate-800 font-medium">Surat Perjanjian Kredit (SP3K) / Bukti Akad Awal</span>
                        </label>

                        <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={hasRekKoran}
                            onChange={(e) => setHasRekKoran(e.target.checked)}
                            className="w-4 h-4 rounded text-cyan-600"
                          />
                          <span className="text-xs text-slate-800 font-medium">Rekening Koran Pembayaran Angsuran 3-6 Bulan Terakhir</span>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* ACTION BUTTONS (MANDATORY SKIP BUTTON FEATURE) */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali</span>
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  {/* SKIP SECTION BUTTON */}
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-bold transition-all cursor-pointer"
                  >
                    <SkipForward className="w-3.5 h-3.5 text-amber-600" />
                    <span>Lewati Bagian Ini</span>
                  </button>

                  {/* NEXT / SUBMIT BUTTON */}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                  >
                    <span>{currentStep === 4 ? 'Kirim Pendaftaran Listing' : 'Lanjutkan'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* SUBMISSION CONFIRMATION MESSAGE (AS PER PRD) */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 text-center space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Listing Anda Sedang Ditinjau!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Data pengajuan oper kredit rumah Anda telah masuk ke antrean verifikasi admin CariRumah Banten. Tim kami akan segera menghubungi Anda via WhatsApp untuk melengkapi data atau menjadwalkan konsultasi akta Notaris PPAT.
                </p>
              </div>

              {skippedSteps.length > 0 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl max-w-md mx-auto text-xs text-amber-900">
                  <span>Catatan: Anda melewati <strong>{skippedSteps.length} bagian</strong> pengisian. Anda dapat mengirimkan foto atau struk pendukung langsung via chat WhatsApp dengan tim kami.</span>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/dashboard/member"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs sm:text-sm shadow-sm"
                >
                  Buka Dashboard Member
                </Link>

                <a
                  href={`${WA_GLOBAL_LINK}?text=Halo%20Admin%20CariRumah,%20saya%20baru%20saja%20mengisi%20formulir%20Listing%20Takeover%20KPR%20untuk%20wilayah%20${encodeURIComponent(kecamatan)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konfirmasi via WhatsApp</span>
                </a>
              </div>
            </motion.div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
