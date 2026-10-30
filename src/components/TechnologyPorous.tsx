import React from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Microscope, ShieldCheck, Sparkles, Droplets, CheckCircle2 } from 'lucide-react';

interface TechnologyPorousProps {
  lang: 'vi' | 'en';
}

export const TechnologyPorous: React.FC<TechnologyPorousProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].tech;

  return (
    <section id="tech" className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#2D5A27]">
            {t.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2314] font-serif-display tracking-tight text-balance">
            {t.title}
          </h2>
          <p className="text-base text-[#4A2E15]/80">
            {t.subtitle}
          </p>
        </div>

        {/* 2-Column Scientific & Engineering Deep Dive */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Porous Capillary Microstructure */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-gradient-to-br from-[#3D2314] to-[#2D5A27] text-white shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#86efac] text-xs font-bold">
                <Microscope className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'Vật lý Mao dẫn Vi mô' : 'Physical Capillary Adsorption'}</span>
              </div>
              <h3 className="text-2xl font-bold font-serif-display text-[#FDFBF7]">
                {t.matrixTitle}
              </h3>
              <p className="text-sm text-white/85 leading-relaxed">
                {t.matrixDesc}
              </p>

              {/* Porous Visual Simulation */}
              <div className="pt-4 p-5 rounded-xl bg-black/25 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs text-white/80 pb-2 border-b border-white/10">
                  <span className="font-bold">{lang === 'vi' ? 'Cơ chế bẫy phân tử mùi:' : 'Odor Adsorption Trapping:'}</span>
                  <span className="text-[#86efac] text-[11px] font-mono">15 - 20 m²/g Surface</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-[#86efac] font-bold block mb-1">🐟 Trimethylamine (TMA)</span>
                    <p className="text-[11px] text-white/70">
                      {lang === 'vi' ? 'Phân tử mùi tanh cá & hải sản bị giữ chặt trong lỗ rỗng trung bình (mesopores).' : 'Fish & seafood amines trapped in internal mesopores.'}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-[#fde047] font-bold block mb-1">🧄 Dimethyl Disulfide (DMDS)</span>
                    <p className="text-[11px] text-white/70">
                      {lang === 'vi' ? 'Hợp chất sulfur từ hành tỏi nồng bị trung hòa bề mặt mao dẫn.' : 'Pungent sulfur compounds from garlic & onions adsorbed.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Metrics Strip */}
            <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-xl sm:text-2xl font-black font-mono text-[#86efac]">{t.spec1Val}</span>
                <span className="block text-[10px] text-white/70 uppercase mt-0.5">{t.spec1Title}</span>
              </div>
              <div className="border-l border-white/15">
                <span className="text-xl sm:text-2xl font-black font-mono text-white">{t.spec2Val}</span>
                <span className="block text-[10px] text-white/70 uppercase mt-0.5">{t.spec2Title}</span>
              </div>
              <div className="border-l border-white/15">
                <span className="text-xl sm:text-2xl font-black font-mono text-[#86efac]">{t.spec3Val}</span>
                <span className="block text-[10px] text-white/70 uppercase mt-0.5">{t.spec3Title}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Natural Cassava Starch Binder */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-white border border-[#4A2E15]/15 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'Chất kết dính sinh học 100%' : '100% Bio-Binder'}</span>
              </div>
              <h3 className="text-2xl font-bold text-[#3D2314]">
                {t.binderTitle}
              </h3>
              <p className="text-sm text-[#4A2E15]/80 leading-relaxed">
                {t.binderDesc}
              </p>

              <div className="space-y-3 pt-2 text-xs text-[#3D2314]">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F5F2EA]">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#2D5A27]">{lang === 'vi' ? 'Chịu ẩm vượt trội 85%' : 'High Humidity Resistance'}</span>
                    <span className="text-[#4A2E15]/75">
                      {lang === 'vi' ? 'Không nhão, không bở rã khi đặt trực tiếp cạnh đá lạnh hay ngăn đông.' : 'Maintains structural integrity in high-moisture refrigerator environments.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F5F2EA]">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#2D5A27]">{lang === 'vi' ? 'An toàn cạnh thực phẩm tươi' : 'Food-Safe Standard'}</span>
                    <span className="text-[#4A2E15]/75">
                      {lang === 'vi' ? '100% tinh bột củ sắn nông nghiệp Việt Nam, không chứa formaldehyd hay keo công nghiệp.' : 'Native Vietnamese cassava starch with zero industrial glues or chemical plasticizers.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#4A2E15]/10 flex items-center justify-between text-xs text-[#4A2E15]/70">
              <span className="font-medium">{lang === 'vi' ? 'Công thức phát triển bởi R&D Team' : 'Developed by CoffBlock R&D'}</span>
              <span className="font-mono font-bold text-[#2D5A27]">VN Patent Pending</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
