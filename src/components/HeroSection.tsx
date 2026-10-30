import React from 'react';
import { TRANSLATIONS } from '../data/translations';
import { ArrowRight, QrCode, Leaf, ShieldCheck, Clock, Recycle } from 'lucide-react';

interface HeroSectionProps {
  lang: 'vi' | 'en';
  onExploreProducts: () => void;
  onJoinQna: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onExploreProducts,
  onJoinQna,
}) => {
  const t = TRANSLATIONS[lang].hero;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Subtle organic background mesh */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2D5A27]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#4A2E15]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Hero: Content & Product Asset */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Eco Innovation Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D5A27]/10 border border-[#2D5A27]/20 text-[#2D5A27] text-xs font-bold tracking-wide">
              <Leaf className="w-3.5 h-3.5 text-[#2D5A27]" />
              <span>{t.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#3D2314] leading-[1.15] tracking-tight font-serif-display text-balance">
              {t.headline}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-[#4A2E15]/80 leading-relaxed max-w-2xl">
              {t.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-[#3D2314] hover:bg-[#2A170C] rounded-xl shadow-md shadow-[#4A2E15]/20 hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              >
                <span>{t.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onJoinQna}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-[#2D5A27] bg-[#2D5A27]/10 hover:bg-[#2D5A27]/20 border border-[#2D5A27]/30 rounded-xl transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              >
                <QrCode className="w-4 h-4 text-[#2D5A27]" />
                <span>{t.ctaSecondary}</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 flex items-center gap-6 text-xs text-[#4A2E15]/70 border-t border-[#4A2E15]/10 w-full">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
                <span>{lang === 'vi' ? 'An toàn thực phẩm' : 'Food-grade safe'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Recycle className="w-4 h-4 text-[#2D5A27]" />
                <span>{lang === 'vi' ? 'Kinh tế tuần hoàn' : 'Circular economy'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#2D5A27]" />
                <span>{lang === 'vi' ? 'Tác dụng 60 ngày' : '60-day longevity'}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Marquee Hero Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#4A2E15]/15 border border-[#4A2E15]/15 bg-[#EFECE6] group">
              <img
                src="/src/assets/images/hero_coffblock_eco_1793366684023.jpg"
                alt="CoffBlock eco-friendly coffee ground odor deodorizer blocks and canvas hanging pouches"
                className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-700 ease-out"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium flex items-center justify-between">
                <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg">
                  100% Recycled Vietnam Coffee Grounds
                </span>
                <span className="bg-[#2D5A27]/80 backdrop-blur-md px-3 py-1 rounded-lg">
                  Cassava Starch Binder
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Stat Strip Below Hero Split */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/70 border border-[#4A2E15]/10 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col items-center text-center p-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#2D5A27] font-mono tabular-nums">
              {t.stat1}
            </span>
            <span className="text-xs text-[#4A2E15]/75 mt-1 font-medium">{t.stat1Desc}</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 border-l border-[#4A2E15]/10">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#3D2314] font-mono tabular-nums">
              {t.stat2}
            </span>
            <span className="text-xs text-[#4A2E15]/75 mt-1 font-medium">{t.stat2Desc}</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 border-l border-[#4A2E15]/10">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#2D5A27] font-mono tabular-nums">
              {t.stat3}
            </span>
            <span className="text-xs text-[#4A2E15]/75 mt-1 font-medium">{t.stat3Desc}</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 border-l border-[#4A2E15]/10">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#3D2314] font-mono tabular-nums">
              {t.stat4}
            </span>
            <span className="text-xs text-[#4A2E15]/75 mt-1 font-medium">{t.stat4Desc}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
