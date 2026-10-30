import React from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Users, Target, Video, Store, HeartHandshake, ShieldCheck, Recycle, Wind, CheckCircle2 } from 'lucide-react';

interface MarketStrategyProps {
  lang: 'vi' | 'en';
}

export const MarketStrategy: React.FC<MarketStrategyProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].marketStrategy;

  return (
    <section id="market" className="py-20 bg-[#F5F2EA] border-t border-[#4A2E15]/10">
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

        {/* 3 Core USPs (Lợi thế cạnh tranh vượt trội) */}
        <div className="mt-14">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2D5A27]" />
            <h3 className="text-xl font-bold text-[#3D2314]">
              {t.uspTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#4A2E15]/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#2D5A27]/10 flex items-center justify-center text-[#2D5A27] mb-4">
                  <Wind className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#3D2314] mb-2">
                  {t.usp1Title}
                </h4>
                <p className="text-xs text-[#4A2E15]/80 leading-relaxed">
                  {t.usp1Desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#4A2E15]/10 text-[11px] font-semibold text-[#2D5A27]">
                ✓ 0% Hương nhân tạo gây kích ứng
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#4A2E15]/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#4A2E15]/10 flex items-center justify-center text-[#3D2314] mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#3D2314] mb-2">
                  {t.usp2Title}
                </h4>
                <p className="text-xs text-[#4A2E15]/80 leading-relaxed">
                  {t.usp2Desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#4A2E15]/10 text-[11px] font-semibold text-[#2D5A27]">
                ✓ Chuẩn an toàn cạnh thực phẩm tươi sống
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#4A2E15]/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#2D5A27]/10 flex items-center justify-center text-[#2D5A27] mb-4">
                  <Recycle className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#3D2314] mb-2">
                  {t.usp3Title}
                </h4>
                <p className="text-xs text-[#4A2E15]/80 leading-relaxed">
                  {t.usp3Desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#4A2E15]/10 text-[11px] font-semibold text-[#2D5A27]">
                ✓ 100% Khép kín tuần hoàn làm phân compost
              </div>
            </div>
          </div>
        </div>

        {/* 3 Target Personas (3 Nhóm Khách Hàng Mục Tiêu) */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3D2314]" />
            <h3 className="text-xl font-bold text-[#3D2314]">
              {t.personaTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#4A2E15]/10 shadow-sm">
              <span className="text-[11px] font-mono font-bold text-[#2D5A27] uppercase">Persona 01</span>
              <h4 className="text-base font-bold text-[#3D2314] mt-1 mb-2">
                {t.persona1Title}
              </h4>
              <p className="text-xs text-[#4A2E15]/80 leading-relaxed mb-4">
                {t.persona1Desc}
              </p>
              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#4A2E15]/10 text-[11px] text-[#4A2E15]/90">
                <span className="font-bold text-[#3D2314] block">Sản phẩm phù hợp:</span>
                Set Tủ Lạnh 79.000 VNĐ & Family Combo 159.000 VNĐ
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#4A2E15]/10 shadow-sm">
              <span className="text-[11px] font-mono font-bold text-[#2D5A27] uppercase">Persona 02</span>
              <h4 className="text-base font-bold text-[#3D2314] mt-1 mb-2">
                {t.persona2Title}
              </h4>
              <p className="text-xs text-[#4A2E15]/80 leading-relaxed mb-4">
                {t.persona2Desc}
              </p>
              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#4A2E15]/10 text-[11px] text-[#4A2E15]/90">
                <span className="font-bold text-[#3D2314] block">Sản phẩm phù hợp:</span>
                Túi Vải Canvas Treo Tủ Áo 99.000 VNĐ (Set 3 túi)
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#4A2E15]/10 shadow-sm">
              <span className="text-[11px] font-mono font-bold text-[#2D5A27] uppercase">Persona 03</span>
              <h4 className="text-base font-bold text-[#3D2314] mt-1 mb-2">
                {t.persona3Title}
              </h4>
              <p className="text-xs text-[#4A2E15]/80 leading-relaxed mb-4">
                {t.persona3Desc}
              </p>
              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#4A2E15]/10 text-[11px] text-[#4A2E15]/90">
                <span className="font-bold text-[#3D2314] block">Sản phẩm phù hợp:</span>
                Family Combo & Tham gia chương trình "Đổi bã lấy quà"
              </div>
            </div>
          </div>
        </div>

        {/* Go-To-Market & Marketing Strategy (Chiến lược tiếp thị) */}
        <div className="mt-16 p-8 rounded-2xl bg-white border border-[#4A2E15]/15 shadow-sm">
          <div className="mb-6">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#2D5A27]">
              {lang === 'vi' ? 'Chiến lược tăng trưởng' : 'Go-to-market'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#3D2314]">
              {t.marketingTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#FDFBF7] border border-[#4A2E15]/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#2D5A27]/10 flex items-center justify-center text-[#2D5A27]">
                <Video className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#3D2314]">
                {t.mkt1Title}
              </h4>
              <p className="text-xs text-[#4A2E15]/80 leading-relaxed">
                {t.mkt1Desc}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FDFBF7] border border-[#4A2E15]/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#3D2314]/10 flex items-center justify-center text-[#3D2314]">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#3D2314]">
                {t.mkt2Title}
              </h4>
              <p className="text-xs text-[#4A2E15]/80 leading-relaxed">
                {t.mkt2Desc}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FDFBF7] border border-[#4A2E15]/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#2D5A27]/10 flex items-center justify-center text-[#2D5A27]">
                <Store className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#3D2314]">
                {t.mkt3Title}
              </h4>
              <p className="text-xs text-[#4A2E15]/80 leading-relaxed">
                {t.mkt3Desc}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
