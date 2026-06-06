import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sun, Moon, Smartphone, Code } from 'lucide-react';

interface NavbarProps {
  viewMode: 'presentation' | 'developer';
  setViewMode: (mode: 'presentation' | 'developer') => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export default function Navbar({ 
  viewMode, 
  setViewMode, 
  isDarkMode,
  setIsDarkMode
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (mode: 'presentation' | 'developer') => {
    setIsOpen(false);
    setViewMode(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (sectionId: string) => {
    setIsOpen(false);
    setViewMode('presentation');
    setTimeout(() => {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(sectionId);
      if (element) {
        // Offset a bit for the floating elegant header
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-4 py-3 sm:px-6 md:py-4">
        <div className={`max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl shadow-xl transition-all duration-300 border ${
          isDarkMode 
            ? 'bg-brand-black/90 backdrop-blur-sm border-white/5 text-white' 
            : 'bg-white/95 backdrop-blur-sm border-black/10 text-brand-black shadow-lg'
        }`}>
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('presentation')} 
            className="flex items-center gap-2 cursor-pointer group"
            id="nav-logo"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FFD60A] flex items-center justify-center font-display font-black text-[#111111] text-lg shadow-sm group-hover:scale-105 transition-transform duration-300">
              M
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-bold tracking-tight leading-none text-base ${isDarkMode ? 'text-white' : 'text-[#111111]'}`}>
                MID<span className="text-[#FFD60A]">PAY</span>
              </span>
              <span className={`text-[9px] font-mono tracking-widest uppercase mt-0.5 ${isDarkMode ? 'text-white/45' : 'text-brand-black/45'}`}>
                Brazzaville
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              id="nav-item-home"
              onClick={() => handleSectionClick('home')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-tight transition-all duration-300 cursor-pointer ${
                viewMode === 'presentation'
                  ? isDarkMode 
                    ? 'text-white hover:bg-white/5' 
                    : 'text-brand-black hover:bg-brand-black/5'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Accueil
            </button>

            <button
              id="nav-item-app-demo"
              onClick={() => handleSectionClick('smartphone-demo')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-tight transition-all duration-300 cursor-pointer flex items-center gap-1 ${
                viewMode === 'presentation'
                  ? 'text-white/80 hover:text-[#FFD60A]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#FFD60A]" />
              L'Application Mobile
            </button>

            <button
              id="nav-item-cards"
              onClick={() => handleSectionClick('cards')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold tracking-tight text-white/80 hover:text-[#FFD60A] transition-all duration-300 cursor-pointer"
            >
              Cartes Virtuelles & Métal
            </button>

            <button
              id="nav-item-bridge"
              onClick={() => handleSectionClick('bridge')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold tracking-tight text-white/80 hover:text-[#FFD60A] transition-all duration-300 cursor-pointer"
            >
              Tarifs & Passerelle
            </button>
          </nav>

          {/* Desktop Call to Action & Status */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition-all duration-300 focus:outline-none cursor-pointer ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 text-[#FFD60A] hover:bg-white/10' 
                  : 'bg-brand-black/5 border-black/10 text-brand-black hover:bg-brand-black/10'
              }`}
              title={isDarkMode ? "Passer au thème clair" : "Passer au thème sombre"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#FFD60A]" /> : <Moon className="w-4 h-4 text-[#111111]" />}
            </button>

            <span className={`flex items-center gap-1.5 font-mono text-[9px] px-2.5 py-1 rounded-full border ${
              isDarkMode 
                ? 'bg-[#1E1E1E] text-brand-yellow border-brand-yellow/20' 
                : 'bg-white text-green-700 border-green-700/20'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-brand-yellow animate-pulse' : 'bg-green-600 animate-pulse'}`} />
              CONGO - MTN & AIRTEL CHICS
            </span>

            {/* Separate, premium developer button on the right */}
            <button
              id="nav-item-developer"
              onClick={() => handleNavClick('developer')}
              className={`flex items-center gap-1.5 border font-mono text-xs px-3.5 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                viewMode === 'developer'
                  ? 'bg-white text-brand-black border-transparent font-bold'
                  : isDarkMode
                    ? 'border-white/10 text-white/80 hover:border-[#FFD60A]/50 hover:text-white bg-white/5'
                    : 'border-black/15 text-brand-black/80 hover:border-[#FFD60A]/80 hover:text-brand-black bg-black/5'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-[#FFD60A]" />
              Espace API & Sandbox
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Mobile Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition-all duration-300 focus:outline-none cursor-pointer ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 text-brand-yellow' 
                  : 'bg-brand-black/5 border-black/10 text-brand-black'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#FFD60A]" /> : <Moon className="w-4 h-4 text-brand-black" />}
            </button>
            <button
              id="mobile-nav-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                isDarkMode 
                  ? 'text-white/80 hover:text-white bg-white/5 border-white/5' 
                  : 'text-brand-black/80 hover:text-brand-black bg-brand-black/5 border-black/5'
              }`}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-[72px] left-4 right-4 z-40 border rounded-2xl p-5 shadow-2xl lg:hidden overflow-hidden ${
              isDarkMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-black/15 text-[#111111]'
            }`}
          >
            <div className="flex flex-col gap-3">
              <div className={`text-[10px] font-mono tracking-wider uppercase border-b pb-2 ${isDarkMode ? 'text-white/40 border-white/5' : 'text-brand-black/40 border-black/5'}`}>
                Navigation Solution
              </div>

              <button
                id="mobile-nav-item-home"
                onClick={() => handleSectionClick('home')}
                className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  viewMode === 'presentation'
                    ? 'text-[#FFD60A]'
                    : isDarkMode ? 'text-white/75 hover:bg-white/5 hover:text-white' : 'text-brand-black/75 hover:bg-brand-black/5 hover:text-brand-black'
                }`}
              >
                Page d'Accueil Présentation
              </button>

              <button
                id="mobile-nav-item-app"
                onClick={() => handleSectionClick('smartphone-demo')}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-bold text-white/75 hover:bg-white/5 hover:text-white transition-all cursor-pointer flex items-center gap-2"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#FFD60A]" />
                L'Application Mobile du Congo
              </button>

              <button
                id="mobile-nav-item-cards"
                onClick={() => handleSectionClick('cards')}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-bold text-white/75 hover:bg-white/5 hover:text-white transition-all cursor-pointer flex items-center gap-2"
              >
                Nos Cartes Virtuelles & Métal
              </button>

              <button
                id="mobile-nav-item-bridge"
                onClick={() => handleSectionClick('bridge')}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-bold text-white/75 hover:bg-white/5 hover:text-white transition-all cursor-pointer flex items-center gap-2"
              >
                Tarifs de Transferts RDC & RC
              </button>

              <div className={`flex flex-col gap-2 pt-3 border-t mt-2 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <button
                  id="mobile-nav-cta"
                  onClick={() => handleNavClick('developer')}
                  className="w-full flex items-center justify-center gap-2 bg-[#FFD60A] text-brand-black font-display font-bold text-xs py-3 rounded-xl yellow-glow-sm"
                >
                  <Code className="w-3.5 h-3.5 mr-1" />
                  Consoles API & Bac à sable
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <div className={`flex items-center justify-center gap-1 text-[9px] font-mono mt-1 ${isDarkMode ? 'text-white/40' : 'text-brand-black/45'}`}>
                  Réseau de Paiement en Ligne du Congo
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
