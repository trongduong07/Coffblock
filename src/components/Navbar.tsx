import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { MessageSquare, Menu, X, Radio } from 'lucide-react';

interface NavbarProps {
  lang: 'vi' | 'en';
  onToggleLang: (newLang: 'vi' | 'en') => void;
  onOpenQna: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenQna,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang].nav;

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#4A2E15]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark & Leaf Logo */}
        <a 
          href="#" 
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A27] rounded-lg p-1 shrink-0"
          aria-label="CoffBlock Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A2E15] to-[#2D5A27] flex items-center justify-center text-white shadow-sm shadow-[#4A2E15]/20 group-hover:scale-105 transition-transform duration-200">
            {/* SVG Logo: Compressed Block + Green Sprout Leaf */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
              <path d="M12 8c2-3 5-3 6-1s-1 5-4 4" className="stroke-[#86efac] fill-[#86efac]/40" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-[#3D2314]">
              Coff<span className="text-[#2D5A27]">Block</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#4E7C59]">
              Eco Deodorizer · VN
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#4A2E15]/80">
          <button 
            onClick={() => scrollTo('products')}
            className="hover:text-[#2D5A27] transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            {t.products}
          </button>
          <button 
            onClick={() => scrollTo('story')}
            className="hover:text-[#2D5A27] transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            {t.story}
          </button>
          <button 
            onClick={() => scrollTo('tech')}
            className="hover:text-[#2D5A27] transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            {t.tech}
          </button>
          <button 
            onClick={() => scrollTo('process')}
            className="hover:text-[#2D5A27] transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            {t.process}
          </button>
          <button 
            onClick={() => scrollTo('market')}
            className="hover:text-[#2D5A27] transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            {t.market}
          </button>
          <button 
            onClick={() => scrollTo('qa')}
            className="hover:text-[#2D5A27] transition-colors whitespace-nowrap cursor-pointer py-1 flex items-center gap-1.5 font-semibold text-[#2D5A27]"
          >
            <Radio className="w-3.5 h-3.5 text-[#2D5A27] animate-pulse" />
            {t.qa}
          </button>
        </nav>

        {/* Zone 3: Language Switcher & Quick Q&A CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Bilingual Switcher: Sticky [ VI | EN ] */}
          <div 
            className="flex items-center bg-[#4A2E15]/8 p-1 rounded-xl border border-[#4A2E15]/10"
            role="group"
            aria-label="Language selection"
          >
            <button
              onClick={() => onToggleLang('vi')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                lang === 'vi' 
                  ? 'bg-[#3D2314] text-[#FDFBF7] shadow-sm' 
                  : 'text-[#4A2E15]/70 hover:text-[#3D2314]'
              }`}
              aria-pressed={lang === 'vi'}
            >
              VI
            </button>
            <button
              onClick={() => onToggleLang('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                lang === 'en' 
                  ? 'bg-[#3D2314] text-[#FDFBF7] shadow-sm' 
                  : 'text-[#4A2E15]/70 hover:text-[#3D2314]'
              }`}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => {
              onOpenQna();
              scrollTo('qa');
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#2D5A27] hover:bg-[#23471f] rounded-xl shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-0.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.askButton}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#4A2E15] hover:bg-[#4A2E15]/5 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFBF7] border-b border-[#4A2E15]/10 px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <button 
            onClick={() => scrollTo('products')}
            className="block w-full text-left py-2 px-3 text-sm font-semibold text-[#4A2E15] hover:bg-[#4A2E15]/5 rounded-lg"
          >
            {t.products}
          </button>
          <button 
            onClick={() => scrollTo('story')}
            className="block w-full text-left py-2 px-3 text-sm font-semibold text-[#4A2E15] hover:bg-[#4A2E15]/5 rounded-lg"
          >
            {t.story}
          </button>
          <button 
            onClick={() => scrollTo('tech')}
            className="block w-full text-left py-2 px-3 text-sm font-semibold text-[#4A2E15] hover:bg-[#4A2E15]/5 rounded-lg"
          >
            {t.tech}
          </button>
          <button 
            onClick={() => scrollTo('process')}
            className="block w-full text-left py-2 px-3 text-sm font-semibold text-[#4A2E15] hover:bg-[#4A2E15]/5 rounded-lg"
          >
            {t.process}
          </button>
          <button 
            onClick={() => scrollTo('market')}
            className="block w-full text-left py-2 px-3 text-sm font-semibold text-[#4A2E15] hover:bg-[#4A2E15]/5 rounded-lg"
          >
            {t.market}
          </button>
          <button 
            onClick={() => scrollTo('qa')}
            className="block w-full text-left py-2 px-3 text-sm font-semibold text-[#2D5A27] hover:bg-[#2D5A27]/10 rounded-lg flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              <span>{t.qa}</span>
            </span>
            <span className="text-[11px] bg-[#2D5A27] text-white px-2 py-0.5 rounded-full font-bold">Live</span>
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQna();
                scrollTo('qa');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-[#2D5A27] rounded-xl"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.askButton}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
