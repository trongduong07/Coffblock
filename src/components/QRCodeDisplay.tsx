import React, { useState } from 'react';
import { Maximize2, Copy, Check, X, QrCode } from 'lucide-react';

interface QRCodeDisplayProps {
  url: string;
  lang: 'vi' | 'en';
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ url, lang }) => {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Generate QR code SVG using Google Chart API or inline SVG fallback
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&color=3D2314&bgcolor=FDFBF7`;

  return (
    <>
      <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#4A2E15]/15 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        {/* QR Thumbnail */}
        <div className="relative group p-2 bg-white rounded-xl border border-[#4A2E15]/10 shadow-sm shrink-0">
          <img
            src={qrImageUrl}
            alt="CoffBlock Live Q&A QR Code"
            className="w-36 h-36 object-contain rounded-lg"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute inset-0 bg-[#3D2314]/70 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer"
            aria-label="Enlarge QR Code"
          >
            <Maximize2 className="w-5 h-5" />
            <span className="text-[10px] font-bold">
              {lang === 'vi' ? 'Phóng to chiếu slide' : 'Full Screen'}
            </span>
          </button>
        </div>

        {/* Action & Info */}
        <div className="space-y-3 text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D5A27]">
            <QrCode className="w-4 h-4" />
            <span>{lang === 'vi' ? 'Quét QR trên điện thoại' : 'Scan via phone camera'}</span>
          </div>
          <p className="text-xs text-[#4A2E15]/80">
            {lang === 'vi' 
              ? 'Khán giả quét mã để vào thẳng trang gửi câu hỏi ẩn danh và upvote mà không cần đăng nhập hay tải app.'
              : 'Audience can scan to directly submit anonymous questions and vote without any app install or login.'}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#3D2314] bg-[#F5F2EA] hover:bg-[#EAE4D6] border border-[#4A2E15]/10 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Chiếu Slide Pitch' : 'Projector View'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#2D5A27] bg-[#2D5A27]/10 hover:bg-[#2D5A27]/20 border border-[#2D5A27]/20 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#2D5A27]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (lang === 'vi' ? 'Đã sao chép link!' : 'Copied link!') : (lang === 'vi' ? 'Copy Link Q&A' : 'Copy Link')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Projector Modal for Presentation Stage */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FDFBF7] max-w-lg w-full rounded-3xl p-8 shadow-2xl border border-[#4A2E15]/20 relative text-center">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#4A2E15]/70 hover:text-[#3D2314] hover:bg-[#4A2E15]/10 transition-colors cursor-pointer"
              aria-label="Close QR Modal"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2D5A27]">
              CoffBlock · Pitch Deck Live Q&A
            </span>
            <h3 className="text-2xl font-extrabold text-[#3D2314] mt-2 mb-1">
              {lang === 'vi' ? 'Quét Mã Để Đặt Câu Hỏi' : 'Scan to Ask Anonymous Questions'}
            </h3>
            <p className="text-xs text-[#4A2E15]/75 mb-6">
              {lang === 'vi' ? 'Không cần tạo tài khoản hay đăng nhập' : 'No account or app download required'}
            </p>

            <div className="bg-white p-6 rounded-2xl border border-[#4A2E15]/15 inline-block shadow-inner mb-6">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(url)}&color=3D2314&bgcolor=FFFFFF`}
                alt="Large QR Code for Pitch Slide"
                className="w-64 h-64 sm:w-72 sm:h-72 object-contain mx-auto"
              />
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleCopy}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#2D5A27] hover:bg-[#23471f] flex items-center gap-2 cursor-pointer shadow-md"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? (lang === 'vi' ? 'Đã sao chép link!' : 'Copied link!') : (lang === 'vi' ? 'Sao chép link chia sẻ' : 'Copy Share Link')}</span>
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#3D2314] bg-[#F5F2EA] hover:bg-[#EAE4D6] cursor-pointer"
              >
                {lang === 'vi' ? 'Đóng' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
