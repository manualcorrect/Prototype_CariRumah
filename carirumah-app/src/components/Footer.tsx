'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MessageCircle, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Heart,
  ExternalLink
} from 'lucide-react';
import { WA_GLOBAL_LINK, DISTRICTS_BANTEN } from '@/data/mockData';

export default function Footer() {
  return (
    <footer id="tentang" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  CariRumah <span className="text-cyan-400 text-sm font-semibold">Banten</span>
                </span>
                <span className="block text-xs text-slate-400 -mt-1">
                  Pusat Rumah Subsidi &amp; Takeover KPR
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Platform perantara dan konsultasi properti terpercaya di Banten. Kami menghubungkan Anda langsung dengan pengembang rumah subsidi resmi, pemilik takeover, serta pendampingan Notaris PPAT legal.
            </p>

            <div className="pt-2">
              <a
                href={WA_GLOBAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Hotline: +62 851-2927-9843</span>
              </a>
            </div>
          </div>

          {/* Col 3: Modul Utama */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Layanan &amp; Modul
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#subsidi" className="hover:text-cyan-400 transition-colors">
                  Rumah Subsidi FLPP Banten
                </a>
              </li>
              <li>
                <a href="#takeover" className="hover:text-cyan-400 transition-colors">
                  Takeover KPR (Oper Kredit)
                </a>
              </li>
              <li>
                <a href="#renov" className="hover:text-cyan-400 transition-colors">
                  RenovRumah Interior &amp; Carport
                </a>
              </li>
              <li>
                <Link href="/login" className="hover:text-cyan-400 transition-colors">
                  Pasang Listing Takeover
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Cakupan Wilayah */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Wilayah Banten
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-400">
              {DISTRICTS_BANTEN.slice(0, 5).map((d) => (
                <li key={d.name} className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-cyan-500 shrink-0" />
                  <span>{d.name} ({d.kab})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Jaminan Layanan */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Jaminan &amp; Keamanan
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Legalitas Akta Notaris PPAT Resmi &amp; Terverifikasi</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Konsultasi Transparan Tanpa Biaya Tersembunyi</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CariRumah Banten. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Dirancang dengan Human-Touch untuk Banten</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
