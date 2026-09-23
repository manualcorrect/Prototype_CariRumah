'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  ShieldCheck, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Calculator,
  Plus,
  Trash2,
  PhoneCall,
  Sofa,
  Car,
  Umbrella,
  ChefHat,
  Droplet
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RENOV_SERVICES, WA_GLOBAL_LINK } from '@/data/mockData';

interface CustomItem {
  id: string;
  name: string;
  price: number;
}

const DEFAULT_PRESET_ITEMS = [
  { id: 'item-1', name: 'Partisi Ruangan Minimalis Modern (Multiplek HPL)', price: 3500000, checked: true },
  { id: 'item-2', name: 'Plafon Drop Ceiling + Lampu LED Warm White', price: 2800000, checked: true },
  { id: 'item-3', name: 'Backdrop TV Minimalis Estetik 160cm', price: 2200000, checked: false },
  { id: 'item-4', name: 'Pintu Geser Kamar Mandi Alumunium', price: 1400000, checked: false },
  { id: 'item-5', name: 'Finishing Cat Dinding Dulux Anti-Jamur (1 Rumah)', price: 1800000, checked: false }
];

export default function RenovRumahCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [items, setItems] = useState(DEFAULT_PRESET_ITEMS);
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const toggleItem = (id: string) => {
    setItems(items.map(it => it.id === id ? { ...it, checked: !it.checked } : it));
  };

  const addCustomItem = () => {
    if (!newItemName.trim() || !newItemPrice.trim()) return;
    const priceNum = parseInt(newItemPrice.replace(/[^0-9]/g, ''), 10) || 0;
    if (priceNum <= 0) return;

    setCustomItems([...customItems, {
      id: `custom-${Date.now()}`,
      name: newItemName.trim(),
      price: priceNum
    }]);

    setNewItemName('');
    setNewItemPrice('');
  };

  const removeCustomItem = (id: string) => {
    setCustomItems(customItems.filter(c => c.id !== id));
  };

  // Calculate total estimation
  const presetTotal = items.filter(i => i.checked).reduce((acc, curr) => acc + curr.price, 0);
  const customTotal = customItems.reduce((acc, curr) => acc + curr.price, 0);
  const grandTotal = presetTotal + customTotal;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-cyan-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden mb-10">
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                <Wrench className="w-3.5 h-3.5" />
                <span>Spesialis Bangun &amp; Renovasi Rumah Subsidi Banten</span>
              </div>
              
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Layanan &amp; Simulasi Estimasi Biaya RenovRumah
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tingkatkan kenyamanan rumah subsidi Anda dengan material SNI teruji, pengerjaan rapi bergaransi 1 tahun, serta transparansi biaya tanpa biaya tersembunyi.
              </p>
            </div>
          </div>

          {/* Grid Layanan Paket Utama */}
          <div className="space-y-4 mb-14">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Paket Pilihan Spesialis Rumah Subsidi
                </h2>
                <p className="text-xs text-slate-500">Pilih kategori layanan renovasi sesuai kebutuhan rumah Anda</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RENOV_SERVICES.map((s, idx) => (
                <motion.div
                  key={s.id}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-cyan-300 transition-all flex flex-col justify-between"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={s.imageUrl}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-100">
                      <span className="text-xs font-extrabold text-cyan-700">{s.startPrice}</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-1.5">{s.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">{s.description}</p>
                      
                      <div className="space-y-1.5 pb-4 border-b border-slate-100">
                        {s.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                        Garansi SNI
                      </span>

                      <a
                        href={`${WA_GLOBAL_LINK}?text=Halo%20Tim%20RenovRumah,%20saya%20tertarik%20konsultasi%20layanan%20${encodeURIComponent(s.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Tanya Paket</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SIMULASI KALKULASI RAB & CUSTOM PACKAGE (PRD 8.3 Requirement) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Kalkulator Estimasi Biaya &amp; Custom Package
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pilih item renovasi atau tambahkan pekerjaan kustom Anda sendiri untuk melihat perkiraan biaya.
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right bg-cyan-50 p-3 rounded-2xl border border-cyan-100">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Estimasi Berjalan</span>
                <span className="text-lg sm:text-xl font-extrabold text-cyan-800">{formatRupiah(grandTotal)}</span>
              </div>
            </div>

            {/* Checklist preset items */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">1. Pilih Item Renovasi Standard:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                      item.checked 
                        ? 'bg-cyan-50/70 border-cyan-500 text-cyan-950 shadow-xs' 
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}}
                        className="w-4 h-4 rounded text-cyan-600 pointer-events-none"
                      />
                      <span className="text-xs font-semibold">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold shrink-0">{formatRupiah(item.price)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Item addition (Dynamic row requirement from PRD 8.3) */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <span className="text-xs font-bold text-slate-700 block">2. Tambah Item Pekerjaan Kustom Lainnya:</span>
              
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  placeholder="Nama pekerjaan (contoh: Kanopi Carport 4x3m)"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full sm:flex-1 p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  placeholder="Nominal (contoh: 2500000)"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                  className="w-full sm:w-48 p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={addCustomItem}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Item</span>
                </button>
              </div>

              {/* List of custom items */}
              {customItems.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  {customItems.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-2.5 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-950">
                      <span className="font-semibold">{c.name}</span>
                      <div className="flex items-center gap-3">
                        <strong className="font-bold">{formatRupiah(c.price)}</strong>
                        <button
                          onClick={() => removeCustomItem(c.id)}
                          className="text-rose-600 hover:text-rose-800 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Final CTA WhatsApp with calculated RAB summary */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Total Perkiraan Biaya Renovasi:</span>
                <span className="text-xl sm:text-2xl font-extrabold text-cyan-700">{formatRupiah(grandTotal)}</span>
              </div>

              <a
                href={`${WA_GLOBAL_LINK}?text=Halo%20Tim%20RenovRumah,%20saya%20telah%20menghitung%20simulasi%20estimasi%20renovasi%20total%20${encodeURIComponent(formatRupiah(grandTotal))}.%20Mohon%20bantuan%20survei%20dan%20konsultasi%20jadwal.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kirim Rincian Estimasi ke WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
