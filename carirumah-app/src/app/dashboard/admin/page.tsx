'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  ShieldAlert, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Search, 
  Filter, 
  Edit3, 
  Plus, 
  MessageCircle, 
  History, 
  FileCheck2, 
  Building, 
  KeyRound,
  Trash2,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WA_GLOBAL_LINK, AGENTS_DATA, SUBSIDY_HOUSES, TAKEOVER_HOUSES } from '@/data/mockData';

interface VerificationItem {
  id: string;
  type: 'takeover' | 'subsidi';
  title: string;
  submitterName: string;
  submitterPhone: string;
  location: string;
  priceOrDp: string;
  status: 'pending' | 'complete' | 'rejected';
  skippedSections: string[];
  submittedAt: string;
  adminNote?: string;
}

const INITIAL_QUEUE: VerificationItem[] = [
  {
    id: "LIST-1044",
    type: "takeover",
    title: "Oper Kredit Rumah Kramatwatu Blok D-14",
    submitterName: "Wisnu Pratama",
    submitterPhone: "085129279843",
    location: "Kramatwatu, Kab. Serang",
    priceOrDp: "DP Rp 38.5 Jt",
    status: "pending",
    skippedSections: ["Bagian C: Foto & Struk", "Bagian D: Notaris PPAT"],
    submittedAt: "22 Sep 2026 14:30"
  },
  {
    id: "LIST-1045",
    type: "takeover",
    title: "Takeover KPR Griya Kibin Asri Tipe 30/60",
    submitterName: "Hendro Wibowo",
    submitterPhone: "081234567890",
    location: "Kibin, Kab. Serang",
    priceOrDp: "DP Rp 32.0 Jt",
    status: "pending",
    skippedSections: ["Bagian D: Notaris PPAT"],
    submittedAt: "23 Sep 2026 09:15"
  },
  {
    id: "PROJ-201",
    type: "subsidi",
    title: "Cluster Baru Cilegon Hills Green Valley",
    submitterName: "PT Cilegon Properti Pratama",
    submitterPhone: "081987654321",
    location: "Cibeber, Kota Cilegon",
    priceOrDp: "Rp 166.000.000",
    status: "complete",
    skippedSections: [],
    submittedAt: "20 Sep 2026 11:00",
    adminNote: "Legalitas perizinan IMB dan kuota BTN FLPP telah lengkap diverifikasi."
  }
];

interface AuditLogItem {
  id: string;
  actor: string;
  action: string;
  targetId: string;
  note: string;
  timestamp: string;
}

