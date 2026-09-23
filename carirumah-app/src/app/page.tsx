import React from 'react';
import Navbar from '@/components/Navbar';
import AgentCarousel from '@/components/AgentCarousel';
import HeroSection from '@/components/HeroSection';
import SubsidyRail from '@/components/SubsidyRail';
import TakeoverRail from '@/components/TakeoverRail';
import RenovSection from '@/components/RenovSection';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'CariRumah Banten — Rumah Subsidi & Takeover KPR Serang Cilegon',
  description: 'Pusat Rumah Subsidi FLPP Bunga Flat 5% dan Takeover KPR Oper Kredit Resmi di Serang, Cilegon, dan seluruh Banten.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* 1. Header Navigation Bar */}
      <Navbar />

      {/* Spacing for fixed navbar */}
      <div className="pt-20">
        {/* 2. Agent Carousel (Directly under navbar as per PRD) */}
        <AgentCarousel />

        {/* 3. Hero Section with dynamic elements */}
        <HeroSection />

        {/* 4. Rail 1: Rumah Baru Subsidi */}
        <SubsidyRail />

        {/* 5. Rail 2: Listing Takeover KPR (Oper Kredit) */}
        <TakeoverRail />

        {/* 6. Modul RenovRumah Spesialis Rumah Subsidi */}
        <RenovSection />
      </div>

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
