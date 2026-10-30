import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Coffee, Flame, Layers, Sprout, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CircularProcessProps {
  lang: 'vi' | 'en';
}

export const CircularProcess: React.FC<CircularProcessProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].process;
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      id: 1,
      title: t.step1Title,
      desc: t.step1Desc,
      icon: Coffee,
      stat: lang === 'vi' ? 'Giảm 100% rác chôn lấp' : 'Zero Landfill Diverted',
      detailsVi: 'Thu gom hàng ngày từ mạng lưới hơn 50+ quán cà phê đối tác tại TP.HCM và Hà Nội. Phân loại bã sạch, không lẫn tạp chất hay sữa.',
      detailsEn: 'Daily sorted collection from 50+ partner cafes. Pure coffee grounds segregated without dairy or contaminants.'
    },
    {
      id: 2,
      title: t.step2Title,
      desc: t.step2Desc,
      icon: Flame,
      stat: lang === 'vi' ? 'Độ ẩm < 8% chống mốc' : 'Moisture < 8% Anti-Mold',
      detailsVi: 'Sấy nhiệt đối lưu kiểm soát 65°C trong 4 giờ. Phối trộn tỷ lệ vàng 85% bã cà phê : 15% tinh bột sắn biến tính tự nhiên.',
      detailsEn: 'Controlled convective dehydration at 65°C for 4h. Precise golden ratio: 85% treated coffee grounds + 15% natural cassava starch.'
    },
    {
      id: 3,
      title: t.step3Title,
      desc: t.step3Desc,
      icon: Layers,
      stat: lang === 'vi' ? 'Chuẩn an toàn thực phẩm' : 'Food-Grade Certified',
      detailsVi: 'Máy ép khuôn thủy lực định hình khối nén hình trụ và đóng gói túi vải canvas dệt tự nhiên, bao bì giấy kraft 100% có thể tái chế.',
      detailsEn: 'Hydraulic precision compression into geometric blocks and natural woven canvas pouches, finished in recyclable kraft packaging.'
    },
    {
      id: 4,
      title: t.step4Title,
      desc: t.step4Desc,
      icon: Sprout,
      stat: lang === 'vi' ? '100% phân bón hữu cơ' : '100% Bio Organic Soil',
      detailsVi: 'Sau 60 ngày hút mùi, bẻ vụn khối nén trộn vào đất trồng rau hoặc hoa cây cảnh. Bã cà phê phân giải cung cấp nitơ và khoáng vi lượng.',
      detailsEn: 'After 60 days of active service, the block is crumbled into gardening soil as nitrogen-rich bio fertilizer, leaving zero waste.'
    }
  ];

  const current = steps[activeStep - 1];

  return (
    <section id="process" className="py-20 bg-[#F5F2EA] border-y border-[#4A2E15]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#2D5A27]">
            {t.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2314] font-serif-display tracking-tight">
            {t.title}
          </h2>
          <p className="text-base text-[#4A2E15]/80">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Steps Interactive Tabs */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-white border-[#2D5A27] shadow-md ring-2 ring-[#2D5A27]/20 -translate-y-1'
                    : 'bg-white/60 hover:bg-white border-[#4A2E15]/10'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isActive ? 'bg-[#2D5A27] text-white' : 'bg-[#4A2E15]/10 text-[#3D2314]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-mono font-bold ${
                    isActive ? 'text-[#2D5A27]' : 'text-[#4A2E15]/40'
                  }`}>
                    0{step.id}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#3D2314] line-clamp-1">
                  {step.title}
                </h4>
                <p className="text-[11px] text-[#4E7C59] font-medium mt-1">
                  {step.stat}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detailed Explainer Card */}
        <div className="mt-8 p-8 sm:p-10 rounded-2xl bg-white border border-[#4A2E15]/15 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] text-xs font-bold">
                <span>{lang === 'vi' ? `Chi tiết Giai đoạn 0${current.id}` : `Phase 0${current.id} Deep Dive`}</span>
              </div>
              <h3 className="text-2xl font-bold text-[#3D2314]">
                {current.title}
              </h3>
              <p className="text-sm text-[#4A2E15]/85 leading-relaxed">
                {current.desc}
              </p>
              <div className="p-4 rounded-xl bg-[#FDFBF7] border border-[#4A2E15]/10 text-xs text-[#3D2314] flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                <span>{lang === 'vi' ? current.detailsVi : current.detailsEn}</span>
              </div>
            </div>

            <div className="md:col-span-4 bg-[#F5F2EA] rounded-xl p-6 border border-[#4A2E15]/10 flex flex-col justify-between h-full space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#4A2E15]/60 block mb-1">
                  {lang === 'vi' ? 'Chỉ số đo lường sinh thái' : 'Eco Key Metric'}
                </span>
                <span className="text-xl font-bold text-[#2D5A27] font-mono">
                  {current.stat}
                </span>
              </div>

              <div className="pt-4 border-t border-[#4A2E15]/10 flex items-center justify-between text-xs text-[#4A2E15]/75">
                <span>{lang === 'vi' ? 'Bước tiếp theo:' : 'Next Phase:'}</span>
                <button
                  onClick={() => setActiveStep(activeStep === 4 ? 1 : activeStep + 1)}
                  className="font-bold text-[#2D5A27] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'vi' ? 'Tiếp tục' : 'Next'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
