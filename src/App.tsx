import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSolution } from './components/ProblemSolution';
import { TechnologyPorous } from './components/TechnologyPorous';
import { ProductsPricing } from './components/ProductsPricing';
import { CircularProcess } from './components/CircularProcess';
import { MarketStrategy } from './components/MarketStrategy';
import { LiveQnAHub } from './components/LiveQnAHub';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  // Sync lang with html attribute
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#222222] selection:bg-[#2D5A27]/20 selection:text-[#3D2314] flex flex-col">
      {/* Sticky Header with Navigation & [ VI | EN ] Switcher */}
      <Navbar
        lang={lang}
        onToggleLang={(newLang) => setLang(newLang)}
        onOpenQna={() => scrollTo('qa')}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          lang={lang}
          onExploreProducts={() => scrollTo('products')}
          onJoinQna={() => scrollTo('qa')}
        />

        {/* 2. Problem & Context: Vietnam Coffee Waste, Household Odor Pains & Direct Comparison */}
        <ProblemSolution lang={lang} />

        {/* 3. Deep Science & Technology: Micro-Porous Capillary Matrix & Cassava Binder */}
        <TechnologyPorous lang={lang} />

        {/* 4. Products & Pricing: 3 Product Cards & Exclusive Launch Promotions */}
        <ProductsPricing lang={lang} />

        {/* 5. 4-Step Circular Closed-Loop Production Process */}
        <CircularProcess lang={lang} />

        {/* 6. Target Market, 3 Customer Personas, 3 USPs & Go-To-Market Strategy */}
        <MarketStrategy lang={lang} />

        {/* 7. Live Anonymous Q&A Hub (Audience & Speaker Dashboard, Firebase Live Sync) */}
        <LiveQnAHub lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onScrollToTop={scrollToTop}
        onOpenQna={() => scrollTo('qa')}
      />
    </div>
  );
}
