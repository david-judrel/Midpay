import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, Globe, Coins, ChevronRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartSandbox: () => void;
  onStartCards: () => void;
  isDarkMode: boolean;
}

export default function Hero({ onStartSandbox, onStartCards, isDarkMode }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section 
      id="hero" 
      className={`relative min-h-screen flex flex-col justify-center pt-28 sm:pt-32 pb-16 overflow-hidden transition-colors duration-300 border-b ${
        isDarkMode 
          ? 'bg-brand-deep-dark text-white border-white/5' 
          : 'bg-[#FFFFFF] text-brand-black border-black/10'
      }`}
    >
      {/* Absolute Tech Grid & Ambient Yellow Light Orbs */}
      <div className="absolute inset-0 z-0 opacity-15 overflow-hidden pointer-events-none">
        <div className={`absolute top-[20%] left-[50%] -translate-x-[50%] w-[600px] h-[600px] rounded-full blur-[150px] ${
          isDarkMode ? 'bg-brand-yellow/15' : 'bg-brand-yellow/10'
        }`} />
        <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-brand-yellow/5 blur-[90px]" />
        
        {/* Futuristic subtle grid lines */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(17,17,17,0.02)"} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Main Pitch (Left 7 Cols on desktop) */}
        <motion.div 
          className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge: Brazzaville, Congo */}
          <motion.div 
            variants={itemVariants}
            className={`inline-flex items-center gap-2 border px-3.5 py-1.5 rounded-full mb-6 shadow-sm ${
              isDarkMode 
                ? 'bg-brand-dark-gray border-white/10 text-white shadow-black/80' 
                : 'bg-brand-soft-gray border-black/10 text-brand-black'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-1">
              Brazzaville, Congo | Registre Financier Souverain
            </span>
          </motion.div>

          {/* Epic Main Typography Title */}
          <motion.h1 
            variants={itemVariants}
            className={`font-display font-black text-4xl sm:text-5xl lg:text-[68px] leading-[0.95] tracking-tighter mb-6 max-w-2xl uppercase ${
              isDarkMode ? 'text-white' : 'text-brand-black'
            }`}
          >
            La banque de la <br/>
            <span className="text-transparent" style={{ WebkitTextStroke: isDarkMode ? '1.5px #FFFFFF' : '1.5px #111111' }}>prochaine licorne</span> <br/>
            africaine.
          </motion.h1>

          {/* Sleek Subtext */}
          <motion.p 
            variants={itemVariants}
            className={`text-base sm:text-lg lg:text-xl font-normal tracking-tight leading-relaxed mb-8 max-w-xl ${
              isDarkMode ? 'text-white/60' : 'text-brand-black/60'
            }`}
          >
            L'infrastructure de paiement la plus intelligente pour la région CEMAC. Déployez des API de facturation épurées, des registres Mobile Money (MTN MoMo, Airtel Money) et des ponts interbancaires en temps réel.
          </motion.p>

          {/* Elegant Apple-Level Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              id="hero-primary-sandbox-btn"
              onClick={onStartSandbox}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#FFD60A] hover:bg-[#FFD60A]/90 text-[#111111] font-display font-bold text-sm sm:text-base px-8 py-4 rounded-xl yellow-glow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Tester la démo réseau
              <ChevronRight className="w-4 h-4 text-brand-black" />
            </button>
            <button
              id="hero-secondary-cards-btn"
              onClick={onStartCards}
              className={`w-full sm:w-auto flex items-center justify-center gap-1.5 bg-transparent border font-display font-bold text-sm sm:text-base px-8 py-4 rounded-xl active:scale-[0.98] transition-all duration-300 cursor-pointer ${
                isDarkMode 
                  ? 'border-white/10 hover:border-[#FFD60A]/35 text-white hover:bg-white/[0.02]' 
                  : 'border-black/15 hover:border-[#FFD60A]/60 text-brand-black hover:bg-black/[0.02]'
              }`}
            >
              Créer votre Carte Hybride
            </button>
          </motion.div>

          {/* Social Proof Indicators */}
          <motion.div 
            variants={itemVariants}
            className={`mt-12 pt-8 border-t flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 font-mono text-xs ${
              isDarkMode ? 'border-white/5 text-white/40' : 'border-black/5 text-brand-black/40'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-brand-yellow" />
              <span>Routage global ≤ 250ms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-yellow" />
              <span>Conforme Réglementation COBAC</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-brand-yellow" />
              <span>Couverture Zone CEMAC</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Visual Simulated Client Dashboard (Right 5 Cols on desktop) */}
        <motion.div 
          className="lg:col-span-5 w-full flex flex-col justify-center relative mt-10 lg:mt-0"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', delay: 0.2 }}
        >
          {/* Decorative Float Elements from Design System spec */}
          <div className={`absolute -bottom-6 -left-6 px-6 py-5 rounded-2xl shadow-2xl z-20 font-bold text-center border-4 hover:scale-105 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-brand-yellow text-brand-black border-brand-black' 
              : 'bg-brand-yellow text-brand-black border-white'
          }`}>
            <div className="text-3xl font-display font-black leading-none">0.2s</div>
            <div className="text-[9px] uppercase tracking-tighter opacity-75 font-mono mt-1">Vitesse de transfert</div>
          </div>
          <div className={`absolute -top-10 -right-4 w-24 h-24 rounded-full flex items-center justify-center p-4 text-center leading-none z-20 border-[6px] hover:scale-105 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-brand-black text-brand-yellow border-brand-dark-gray' 
              : 'bg-white text-brand-black border-brand-soft-gray shadow-md'
          }`}>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest leading-tight">Securité<br/>Totale</span>
          </div>

          <div className={`relative w-full max-w-md mx-auto aspect-square sm:aspect-auto sm:h-[450px] border rounded-3xl p-6 shadow-2xl overflow-hidden group transition-all duration-300 ${
            isDarkMode 
              ? 'bg-brand-dark-gray/60 border-white/10 glass-card-dark' 
              : 'bg-white border-black/10 shadow-lg'
          }`}>
            {/* Ambient vector lights inside card */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-yellow/10 transition-colors duration-500" />
            
            {/* Header Status */}
            <div className={`flex justify-between items-center border-b pb-4 mb-5 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                <span className={`font-mono text-[9px] uppercase tracking-widest ${isDarkMode ? 'text-white/50' : 'text-brand-black/50'}`}>
                  Terminal Réseau Actif
                </span>
              </div>
              <span className="font-mono text-[10px] text-brand-yellow bg-brand-yellow/10 px-2 py-0.5 rounded">
                Brazzaville HQ
              </span>
            </div>

            {/* Wallet Quick Balance View */}
            <div className="space-y-1 mb-6">
              <span className={`text-xs font-medium uppercase tracking-wider block ${isDarkMode ? 'text-white/45' : 'text-brand-black/45'}`}>
                Réserves Agrégées en Transit
              </span>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl sm:text-4xl font-display font-black ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                  74.850.200
                </span>
                <span className="text-brand-yellow text-sm font-semibold tracking-wide">
                  XAF
                </span>
              </div>
              <span className={`text-xs block font-mono ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>
                ≈ 114.108,54 EUR — Conversion instantanée
              </span>
            </div>

            {/* Interactive Currency Card Indicator */}
            <div className={`rounded-2xl p-4 border space-y-3 relative overflow-hidden mb-6 ${
              isDarkMode ? 'bg-brand-black/60 border-white/5' : 'bg-brand-soft-gray border-black/5'
            }`}>
              <div className="flex justify-between items-center">
                <span className={`text-[10px] font-mono uppercase ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>Tarification Mobile Money</span>
                <span className="text-[10px] font-mono text-brand-yellow flex items-center gap-1">
                  <Coins className="w-3 h-3" /> Meilleur taux de la zone
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 divide-x divide-black/5">
                <div>
                  <div className={`text-[10.5px] ${isDarkMode ? 'text-white/45' : 'text-brand-black/45'}`}>Stabilité MTNMomo/Airtel</div>
                  <div className={`text-sm font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>99.8% Succès</div>
                </div>
                <div className="pl-3">
                  <div className={`text-[10.5px] ${isDarkMode ? 'text-white/45' : 'text-brand-black/45'}`}>Commission fixe</div>
                  <div className="text-sm font-bold text-brand-yellow mt-1">0,45% Fixe</div>
                </div>
              </div>
            </div>

            {/* Simulated Live Processing Vector Chart */}
            <div className="space-y-2 mt-auto">
              <div className={`flex justify-between items-center text-[10px] font-mono ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>
                <span>Volume de transaction temps réel</span>
                <span className={`${isDarkMode ? 'text-white/80' : 'text-brand-black/80'} animate-pulse`}>Routage en cache...</span>
              </div>
              
              {/* Elegant hand-crafted premium visual Chart using CSS vectors */}
              <div className={`h-24 w-full flex items-end gap-1.5 pt-2 border-b border-l ${
                isDarkMode ? 'border-white/5' : 'border-black/5'
              }`}>
                {[40, 55, 45, 60, 85, 70, 95, 120, 80, 110, 130, 150, 115, 140, 165].map((height, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 w-full bg-gradient-to-t from-brand-yellow/20 to-brand-yellow rounded-t-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${(height / 170) * 100}%` }}
                    transition={{
                      delay: i * 0.03 + 0.3,
                      duration: 0.8,
                      type: 'spring',
                      stiffness: 80
                    }}
                  />
                ))}
              </div>
              
              <div className={`flex justify-between text-[8px] font-mono ${isDarkMode ? 'text-white/30' : 'text-brand-black/30'} pt-1`}>
                <span>10:00 (Brazzaville)</span>
                <span>10:15 (Live Interval)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
