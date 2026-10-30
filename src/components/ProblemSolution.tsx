import React from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Coffee, Home, AlertTriangle, Check, X, ShieldAlert, Sparkles, Wind } from 'lucide-react';

interface ProblemSolutionProps {
  lang: 'vi' | 'en';
}

export const ProblemSolution: React.FC<ProblemSolutionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].problemSolution;

  return (
    <section id="story" className="py-20 bg-[#F5F2EA] border-y border-[#4A2E15]/10">
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

        {/* 2 Problem Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Problem 1: Vietnam Coffee Waste (from Lương Hạo) */}
          <div className="p-8 rounded-2xl bg-white border border-[#4A2E15]/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#4A2E15]/10 flex items-center justify-center text-[#3D2314] mb-6">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#3D2314] mb-3">
                {t.coffeeCultureTitle}
              </h3>
              <p className="text-sm text-[#4A2E15]/80 leading-relaxed">
                {t.coffeeCultureDesc}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#4A2E15]/10 grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#4A2E15]/10">
                <span className="text-[#3D2314] font-bold block text-sm font-mono">1.000.000+ Tấn</span>
                <span className="text-[#4A2E15]/70 text-[11px]">
                  {lang === 'vi' ? 'Bã cà phê xả ra bãi rác mỗi năm' : 'Coffee grounds dumped yearly'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#4A2E15]/10">
                <span className="text-rose-600 font-bold block text-sm font-mono">CH₄ (Methane)</span>
                <span className="text-[#4A2E15]/70 text-[11px]">
                  {lang === 'vi' ? 'Khí thải nhà kính độc hại gấp 28x CO₂' : 'Potent greenhouse gas 28x vs CO₂'}
                </span>
              </div>
            </div>
          </div>

          {/* Problem 2: Household Indoor Odors & Mold (from Phan Vũ Duy) */}
          <div className="p-8 rounded-2xl bg-white border border-[#4A2E15]/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#2D5A27]/10 flex items-center justify-center text-[#2D5A27] mb-6">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#3D2314] mb-3">
                {t.householdPainTitle}
              </h3>
              <p className="text-sm text-[#4A2E15]/80 leading-relaxed">
                {t.householdPainDesc}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#4A2E15]/10 grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#4A2E15]/10">
                <span className="text-[#2D5A27] font-bold block text-sm font-mono">Tủ lạnh & Tủ áo</span>
                <span className="text-[#4A2E15]/70 text-[11px]">
                  {lang === 'vi' ? 'Ám mùi hải sản tanh & nấm mốc nồm' : 'Seafood odors & rainy mildew'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#4A2E15]/10">
                <span className="text-amber-700 font-bold block text-sm font-mono">Phòng trọ hẹp</span>
                <span className="text-[#4A2E15]/70 text-[11px]">
                  {lang === 'vi' ? 'Không gian kín thiếu thông gió tự nhiên' : 'Poor airflow in student rentals'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Head-to-Head Comparison Table: CoffBlock vs Chemical Fresheners */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-[#4A2E15]/15 shadow-sm">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#2D5A27]">
                {lang === 'vi' ? 'Phân tích đối sánh' : 'Comparative Analysis'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#3D2314]">
                {t.comparisonTitle}
              </h3>
            </div>
            <span className="text-xs text-[#4A2E15]/60">
              {lang === 'vi' ? 'Giải quyết tận gốc rễ vấn đề' : 'Eliminating odor at the source'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#4A2E15]/15 text-xs text-[#4A2E15]/70">
                  <th className="py-3 px-4 font-bold w-1/4">
                    {lang === 'vi' ? 'Tiêu chí' : 'Criteria'}
                  </th>
                  <th className="py-3 px-4 font-bold w-3/8 text-[#2D5A27] bg-[#2D5A27]/5 rounded-t-xl">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#2D5A27]" />
                      <span>CoffBlock (Sinh thái)</span>
                    </span>
                  </th>
                  <th className="py-3 px-4 font-bold w-3/8 text-rose-700">
                    <span className="flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      <span>{lang === 'vi' ? 'Sáp thơm / Xịt phòng hoá học' : 'Synthetic Air Fresheners'}</span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4A2E15]/10 text-xs">
                {/* Row 1: Mechanism */}
                <tr>
                  <td className="py-4 px-4 font-bold text-[#3D2314]">
                    {t.compCriteria1}
                  </td>
                  <td className="py-4 px-4 bg-[#2D5A27]/5 text-[#2D5A27] font-medium">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                      <span>{t.compCoffBlock1}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#4A2E15]/75">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{t.compChemical1}</span>
                    </div>
                  </td>
                </tr>

                {/* Row 2: Safety & Ingredients */}
                <tr>
                  <td className="py-4 px-4 font-bold text-[#3D2314]">
                    {t.compCriteria2}
                  </td>
                  <td className="py-4 px-4 bg-[#2D5A27]/5 text-[#2D5A27] font-medium">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                      <span>{t.compCoffBlock2}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#4A2E15]/75">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{t.compChemical2}</span>
                    </div>
                  </td>
                </tr>

                {/* Row 3: End of Life */}
                <tr>
                  <td className="py-4 px-4 font-bold text-[#3D2314]">
                    {t.compCriteria3}
                  </td>
                  <td className="py-4 px-4 bg-[#2D5A27]/5 text-[#2D5A27] font-medium rounded-b-xl">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                      <span>{t.compCoffBlock3}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#4A2E15]/75">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{t.compChemical3}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