const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: "LOG-901",
    actor: "Admin (admin@carirumah.id)",
    action: "STATUS_OVERRIDE_COMPLETE",
    targetId: "LIST-1029",
    note: "Menyetujui listing setelah verifikasi SP3K & Notaris PPAT Kramatwatu.",
    timestamp: "18 Sep 2026, 16:40"
  },
  {
    id: "LOG-902",
    actor: "Admin (admin@carirumah.id)",
    action: "UPDATE_AGENT_DATA",
    targetId: "AGENT-02",
    note: "Memperbarui nomor WhatsApp Agen Budi Santoso.",
    timestamp: "17 Sep 2026, 10:15"
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'queue' | 'agents' | 'audit'>('queue');
  const [queue, setQueue] = useState<VerificationItem[]>(INITIAL_QUEUE);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  
  // Modal Override Status State
  const [selectedForOverride, setSelectedForOverride] = useState<VerificationItem | null>(null);
  const [overrideStatus, setOverrideStatus] = useState<'complete' | 'rejected'>('complete');
  const [overrideNote, setOverrideNote] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleApplyOverride = () => {
    if (!selectedForOverride || !overrideNote.trim()) return;

    // Update item status in queue
    setQueue(prev => prev.map(item => {
      if (item.id === selectedForOverride.id) {
        return {
          ...item,
          status: overrideStatus,
          adminNote: overrideNote
        };
      }
      return item;
    }));

    // Append to audit log
    const newLog: AuditLogItem = {
      id: `LOG-${Date.now().toString().slice(-3)}`,
      actor: "Admin (Manual Override)",
      action: overrideStatus === 'complete' ? 'STATUS_OVERRIDE_COMPLETE' : 'STATUS_OVERRIDE_REJECTED',
      targetId: selectedForOverride.id,
      note: overrideNote,
      timestamp: new Date().toLocaleString('id-ID')
    };
    setAuditLogs(prev => [newLog, ...prev]);

    // Close modal
    setSelectedForOverride(null);
    setOverrideNote('');
  };

  const filteredQueue = queue.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.submitterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col selection:bg-cyan-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Admin Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-bold uppercase">Role: Admin Agensi</span>
                <span>/</span>
                <span className="text-slate-500">Panel Moderasi &amp; Verifikasi</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Dashboard Admin &amp; Developer CariRumah
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Pusat verifikasi dokumen takeover yang di-skip, override status, dan manajemen carousel agen Banten.
              </p>
            </div>

            {/* Quick Stats Pills */}
            <div className="flex items-center gap-3">
              <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs text-center">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Antrean Pending</span>
                <span className="text-base font-extrabold text-amber-600">
                  {queue.filter(q => q.status === 'pending').length} Unit
                </span>
              </div>
              <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs text-center">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Listing</span>
                <span className="text-base font-extrabold text-cyan-700">
                  {SUBSIDY_HOUSES.length + TAKEOVER_HOUSES.length} Properti
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-2 mt-6 border-b border-slate-200 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('queue')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'queue'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-cyan-400" />
              <span>Antrean Moderasi &amp; Verifikasi Dokumen ({queue.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('agents')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'agents'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Manajemen Carousel Agen ({AGENTS_DATA.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              <History className="w-4 h-4 text-cyan-400" />
              <span>Audit Log Aktivitas ({auditLogs.length})</span>
            </button>
          </div>

          {/* TAB 1: MODERASI & VERIFIKASI DOKUMEN */}
          {activeTab === 'queue' && (
            <div className="mt-6 space-y-4">
              
              {/* Search & Filter bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari ID, nama pemilik, atau judul..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 bg-slate-50"
                  />
                </div>
                <div className="text-xs text-slate-500 font-medium w-full sm:w-auto text-right">
                  Menampilkan {filteredQueue.length} entri pengajuan
                </div>
              </div>

              {/* Table of submissions */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold text-[10px] tracking-wider">
                      <tr>
                        <th className="p-4">Listing / ID</th>
                        <th className="p-4">Pemilik &amp; Kontak</th>
                        <th className="p-4">Wilayah / Nilai</th>
                        <th className="p-4">Section Di-Skip (Titik Follow-up)</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Aksi Admin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredQueue.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          
                          {/* Col 1 */}
                          <td className="p-4">
                            <span className="font-mono font-bold text-cyan-800 block text-[11px]">
                              {item.id}
                            </span>
                            <span className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 mt-0.5">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              {item.submittedAt}
                            </span>
                          </td>

                          {/* Col 2 */}
                          <td className="p-4">
                            <span className="font-semibold text-slate-900 block">
                              {item.submitterName}
                            </span>
                            <a
                              href={`${WA_GLOBAL_LINK}?text=Halo%20Bapak/Ibu%20${encodeURIComponent(item.submitterName)},%20saya%20Admin%20CariRumah%20mengenai%20listing%20${item.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold hover:underline mt-0.5"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>{item.submitterPhone}</span>
                            </a>
                          </td>

                          {/* Col 3 */}
                          <td className="p-4">
                            <span className="text-slate-700 block">{item.location}</span>
                            <strong className="text-teal-700 font-bold block mt-0.5">{item.priceOrDp}</strong>
                          </td>

                          {/* Col 4: Section Skipped (Crucial follow up indicator) */}
                          <td className="p-4">
                            {item.skippedSections.length > 0 ? (
                              <div className="space-y-1">
                                {item.skippedSections.map((s, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-block px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded text-[10px] font-bold mr-1 mb-1"
                                  >
                                    ⚠️ {s}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                                <CheckCircle2 className="w-3 h-3" />
                                Lengkap 100%
                              </span>
                            )}
                          </td>

                          {/* Col 5: Status */}
                          <td className="p-4">
                            {item.status === 'complete' && (
                              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                                Tayang (Complete)
                              </span>
                            )}
                            {item.status === 'pending' && (
                              <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-[10px]">
                                Pending Review
                              </span>
                            )}
                            {item.status === 'rejected' && (
                              <span className="px-2.5 py-1 bg-rose-100 text-rose-800 rounded-full font-bold text-[10px]">
                                Ditolak
                              </span>
                            )}
                          </td>

                          {/* Col 6: Admin Action (Override button) */}
                          <td className="p-4 text-right">
                            <button
                              onClick={() => {
                                setSelectedForOverride(item);
                                setOverrideStatus(item.status === 'pending' ? 'complete' : item.status);
                                setOverrideNote(item.adminNote || '');
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs shadow-xs transition-all cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Override Status</span>
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MANAJEMEN CAROUSEL AGEN */}
          {activeTab === 'agents' && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Daftar Agen Mitra Banten (Tampil di Carousel Beranda)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Agen merupakan profil statis yang kontak WhatsApp-nya dikelola langsung oleh admin agensi.
                  </p>
                </div>
                <button
                  onClick={() => alert('Fitur tambah agen baru: Hubungi admin database.')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Agen Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {AGENTS_DATA.map((ag) => (
                  <div key={ag.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={ag.photoUrl}
                        alt={ag.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-100"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{ag.name}</h4>
                        <span className="text-[11px] text-cyan-700 font-semibold block">{ag.role}</span>
                        <span className="text-[11px] text-slate-500 truncate block">{ag.coverage}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <a
                        href={ag.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-600 font-bold hover:underline"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Cek WA</span>
                      </a>

                      <button
                        onClick={() => alert(`Edit kontak WhatsApp agen ${ag.name}`)}
                        className="text-slate-600 hover:text-slate-900 font-semibold"
                      >
                        Ubah Kontak
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AUDIT LOG AKTIVITAS */}
          {activeTab === 'audit' && (
            <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Log Aktivitas &amp; Perubahan Sistem</h3>
                  <p className="text-xs text-slate-500">Mencatat setiap tindakan override status, perubahan agen, dan moderasi listing.</p>
                </div>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition-colors">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-slate-400">{log.id}</span>
                        <span className="font-bold text-slate-900">{log.actor}</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-mono font-bold">
                          {log.action}
                        </span>
                        <span className="font-mono text-cyan-700 font-bold">Target: {log.targetId}</span>
                      </div>
                      <p className="text-slate-600 pl-0 sm:pl-2">
                        "{log.note}"
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0 font-medium">
                      {log.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Modal Override Status Listing */}
      <AnimatePresence>
        {selectedForOverride && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-cyan-600" />
                  <h3 className="text-base font-bold text-slate-900">Override Status Listing</h3>
                </div>
                <span className="font-mono text-xs font-bold text-slate-400">{selectedForOverride.id}</span>
              </div>

              <div>
                <span className="text-xs text-slate-500 block">Judul Listing:</span>
                <p className="text-sm font-bold text-slate-900">{selectedForOverride.title}</p>
                <span className="text-xs text-slate-500 block mt-1">Pemilik: <strong>{selectedForOverride.submitterName} ({selectedForOverride.submitterPhone})</strong></span>
              </div>

              {/* Status Radio Choice */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Pilih Status Baru:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOverrideStatus('complete')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      overrideStatus === 'complete'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Setujui &amp; Tayangkan (Complete)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOverrideStatus('rejected')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      overrideStatus === 'rejected'
                        ? 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Tolak / Butuh Revisi (Rejected)</span>
                  </button>
                </div>
              </div>

              {/* Mandatory Override Note field */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Catatan Override Admin <span className="text-rose-500">* (Wajib diisi untuk audit &amp; member)</span>:
                </label>
                <textarea
                  rows={3}
                  value={overrideNote}
                  onChange={(e) => setOverrideNote(e.target.value)}
                  placeholder="Contoh: Telah dikonfirmasi via WhatsApp rekening koran lengkap dan akta notaris rekanan Kramatwatu siap..."
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 bg-slate-50"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedForOverride(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={!overrideNote.trim()}
                  onClick={handleApplyOverride}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white cursor-pointer shadow-sm transition-all"
                >
                  Simpan &amp; Terapkan
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
