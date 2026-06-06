import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, ShieldCheck, Flame, Gift, Coins } from 'lucide-react';
import { CustomCardConfig } from '../types';

interface VirtualCardsProps {
  cardConfig: CustomCardConfig;
  setCardConfig: React.Dispatch<React.SetStateAction<CustomCardConfig>>;
  isDarkMode: boolean;
}

export default function VirtualCards({ cardConfig, setCardConfig, isDarkMode }: VirtualCardsProps) {
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Constants
  const colors = [
    { id: 'black', label: 'Jet Black Noir Intense', bgClass: 'bg-[#111111]', textClass: 'text-white border-white/10' },
    { id: 'yellow', label: 'Electric Gold Jaune Intense', bgClass: 'bg-[#FFD60A]', textClass: 'text-brand-black border-brand-black/20' },
    { id: 'silver', label: 'Platinum Steel Blanc Argent', bgClass: 'bg-[#E5E5EA]', textClass: 'text-brand-black border-brand-black/10' }
  ];

  const tiers = [
    { name: 'Standard', benefits: 'Routages et retraits de base sans abonnement' },
    { name: 'Infinity', benefits: 'Frais de devises de 0,5% fixes + lounge aéroports' },
    { name: 'Black Gold', benefits: 'Laiton lourd de 24g, support prioritaire & 2% Cashback' },
  ];

  const toggleFreeze = () => {
    setCardConfig(prev => ({ ...prev, isLocked: !prev.isLocked }));
  };

  const handleColorChange = (color: 'black' | 'yellow' | 'silver') => {
    setCardConfig(prev => ({ ...prev, color }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const truncated = e.target.value.substring(0, 24); // fit on physical layout
    setCardConfig(prev => ({ ...prev, holderName: truncated }));
  };

  const handleTierChange = (tier: 'Standard' | 'Infinity' | 'Black Gold') => {
    setCardConfig(prev => ({ ...prev, tier }));
  };

  // Render variables corresponding to active customization
  const activeColorSet = colors.find(c => c.id === cardConfig.color) || colors[0];

  return (
    <section 
      id="cards" 
      className={`relative py-20 select-none border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-brand-deep-dark text-white border-white/5' 
          : 'bg-[#FFFFFF] text-brand-black border-black/10'
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="card-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill={isDarkMode ? "#FFFFFF" : "#111111"} />
          </pattern>
          <rect width="100%" height="100%" fill="url(#card-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Module Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFD60A] bg-brand-black px-3 py-1 rounded-full uppercase">
            Soutien Physique & Virtuel Hybride
          </span>
          <h2 className={`font-display font-black text-3xl sm:text-4xl mt-4 tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
            Commandez votre Carte en Métal Lourd
          </h2>
          <p className={`text-sm sm:text-base mt-3 leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
            Associez directement vos réserves de solde d'applications mobiles à de prestigieuses cartes de débit physiques. Routée et gravée localement à Brazzaville.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Card interactive model (Left 5 Columns) - Keep card body high contrast chic dark context */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            {/* The 3D-feeling card wrapper */}
            <motion.div 
              className="relative w-full max-w-sm aspect-[1.586/1] rounded-2xl shadow-2xl p-6 overflow-hidden border border-[#2A2A2A] transition-all duration-500 cursor-pointer"
              whileHover={{ scale: 1.02, rotateY: 3 }}
              animate={cardConfig.isLocked ? { filter: 'grayscale(0.85) opacity(0.75)' } : { filter: 'grayscale(0) opacity(1)' }}
              id="virtual-card-preview"
            >
              {/* Background of card depending on configuration */}
              <div className={`absolute inset-0 z-0 ${activeColorSet.bgClass}`} />
              
              {/* Refined futuristic geometric line art on card */}
              <div className="absolute inset-0 opacity-15 mix-blend-overlay">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 0 0 L 100 100 M 0 100 L 100 0" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
                </svg>
              </div>

              {/* Glowing vector gradients specifically for the high-end look */}
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/5 rounded-full blur-xl pointer-events-none" />

              {/* Card Face Elements */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                
                {/* Header: MidPay signature and dynamic Tier Indicator */}
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className={`font-display font-black text-lg tracking-tight ${activeColorSet.textClass.split(' ')[0]}`}>
                      MID<span className={cardConfig.color === 'yellow' ? 'text-brand-black/70' : 'text-[#FFD60A]'}>PAY</span>
                    </span>
                    <span className={`font-mono text-[7px] uppercase tracking-widest ${cardConfig.color === 'yellow' ? 'text-brand-black/40' : 'text-white/40'}`}>
                      Canal National Hybride
                    </span>
                  </div>
                  
                  <span className={`font-mono text-[8px] font-extrabold uppercase px-2 py-0.5 rounded border tracking-wider ${activeColorSet.textClass}`}>
                    {cardConfig.tier}
                  </span>
                </div>

                {/* Hybrid metal-mobile chip element */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-6 rounded-md bg-gradient-to-br from-yellow-100 to-[#FFD60A] border border-white/20 relative shadow-inner overflow-hidden">
                    <div className="absolute inset-[3px] border border-black/10 rounded-sm divide-y divide-black/10 flex flex-col">
                      <div className="flex-1" />
                      <div className="flex-1" />
                    </div>
                  </div>
                  {/* Local NFC Signal indicator */}
                  <div className={`text-[8px] font-mono leading-none ${cardConfig.color === 'yellow' ? 'text-brand-black/65' : 'text-white/65'}`}>
                    <span>PUCE & CODE CRITIQUE</span> <br />
                    <span className="font-bold">RÉSEAU INTÉGRÉ CEMAC</span>
                  </div>
                </div>

                {/* Card Number & Expiry */}
                <div>
                  <div className={`font-mono text-base tracking-[0.2em] mb-3 leading-none ${activeColorSet.textClass.split(' ')[0]}`}>
                    {showFullNumber 
                      ? cardConfig.number 
                      : `••••  ••••  ••••  ${cardConfig.number.slice(-4)}`
                    }
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="space-y-0.5">
                      <div className={`font-mono text-[7px] tracking-wider uppercase ${cardConfig.color === 'yellow' ? 'text-brand-black/40' : 'text-white/40'}`}>
                        TITULAIRE DE LA CARTE
                      </div>
                      <div className={`font-display font-bold text-xs uppercase tracking-wide leading-none ${activeColorSet.textClass.split(' ')[0]}`}>
                        {cardConfig.holderName || 'CONGO MERCHANT'}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div>
                        <div className={`font-mono text-[6px] tracking-wider uppercase ${cardConfig.color === 'yellow' ? 'text-brand-black/40' : 'text-white/40'}`}>
                          EXPIRATION
                        </div>
                        <div className={`font-mono font-bold text-[10px] leading-none ${activeColorSet.textClass.split(' ')[0]}`}>
                          {cardConfig.expiry}
                        </div>
                      </div>
                      <div>
                        <div className={`font-mono text-[6px] tracking-wider uppercase ${cardConfig.color === 'yellow' ? 'text-brand-black/40' : 'text-white/40'}`}>
                          CVV
                        </div>
                        <div className={`font-mono font-bold text-[10px] leading-none ${activeColorSet.textClass.split(' ')[0]}`}>
                          {cardConfig.cvv}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Quick toggles */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowFullNumber(!showFullNumber)}
                className={`flex items-center gap-1.5 font-mono text-[10px] px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  isDarkMode 
                    ? 'bg-brand-black hover:bg-white/5 text-white/70 hover:text-white border-white/5' 
                    : 'bg-white hover:bg-brand-soft-gray text-brand-black border-black/10'
                }`}
              >
                {showFullNumber ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showFullNumber ? "Masquer Numéro" : "Afficher Numéro"}</span>
              </button>
              
              <button
                onClick={toggleFreeze}
                className={`flex items-center gap-1.5 font-mono text-[10px] px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  cardConfig.isLocked 
                    ? 'bg-red-500/20 text-red-500 border-red-500/25' 
                    : isDarkMode 
                      ? 'bg-brand-black hover:bg-white/5 text-white/70 hover:text-white border-white/5' 
                      : 'bg-white hover:bg-brand-soft-gray text-brand-black border-black/10'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{cardConfig.isLocked ? "Débloquer Carte" : "Geler la Carte"}</span>
              </button>
            </div>
          </div>

          {/* Configuration Controls Console (Right 7 Columns) */}
          <div className={`lg:col-span-7 border rounded-3xl p-6 sm:p-8 flex flex-col gap-6 transition ${
            isDarkMode ? 'bg-[#1E1E1E] border-white/10' : 'bg-white border-black/10 shadow-lg'
          }`}>
            
            {/* Control Panel Header */}
            <div className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
              <div>
                <span className="font-mono text-[9px] text-[#FFD60A] font-bold uppercase tracking-widest">
                  Atelier de Gravure Laser
                </span>
                <h3 className={`font-display font-black text-lg mt-1 uppercase ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                  Personnalisez votre plaque métallique
                </h3>
              </div>
              <span className="text-[9px] font-mono bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded uppercase">
                CG-MINT ACTIF
              </span>
            </div>

            {/* Holder Name Input */}
            <div>
              <label className={`text-[10px] font-bold block mb-2 uppercase font-mono tracking-wider ${isDarkMode ? 'text-white/50' : 'text-brand-black/60'}`}>
                1. Gravure Laser Physique (Nom imprimé)
              </label>
              <input 
                type="text"
                value={cardConfig.holderName}
                onChange={handleNameChange}
                maxLength={24}
                className={`w-full border font-bold px-4 py-3.5 rounded-xl transition text-sm uppercase tracking-wider focus:outline-none ${
                  isDarkMode 
                    ? 'bg-brand-black focus:bg-black/80 border-white/10 focus:border-[#FFD60A]/30 text-white' 
                    : 'bg-brand-soft-gray focus:bg-white border-transparent focus:border-black/15 text-brand-black'
                }`}
                placeholder="ex. Koffi Ndolo"
              />
            </div>

            {/* Metal Palette Selection */}
            <div>
              <label className={`text-[10px] font-bold block mb-2.5 uppercase font-mono tracking-wider ${isDarkMode ? 'text-white/50' : 'text-brand-black/60'}`}>
                2. Finition de la plaque métallique
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {colors.map((color) => {
                  const isSelected = cardConfig.color === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => handleColorChange(color.id as 'black' | 'yellow' | 'silver')}
                      className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition cursor-pointer ${
                        isSelected 
                          ? 'bg-[#FFD60A]/10 border-[#FFD60A] text-brand-yellow' 
                          : isDarkMode 
                            ? 'bg-brand-black/40 hover:bg-black border-white/5 text-white/70' 
                            : 'bg-brand-soft-gray hover:bg-brand-soft-gray/60 border-transparent text-brand-black/80'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border ${color.bgClass} flex-shrink-0`} />
                      <div className="leading-tight">
                        <div className={`text-[11px] font-bold ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>{color.label.split(' ')[0]}</div>
                        <div className={`text-[8.5px] font-mono ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>{color.label.split(' ').slice(1).join(' ')}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tier Select */}
            <div>
              <label className={`text-[10px] font-bold block mb-2.5 uppercase font-mono tracking-wider ${isDarkMode ? 'text-white/50' : 'text-brand-black/60'}`}>
                3. Privilèges de transaction et plafonds
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {tiers.map((tier) => {
                  const isSelected = cardConfig.tier === tier.name;
                  return (
                    <button
                      key={tier.name}
                      onClick={() => handleTierChange(tier.name as 'Standard' | 'Infinity' | 'Black Gold')}
                      className={`flex flex-col items-start gap-2 p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                        isSelected 
                          ? 'bg-[#FFD60A]/15 border-[#FFD60A] text-[#FFD60A]' 
                          : isDarkMode 
                            ? 'bg-brand-black/40 hover:bg-black border-white/5 text-white/50' 
                            : 'bg-brand-soft-gray hover:bg-[#F2F2F7] border-transparent text-brand-black/60'
                      }`}
                    >
                      <span className={`text-[9px] font-mono tracking-widest font-extrabold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-[#FFD60A] text-brand-black' : isDarkMode ? 'bg-white/5 text-white/60' : 'bg-black/5 text-brand-black/70'
                      }`}>
                        {tier.name}
                      </span>
                      <p className={`text-[9px] mt-1.5 font-medium leading-normal ${
                        isSelected ? isDarkMode ? 'text-white' : 'text-brand-black' : isDarkMode ? 'text-white/40' : 'text-brand-black/40'
                      }`}>
                        {tier.benefits}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Features list */}
            <div className={`p-4 border rounded-2xl space-y-3 font-mono text-[9px] transition ${
              isDarkMode ? 'bg-brand-black/30 border-white/10 text-white/55' : 'bg-brand-soft-gray border-black/5 text-brand-black/65'
            }`}>
              <div className="flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-[#FFD60A] shrink-0" />
                <span>Corps métallique standard : laiton lourd de 24g durable</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-3.5 h-3.5 text-[#FFD60A] shrink-0" />
                <span>Assistance prioritaire aux salons d'aéroports de Brazzaville et de la CEMAC</span>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="w-3.5 h-3.5 text-[#FFD60A] shrink-0" />
                <span>Couplage direct et sans frais avec vos comptes MTN MoMo et Airtel Congo</span>
              </div>
            </div>

            {/* Setup Trigger */}
            {orderSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center text-xs font-mono text-green-500"
              >
                <div className="font-bold text-xs tracking-wider uppercase mb-1 flex items-center justify-center gap-1.5 text-green-500">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  DEMANDE ENVOYÉE AVEC SUCCÈS
                </div>
                La préconfiguration pour <strong>{cardConfig.holderName || "Marchand MidPay"}</strong> a bien été enregistrée. L'équipe d'émission de Brazzaville vous contactera très rapidement pour confirmer l'expédition par coursier.
              </motion.div>
            ) : (
              <button
                id="mint-card-btn"
                onClick={() => {
                  setOrderSuccess(true);
                  setTimeout(() => setOrderSuccess(false), 8000);
                }}
                className={`w-full py-4 text-sm font-display font-black rounded-xl transition duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  isDarkMode 
                    ? 'bg-white text-brand-black hover:bg-[#FFD60A]' 
                    : 'bg-[#111111] text-white hover:bg-[#FFD60A] hover:text-[#111111]'
                }`}
              >
                Commander ma carte métallique hybride
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
