import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Check, ShoppingBag, Sparkles, Tag, Gift, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProductsPricingProps {
  lang: 'vi' | 'en';
}

export const ProductsPricing: React.FC<ProductsPricingProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].products;
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const handlePreorder = (productName: string) => {
    setSelectedProduct(productName);
    setOrderSuccess(productName);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}
    setTimeout(() => {
      setOrderSuccess(null);
    }, 4000);
  };

  return (
    <section id="products" className="py-20 bg-[#FDFBF7]">
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

        {/* Order Success Toast Notification */}
        {orderSuccess && (
          <div className="mt-6 max-w-md mx-auto p-4 rounded-xl bg-[#2D5A27] text-white flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#86efac]" />
              <div className="text-xs">
                <span className="font-bold">{orderSuccess}</span>
                <p className="text-white/80">
                  {lang === 'vi' ? 'Đã ghi nhận yêu cầu mẫu thử Pitch Deck!' : 'Recorded demo request for Pitch Deck!'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setOrderSuccess(null)}
              className="text-white/80 hover:text-white text-xs underline cursor-pointer"
            >
              {lang === 'vi' ? 'Đóng' : 'Close'}
            </button>
          </div>
        )}

        {/* 3 Product Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Refrigerator Set */}
          <div className="rounded-2xl bg-white border border-[#4A2E15]/15 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div className="relative h-56 bg-[#F5F2EA] overflow-hidden">
              <img
                src="/src/assets/images/product_refrigerator_set_1793366684956.jpg"
                alt={t.set1.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#3D2314] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                {t.set1.badge}
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[#3D2314] text-xs font-semibold px-2.5 py-1 rounded-lg">
                {t.set1.spec}
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#3D2314]">
                  {t.set1.name}
                </h3>
                <p className="text-xs text-[#4A2E15]/75 mt-2 line-clamp-3 leading-relaxed">
                  {t.set1.desc}
                </p>

                {/* Price Display */}
                <div className="mt-5 pb-5 border-b border-[#4A2E15]/10 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#3D2314] font-mono tabular-nums">
                    {t.set1.price}
                  </span>
                  <span className="text-xs font-bold text-[#4A2E15]/70">{t.currency}</span>
                  <span className="text-xs text-[#2D5A27] font-semibold ml-auto">
                    (~${t.set1.usdPrice} {t.approxUsd})
                  </span>
                </div>

                {/* Features List */}
                <ul className="mt-5 space-y-2.5 text-xs text-[#4A2E15]/85">
                  {t.set1.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order / Pre-order Button */}
              <div className="pt-6 mt-6 border-t border-[#4A2E15]/10">
                <button
                  onClick={() => handlePreorder(t.set1.name)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#3D2314] bg-[#F5F2EA] hover:bg-[#3D2314] hover:text-white transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'Đặt trải nghiệm thử' : 'Request Trial Set'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Wardrobe & Bathroom Set */}
          <div className="rounded-2xl bg-white border border-[#4A2E15]/15 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div className="relative h-56 bg-[#F5F2EA] overflow-hidden">
              <img
                src="/src/assets/images/product_wardrobe_pouch_1793366685163.jpg"
                alt={t.set2.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#4E7C59] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                {t.set2.badge}
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[#3D2314] text-xs font-semibold px-2.5 py-1 rounded-lg">
                {t.set2.spec}
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#3D2314]">
                  {t.set2.name}
                </h3>
                <p className="text-xs text-[#4A2E15]/75 mt-2 line-clamp-3 leading-relaxed">
                  {t.set2.desc}
                </p>

                {/* Price Display */}
                <div className="mt-5 pb-5 border-b border-[#4A2E15]/10 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#3D2314] font-mono tabular-nums">
                    {t.set2.price}
                  </span>
                  <span className="text-xs font-bold text-[#4A2E15]/70">{t.currency}</span>
                  <span className="text-xs text-[#2D5A27] font-semibold ml-auto">
                    (~${t.set2.usdPrice} {t.approxUsd})
                  </span>
                </div>

                {/* Features List */}
                <ul className="mt-5 space-y-2.5 text-xs text-[#4A2E15]/85">
                  {t.set2.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Button */}
              <div className="pt-6 mt-6 border-t border-[#4A2E15]/10">
                <button
                  onClick={() => handlePreorder(t.set2.name)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#3D2314] bg-[#F5F2EA] hover:bg-[#3D2314] hover:text-white transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'Đặt trải nghiệm thử' : 'Request Trial Set'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Family Combo (Featured) */}
          <div className="rounded-2xl bg-white border-2 border-[#2D5A27] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col relative group">
            <div className="absolute top-0 right-0 left-0 bg-[#2D5A27] text-white text-[11px] font-bold py-1 text-center tracking-wide uppercase">
              {t.set3.badge}
            </div>

            <div className="relative h-56 bg-[#F5F2EA] overflow-hidden mt-6">
              <img
                src="/src/assets/images/product_family_combo_1793366685174.jpg"
                alt={t.set3.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#2D5A27] text-xs font-bold px-2.5 py-1 rounded-lg">
                {t.set3.spec}
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#3D2314]">
                  {t.set3.name}
                </h3>
                <p className="text-xs text-[#4A2E15]/75 mt-2 line-clamp-3 leading-relaxed">
                  {t.set3.desc}
                </p>

                {/* Price Display */}
                <div className="mt-5 pb-5 border-b border-[#4A2E15]/10 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#2D5A27] font-mono tabular-nums">
                    {t.set3.price}
                  </span>
                  <span className="text-xs font-bold text-[#4A2E15]/70">{t.currency}</span>
                  <span className="text-xs text-[#2D5A27] font-semibold ml-auto">
                    (~${t.set3.usdPrice} {t.approxUsd})
                  </span>
                </div>

                {/* Features List */}
                <ul className="mt-5 space-y-2.5 text-xs text-[#4A2E15]/85">
                  {t.set3.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                      <span className="font-medium text-[#3D2314]">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Button Primary */}
              <div className="pt-6 mt-6 border-t border-[#4A2E15]/10">
                <button
                  onClick={() => handlePreorder(t.set3.name)}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#2D5A27] hover:bg-[#23471f] shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'Đặt Combo Toàn Diện' : 'Order Family Combo'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Launch Promotions Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#F5F2EA] border border-[#4A2E15]/15">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#2D5A27] uppercase tracking-wider">
                <Gift className="w-4 h-4" />
                <span>{t.promoTitle}</span>
              </div>
              <h4 className="text-lg font-bold text-[#3D2314]">
                {lang === 'vi' ? 'Chương trình trợ giá kích cầu xanh' : 'Eco Incentive Launch Programs'}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 max-w-2xl">
              <div className="p-4 rounded-xl bg-white border border-[#4A2E15]/10 text-xs">
                <span className="font-bold text-[#2D5A27] block mb-1">🎁 Buy 2 Get 1</span>
                <p className="text-[#4A2E15]/80">{t.promo1}</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#4A2E15]/10 text-xs">
                <span className="font-bold text-[#3D2314] block mb-1">🌱 Bring Grounds, Get Gift</span>
                <p className="text-[#4A2E15]/80">{t.promo2}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
