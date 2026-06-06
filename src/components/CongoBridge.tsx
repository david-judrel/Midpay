import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Ship, Zap } from 'lucide-react';

interface CongoBridgeProps {
  isDarkMode: boolean;
}

export default function CongoBridge({ isDarkMode }: CongoBridgeProps) {
  const [amountXaf, setAmountXaf] = useState<number>(50000);
  const [selectedDestination, setSelectedDestination] = useState<'USD' | 'CDF'>('USD');

  // Rates as of 2026/06 (1 USD ≈ 600 XAF, 1 CDF ≈ 0.22 XAF)
  const usdRate = 0.0016; 
  const cdfRate = 4.54; 

  const [clearingSuccess, setClearingSuccess] = useState<boolean>(false);
  const [successInfo, setSuccessInfo] = useState<string>('');

  const handleLockSettlement = () => {
    setSuccessInfo(`Le taux souverain pour ${amountXaf.toLocaleString()} XAF a été bloqué pour les prochaines 15 uniques minutes sur le réseau de compensation de MidPay.`);
    setClearingSuccess(true);
    setTimeout(() => {
      setClearingSuccess(false);
    }, 6000);
  };

  const calculatedValueByDest = selectedDestination === 'USD' 
    ? (amountXaf * usdRate).toFixed(2) 
    : Math.round(amountXaf * cdfRate).toLocaleString();

  // Route comparisons
  const normalRoute = {
    method: "Agents cash portuaires du fleuve",
    cost: "8% à 12% de frais cash informels et pertes",
    speed: "2 à 6 heures de retard de transit",
    safety: "Aucun suivi ni garantie de sécurité"
  };

  const midPayRoute = {
    method: "Passerelle de Paiement unifiée MidPay",
    cost: "0,45% de frais fixes de transaction",
    speed: "< 250ms de validation instantanée",
    safety: "Sécurité et chiffrement API de bout en bout"
  };

  return (
    <section 
      id="bridge" 
      className={`relative py-20 select-none border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-brand-deep-dark text-white border-white/5' 
          : 'bg-[#FFFFFF] text-brand-black border-black/10'
      }`}
    >
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
        {/* Subtle decorative waves representing the Congo River */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0,100 Q250,150 500,100 T1000,100 L1000,1000 L0,1000 Z" fill="none" stroke={isDarkMode ? "#FFFFFF" : "#111111"} strokeWidth="1" />
          <path d="M0,200 Q250,250 500,200 T1000,200" fill="none" stroke={isDarkMode ? "#FFFFFF" : "#111111"} strokeWidth="1" />
          <path d="M0,300 Q250,350 500,300 T1000,300" fill="none" stroke={isDarkMode ? "#FFFFFF" : "#111111"} strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFD60A] bg-brand-black px-3 py-1 rounded-full uppercase">
            Intégration Souveraine
          </span>
          <h2 className={`font-display font-black text-3xl sm:text-4xl mt-4 tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
            Le Pont Brazzaville-Kinshasa
          </h2>
          <p className={`text-sm sm:text-base mt-3 leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
            Connectez les deux capitales les plus proches au monde, séparées uniquement par le majestueux fleuve Congo. MidPay opère le registre sécurisé régulant les règlements instantanés.
          </p>
        </div>

        {/* Dynamic Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* River Bridge Interactive Calculator (Left 5 Columns) */}
          <div className={`lg:col-span-5 border rounded-3xl p-6 sm:p-8 flex flex-col gap-5 transition ${
            isDarkMode ? 'bg-[#1E1E1E] border-white/10' : 'bg-white border-black/10 shadow-lg'
          }`}>
            <div className={`flex justify-between items-center pb-3 border-b ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
              <span className="font-mono text-[10px] text-brand-yellow font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Ship className="w-4 h-4 text-[#FFD60A] animate-pulse" />
                Calculateur Inter-Rives
              </span>
              <span className={`text-[9px] font-mono ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>Devise initiale : XAF</span>
            </div>

            {/* Amount Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-white/60">
                <span className={isDarkMode ? 'text-white/60' : 'text-brand-black/60'}>VALEUR À TRANSMETTRE</span>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>{amountXaf.toLocaleString()} XAF</span>
              </div>
              <input 
                type="range" 
                min={5000} 
                max={500000} 
                step={5000}
                value={amountXaf}
                onChange={(e) => setAmountXaf(Number(e.target.value))}
                className="w-full accent-brand-yellow cursor-pointer"
              />
              <div className={`flex justify-between text-[9px] font-mono ${isDarkMode ? 'text-white/30' : 'text-brand-black/30'}`}>
                <span>5 000 XAF</span>
                <span>500 000 XAF</span>
              </div>
            </div>

            {/* Destination selector */}
            <div className="space-y-2">
              <label className={`text-[9px] font-mono font-bold block uppercase ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>
                Sélectionnez la devise cible
              </label>
              <div className={`grid grid-cols-2 gap-2 p-1 rounded-xl border ${isDarkMode ? 'bg-brand-black border-white/5' : 'bg-brand-soft-gray border-black/5'}`}>
                <button
                  onClick={() => setSelectedDestination('USD')}
                  className={`py-2 text-xs font-bold font-mono rounded-lg transition cursor-pointer ${
                    selectedDestination === 'USD' 
                      ? 'bg-[#FFD60A] text-brand-black' 
                      : isDarkMode ? 'text-white/60 hover:text-white' : 'text-brand-black/60 hover:text-brand-black'
                  }`}
                >
                  US Dollar (USD)
                </button>
                <button
                  onClick={() => setSelectedDestination('CDF')}
                  className={`py-2 text-xs font-bold font-mono rounded-lg transition cursor-pointer ${
                    selectedDestination === 'CDF' 
                      ? 'bg-[#FFD60A] text-brand-black' 
                      : isDarkMode ? 'text-white/60 hover:text-white' : 'text-brand-black/60 hover:text-brand-black'
                  }`}
                >
                  Franc Congolais (CDF)
                </button>
              </div>
            </div>

            {/* Output Panel with conversion */}
            <div className={`p-4 rounded-2xl border relative overflow-hidden flex flex-col justify-between min-h-[110px] ${
              isDarkMode ? 'bg-brand-black border-white/5' : 'bg-brand-soft-gray border-black/10'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[9px] font-mono uppercase ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>Valeur Équivalente à Kinshasa</span>
                <span className="text-[10px] text-green-500 font-mono flex items-center gap-1">
                  <Zap className="w-3 h-3 text-green-500 animate-pulse" /> Taux Central en Direct
                </span>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-display font-black ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                  {calculatedValueByDest}
                </span>
                <span className="text-brand-yellow font-display font-bold text-sm tracking-wide">
                  {selectedDestination}
                </span>
              </div>

              <span className={`text-[9.5px] font-mono block mt-3 ${isDarkMode ? 'text-white/30' : 'text-brand-black/30'}`}>
                Temps de traitement global : 240ms via le hub souverain de Brazzaville
              </span>
            </div>

            {clearingSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-xs font-mono text-center leading-relaxed"
              >
                <div className="font-bold flex items-center justify-center gap-1.5 mb-1 text-xs">
                  <Zap className="w-3.5 h-3.5" /> TAUX GARANTI VERROUILLÉ
                </div>
                {successInfo}
              </motion.div>
            ) : (
              <button
                id="bridge-lock-settlement-btn"
                onClick={handleLockSettlement}
                className={`w-full py-3.5 font-display font-black text-xs rounded-xl transition-all duration-300 cursor-pointer ${
                  isDarkMode 
                    ? 'bg-white text-brand-black hover:bg-[#FFD60A]' 
                    : 'bg-[#111111] text-white hover:bg-[#FFD60A] hover:text-[#111111] shadow'
                }`}
              >
                Bloquer le cours de l'échange
              </button>
            )}
          </div>

          {/* Infrastructure Routing comparison (Right 7 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6 h-full justify-between">
            
            {/* The Node Visualizing System Route */}
            <div className={`border rounded-3xl p-6 sm:p-8 flex flex-col relative overflow-hidden transition ${
              isDarkMode ? 'bg-brand-dark-gray/30 border-white/5' : 'bg-brand-soft-gray border-black/10'
            }`}>
              <span className={`text-xs font-mono font-bold uppercase tracking-widest block mb-4 ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                Nœuds de Compensation Souverains
              </span>
              
              {/* Graphic nodes representing river cross */}
              <div className={`flex justify-between items-center py-6 px-10 border rounded-2xl relative ${
                isDarkMode ? 'border-white/5 bg-brand-black/60' : 'border-black/5 bg-white shadow-sm'
              }`}>
                
                {/* Visual river representation */}
                <div className="absolute inset-x-32 top-[50%] -translate-y-[50%] h-1 bg-blue-500/20 border-b border-dashed border-blue-500/30 flex justify-around">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                </div>

                {/* Brazzaville node */}
                <div className="flex flex-col items-center gap-2 relative z-10 text-center">
                  <div className="w-12 h-12 rounded-xl bg-brand-yellow flex items-center justify-center text-brand-black font-display font-black text-xs yellow-glow-md">
                    BZV
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>QG Brazzaville</div>
                    <span className={`font-mono text-[8px] uppercase ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>République du Congo</span>
                  </div>
                </div>

                {/* Simulated floating boat/packet */}
                <div id="float-packet" className="absolute left-[50%] -translate-x-[50%] bg-[#111111] text-brand-yellow rounded-full px-2 py-1 font-mono text-[9px] border border-brand-yellow/10 animate-bounce">
                  <span>Trame compensée</span>
                </div>

                {/* Kinshasa node */}
                <div className="flex flex-col items-center gap-2 relative z-10 text-center">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-display font-black text-xs ${
                    isDarkMode ? 'bg-brand-black border-white/10 text-white' : 'bg-brand-soft-gray border-black/10 text-brand-black'
                  }`}>
                    KIN
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>Régie Kinshasa</div>
                    <span className={`font-mono text-[8px] uppercase ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>Rép. Dém. du Congo</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Comparison Side-by-Side Panels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Traditional */}
              <div className={`p-5 border rounded-2xl space-y-3 ${
                isDarkMode ? 'bg-brand-black border-white/5' : 'bg-white border-black/10 shadow-sm text-brand-black'
              }`}>
                <div className={`flex items-center gap-2 border-b pb-2 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span className={`text-[10px] font-mono font-bold uppercase ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>Canal Fluvial Traditionnel</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <div className={`${isDarkMode ? 'text-white/45' : 'text-brand-black/45'} text-[8.5px]`}>MÉTHODE :</div>
                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>{normalRoute.method}</div>
                  </div>
                  <div>
                    <div className={`${isDarkMode ? 'text-white/45' : 'text-brand-black/45'} text-[8.5px]`}>ATTENTE CONSTANT :</div>
                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>{normalRoute.speed}</div>
                  </div>
                  <div>
                    <div className={`${isDarkMode ? 'text-white/45' : 'text-brand-black/45'} text-[8.5px]`}>PERTE ESTIMÉE :</div>
                    <div className="text-red-400 font-bold">{normalRoute.cost}</div>
                  </div>
                </div>
              </div>

              {/* MidPay Way */}
              <div className="bg-[#111111] p-5 border border-brand-yellow/10 rounded-2xl space-y-3 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center gap-2 border-b border-brand-yellow/10 pb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                  <span className="text-[10px] font-mono font-bold text-brand-yellow uppercase">Le Registre Central MidPay</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <div className="text-brand-yellow/45 text-[8.5px]">MÉTHODE :</div>
                    <div className="text-white font-bold">{midPayRoute.method}</div>
                  </div>
                  <div>
                    <div className="text-brand-yellow/45 text-[8.5px]">ATTENTE CONSTANT :</div>
                    <div className="text-brand-yellow font-bold">{midPayRoute.speed}</div>
                  </div>
                  <div>
                    <div className="text-brand-yellow/45 text-[8.5px]">Frais du réseau :</div>
                    <div className="text-[#FFD60A] font-bold">{midPayRoute.cost}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
