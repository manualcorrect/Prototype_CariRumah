'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  ShieldCheck, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight,
  Sofa,
  Car,
  Umbrella,
  ChefHat,
  Droplet
} from 'lucide-react';
import { RENOV_SERVICES, WA_GLOBAL_LINK } from '@/data/mockData';

const ICONS_MAP: Record<string, React.ReactNode> = {
  Sofa: <Sofa className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
  Umbrella: <Umbrella className="w-5 h-5" />,
  ChefHat: <ChefHat className="w-5 h-5" />,
  Droplet: <Droplet className="w-5 h-5" />
};

export default function RenovSection() {
  return (
    <section id="renov" className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/80 border border-cyan-200 text-cyan-800 text-xs font-bold mb-2">
              <Wrench className="w-3.5 h-3.5 text-cyan-600" />
              <span>Spesialis Bangun &amp; Renovasi Rumah Subsidi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Layanan RenovRumah Banten
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Tingkatkan kenyamanan rumah subsidi baru Anda dengan material standar SNI, biaya transparan tanpa biaya tersembunyi, dan garansi konstruksi 1 tahun.
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={`${WA_GLOBAL_LINK}?text=Halo%20CariRumah,%20saya%20ingin%20konsultasi%20estimasi%20RAB%20Renovasi%20Rumah%20Subsidi`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs hover:shadow transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Konsultasi RAB Gratis (WA)</span>
          </motion.a>
        </div>

        {/* Renov Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RENOV_SERVICES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-cyan-300 transition-all flex flex-col group"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-200">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Price tag badge */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl shadow-md border border-slate-100">
                  <span className="text-xs font-extrabold text-cyan-700">{item.startPrice}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center">
                      {ICONS_MAP[item.iconName] || <Wrench className="w-4 h-4" />}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-200/60">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                    Garansi 1 Thn
                  </span>

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`${WA_GLOBAL_LINK}?text=Halo%20CariRumah,%20saya%20tertarik%20konsultasi%20layanan%20${encodeURIComponent(item.title)}%20(${encodeURIComponent(item.startPrice)})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:text-cyan-900"
                  >
                    <span>Estimasi Biaya</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
