import React from 'react';
import { TRANSLATIONS } from '../data/translations';
import { Leaf, Download, ArrowUp, MessageSquare } from 'lucide-react';

interface FooterProps {
  lang: 'vi' | 'en';
  onScrollToTop: () => void;
  onOpenQna: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onScrollToTop,
  onOpenQna,
}) => {
  const t = TRANSLATIONS[lang].footer;

  const handleDownloadSingleHtml = () => {
    // Generate standalone HTML representation
    const fullHtml = document.documentElement.outerHTML;
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CoffBlock_PitchDeck_LandingPage.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <footer className="bg-[#3D2314] text-[#FDFBF7] pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2D5A27] flex items-center justify-center text-white">
                <Leaf className="w-5 h-5 text-[#86efac]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-[#FDFBF7]">
                Coff<span className="text-[#86efac]">Block</span>
              </span>
            </div>

            <p className="text-xs text-white/75 leading-relaxed max-w-sm">
              {t.brandDesc}
            </p>

            <p className="text-xs italic text-[#86efac] font-serif-display">
              "{t.slogan}"
            </p>

            <div className="pt-2">
              <button
                onClick={handleDownloadSingleHtml}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors cursor-pointer"
                title="Lưu trang web dạng 1 file HTML duy nhất"
              >
                <Download className="w-3.5 h-3.5 text-[#86efac]" />
                <span>{lang === 'vi' ? 'Tải trang web đơn tệp (.HTML)' : 'Export Standalone Single HTML'}</span>
              </button>
            </div>
          </div>

          {/* Quick Links: Products */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#86efac]">
              {lang === 'vi' ? 'Sản phẩm & Giải pháp' : 'Product & Solutions'}
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  {lang === 'vi' ? 'Set Tủ Lạnh (79.000 VNĐ)' : 'Refrigerator Set (79,000 VND)'}
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  {lang === 'vi' ? 'Set Tủ Áo & Phòng Tắm (99.000 VNĐ)' : 'Wardrobe Canvas Set (99,000 VND)'}
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  {lang === 'vi' ? 'Family Combo Toàn Diện (159.000 VNĐ)' : 'Family All-in-One Combo'}
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  {lang === 'vi' ? 'Quy trình sản xuất tuần hoàn' : 'Circular 4-Step Process'}
                </a>
              </li>
            </ul>
          </div>

          {/* Technology & Live Q&A */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-[#86efac]">
              {lang === 'vi' ? 'Hỏi Đáp & Công Nghệ' : 'Science & Live Hub'}
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              {lang === 'vi' 
                ? 'Công nghệ cấu trúc vi xốp mao dẫn kết hợp tinh bột sắn thực vật an toàn. Tương tác đặt câu hỏi trực tiếp không cần đăng nhập.'
                : 'Micro-capillary adsorption technology paired with safe food-grade cassava starch. Direct real-time audience participation.'}
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href="#tech"
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#3D2314] bg-[#86efac] hover:bg-[#6ee7b7]"
              >
                {lang === 'vi' ? 'Tìm hiểu Công nghệ Vi xốp' : 'Explore Porous Science'}
              </a>
              <button
                onClick={onOpenQna}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'Tham gia Live Q&A' : 'Join Live Q&A'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Rights & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>{t.rights}</p>

          <div className="flex items-center gap-4">
            <button
              onClick={onScrollToTop}
              className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Lên đầu trang' : 'Back to top'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
