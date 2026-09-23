'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, ShieldCheck } from 'lucide-react';
import { AGENTS_DATA, WA_GLOBAL_LINK } from '@/data/mockData';

export default function AgentCarousel() {
  return (
    <section className="w-full bg-slate-100/80 border-b border-slate-200/80 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-200 text-cyan-900 w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-bold">
              Agen Properti Terverifikasi Siap Membantu 24/7
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500 hidden sm:inline-block">
            Geser horizontal untuk memilih konsultan &amp; spesialis area Anda →
          </span>
        </div>

        {/* Scrollable Agent Cards Row */}
        <div className="flex items-center gap-3.5 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth" style={{ scrollbarWidth: 'none' }}>
          {AGENTS_DATA.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="min-w-[290px] max-w-[320px] bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-cyan-300 transition-all flex items-center justify-between gap-3 shrink-0"
            >
              {/* Avatar + Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={agent.photoUrl}
                    alt={agent.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-100"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-slate-900 truncate">
                    {agent.name}
                  </span>
                  
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{agent.rating} ({agent.dealsCount}+ deal)</span>
                  </div>

                  <span className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                    {agent.coverage}
                  </span>
                </div>
              </div>

              {/* Chat WhatsApp Button */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`${WA_GLOBAL_LINK}?text=Halo%20${encodeURIComponent(agent.name)},%20saya%20ingin%20konsultasi%20properti%20di%20wilayah%20${encodeURIComponent(agent.coverage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-sm transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat</span>
              </motion.a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
