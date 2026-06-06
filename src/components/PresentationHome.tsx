import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, Wallet, QrCode, Shield, Sparkles, Zap, ArrowRight, CheckCircle2,
  Lock, RefreshCw, ShoppingBag, Send, CreditCard, ChevronRight, MessageSquare 
} from 'lucide-react';
import { CustomCardConfig } from '../types';
import VirtualCards from './VirtualCards';
import CongoBridge from './CongoBridge';

interface PresentationHomeProps {
  cardConfig: CustomCardConfig;
  setCardConfig: React.Dispatch<React.SetStateAction<CustomCardConfig>>;
  isDarkMode: boolean;
  onGoToDeveloper: () => void;
}

export default function PresentationHome({ 
  cardConfig, 
  setCardConfig, 
  isDarkMode,
  onGoToDeveloper
}: PresentationHomeProps) {
  // Mock images generated in the sandbox
  const merchantImg = '/src/assets/images/african_merchant_smiling_1780774449690.png';
  const professionalImg = '/src/assets/images/african_tech_professional_1780774466711.png';

  // Interactive Smartphone mockup tab selection
  const [phoneScreen, setPhoneScreen] = useState<'balance' | 'qr' | 'momo'>('balance');
  const [simulatedPaymentAmount, setSimulatedPaymentAmount] = useState<number>(15000);
  const [isQrPaid, setIsQrPaid] = useState<boolean>(false);
  const [successNotif, setSuccessNotif] = useState<string | null>(null);

  const triggerMockPayment = () => {
    setIsQrPaid(true);
    setSuccessNotif("Paiement MoMo Réceptionné !");
    setTimeout(() => {
      setIsQrPaid(false);
      setSuccessNotif(null);
    }, 4500);
  };

  return (
    <div className={`transition-colors duration-300 ${isDarkMode ? 'bg-brand-deep-dark text-white' : 'bg-[#FFFFFF] text-brand-black'}`}>
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/5">
        
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="presentation-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(17,17,17,0.03)"} strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#presentation-grid)" />
          </svg>
          <div className="absolute top-[20%] left-[50%] -translate-x-[50%] w-[500px] h-[500px] rounded-full blur-[120px] bg-brand-yellow/10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content Column */}
            <div className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start space-y-6">
              
              <div className={`inline-flex items-center gap-2 border px-3.5 py-1.5 rounded-full shadow-sm ${
                isDarkMode ? 'bg-brand-dark-gray border-white/10 text-white' : 'bg-brand-soft-gray border-black/10 text-brand-black'
              }`}>
                <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                  Édition Souveraine — Congo & zone CEMAC
                </span>
              </div>

              <h1 className={`font-display font-black text-4xl sm:text-5xl lg:text-[62px] leading-[0.95] tracking-tighter uppercase ${
                isDarkMode ? 'text-white' : 'text-brand-black'
              }`}>
                L'application de paiement <br />
                <span className="text-transparent" style={{ WebkitTextStroke: isDarkMode ? '1.5px #FFFFFF' : '1.5px #111111' }}>
                  qui unifie l'Afrique
                </span> <br />
                centrale.
              </h1>

              <p className={`text-base sm:text-lg max-w-xl font-normal leading-relaxed ${
                isDarkMode ? 'text-white/60' : 'text-brand-black/60'
              }`}>
                Conçu pour les commerçants de Brazzaville et de la CEMAC. MidPay unifie la tontine, le MTN MoMo, l'Airtel Money et les règlements interbancaires régionaux dans un portefeuille unique sur votre terminal smartphone.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('smartphone-demo');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FFD60A] text-brand-black font-display font-black text-sm px-8 py-4 rounded-xl yellow-glow-md hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
                >
                  Découvrir l'application mobile
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onGoToDeveloper}
                  className={`w-full sm:w-auto flex items-center justify-center gap-1.5 bg-transparent border font-display font-bold text-sm px-8 py-4 rounded-xl hover:scale-[1.02] transition cursor-pointer ${
                    isDarkMode 
                      ? 'border-white/10 hover:border-brand-yellow/30 text-white' 
                      : 'border-black/15 hover:border-brand-yellow/60 text-brand-black'
                  }`}
                >
                  Ouvrir l'Espace Développeurs
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Core quick summary stats */}
              <div className={`grid grid-cols-3 gap-6 pt-6 border-t w-full text-center lg:text-left ${
                isDarkMode ? 'border-white/5 text-white/40' : 'border-black/5 text-brand-black/40'
              }`}>
                <div>
                  <div className={`text-lg font-display font-black ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>99.8%</div>
                  <div className="text-[10px] uppercase font-mono tracking-tight">Taux de Ralliaison</div>
                </div>
                <div>
                  <div className={`text-lg font-display font-black ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>0.45%</div>
                  <div className="text-[10px] uppercase font-mono tracking-tight">Frais MoMo Fixes</div>
                </div>
                <div>
                  <div className={`text-lg font-display font-black ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>240ms</div>
                  <div className="text-[10px] uppercase font-mono tracking-tight">Compensation BZV</div>
                </div>
              </div>

            </div>

            {/* Hero Right Visual Column - Human Energy Picture */}
            <div className="lg:col-span-5 relative w-full flex flex-col items-center">
              
              {/* Floating aesthetic card overlay */}
              <div className={`absolute -top-6 -left-6 z-20 p-4 rounded-2xl border flex items-center gap-3 backdrop-blur-md shadow-xl ${
                isDarkMode ? 'bg-[#1E1E1E]/85 border-white/10 text-white' : 'bg-white/90 border-black/10 text-brand-black'
              }`}>
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 font-bold">
                  BZV
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#FFD60A] uppercase font-bold tracking-widest">En direct de Poto-Poto</div>
                  <div className="text-xs font-bold font-sans">99,9% Opérationnel</div>
                </div>
              </div>

              {/* Majestic main portrait of African Merchant smiling with telephone */}
              <div className={`relative w-full max-w-sm aspect-square rounded-[36px] overflow-hidden border-4 shadow-2xl ${
                isDarkMode ? 'border-[#1E1E1E]' : 'border-white'
              }`}>
                <img 
                  src={merchantImg} 
                  alt="Sona Mode Boutique, Marché de Poto-Poto, Brazzaville" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual gradient cover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                
                {/* Quote details */}
                <div className="absolute bottom-6 inset-x-6 text-white font-sans text-xs">
                  <div className="bg-brand-yellow text-brand-black font-mono font-bold text-[8.5px] uppercase px-2 py-0.5 rounded inline-block mb-2">
                    MARCHAND MIDPAY CERTIFIÉ
                  </div>
                  <p className="italic text-white/90 leading-normal">
                    "Plus de manipulation d'espèces. Mes clientes valident leur paiement MTN Mobile Money en un clic devant ma boutique."
                  </p>
                  <p className="font-bold text-[#FFD60A] text-[11px] mt-2 font-mono uppercase tracking-widest">
                    Pauline Sona, Propriétaire
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ================= PORQUOI MIDPAY SECTION (ADVANTAGES) ================= */}
      <section className={`py-20 border-b ${
        isDarkMode ? 'bg-brand-dark-gray/30 border-white/5' : 'bg-brand-soft-gray border-black/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Header block */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFD60A] bg-brand-black px-3 py-1 rounded-full uppercase">
              Changer d'Époque
            </span>
            <h2 className={`font-display font-black text-3xl sm:text-4xl mt-4 tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
              Bâtir la souveraineté financière
            </h2>
            <p className={`text-sm sm:text-base mt-2 leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
              MidPay n'est pas qu'une application de transferts, c'est l'unification commerciale qui donne aux marchands africains les mêmes armes que les géants mondiaux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Advantage 1 */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-between ${
              isDarkMode ? 'bg-[#1E1E1E] border-white/5 text-white' : 'bg-white border-black/5 text-brand-black shadow-sm'
            }`}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-yellow/15 text-brand-yellow flex items-center justify-center">
                  <Zap className="w-6 h-6 text-brand-yellow" />
                </div>
                <h3 className="font-display font-black text-lg uppercase tracking-tight">Fragmentation vaincue</h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
                  Fini le cauchemar de gérer deux téléphones différents pour MTN MoMo d'un côté et Airtel Money de l'autre. Vos clients règlent sur un qr code ou par push unique, et tout atterrit instantanément dans le même coffre-fort.
                </p>
              </div>
              <div className="font-mono text-[10px] text-green-500 font-bold mt-6">
                INTÉGRATION NATIVE CEMAC
              </div>
            </div>

            {/* Advantage 2 */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-between ${
              isDarkMode ? 'bg-[#1E1E1E] border-white/5 text-white' : 'bg-white border-black/5 text-brand-black shadow-sm'
            }`}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-yellow/15 text-brand-yellow flex items-center justify-center">
                  <Shield className="w-6 h-6 text-brand-yellow" />
                </div>
                <h3 className="font-display font-black text-lg uppercase tracking-tight">Cartes Virtuelles & Internationales</h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
                  Générez des cartes de débit virtuelles instantanées pour vos publicités Facebook Ads, Netflix ou achats internationaux. Approvisionnez-les directement à l'aide de votre solde MTN MoMo ou Airtel Money Congo.
                </p>
              </div>
              <div className="font-mono text-[10px] text-[#FFD60A] font-bold mt-6">
                ZÉRO COMPTE BANCAIRE REQUIS
              </div>
            </div>

            {/* Advantage 3 */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-between ${
              isDarkMode ? 'bg-[#1E1E1E] border-white/5 text-white' : 'bg-white border-black/5 text-brand-black shadow-sm'
            }`}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-yellow/15 text-brand-yellow flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-brand-yellow" />
                </div>
                <h3 className="font-display font-black text-lg uppercase tracking-tight">Zéro file d'attente</h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
                  N'attendez plus jamais de faire la queue pendant des heures dans une agence bancaire physique au Centre-ville ou chez un agent intermédiaire portuaire pour transférer de l'argent ou payer des salaires. Tout se configure depuis votre téléphone mobile.
                </p>
              </div>
              <div className="font-mono text-[10px] text-green-500 font-bold mt-6">
                OPÉRATIONS TEMPS RÉEL (24/7)
              </div>
            </div>

          </div>

          {/* Testimonial Section with a second real African picture */}
          <div className={`mt-16 border rounded-[32px] overflow-hidden transition ${
            isDarkMode ? 'bg-brand-black border-white/5' : 'bg-white border-black/10 shadow-lg'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              
              {/* Photo section */}
              <div className="lg:col-span-4 h-80 relative select-none">
                <img 
                  src={professionalImg} 
                  alt="Arnold Makosso, Concepteur Freelance, Brazzaville" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/80 lg:to-transparent" />
              </div>

              {/* Text quote info */}
              <div className="lg:col-span-8 p-8 sm:p-10 space-y-4">
                <div className="flex items-center gap-1.5 text-brand-yellow">
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                    Avis des Prestataires locaux
                  </span>
                </div>
                <p className={`text-sm sm:text-base italic leading-relaxed ${isDarkMode ? 'text-white/85' : 'text-brand-black/85'}`}>
                  "En tant que consultant digital indépendant à Brazzaville, je galérais à me faire régler par mes clients basés à Kinshasa. Avec le système transfrontalier de MidPay, les conversions se font à taux officiel direct. Les fonds se reversent directement sur ma carte en métal, et je retire sans frais aux guichets."
                </p>
                <div>
                  <div className={`font-display font-black text-sm uppercase ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                    Arnold Makosso
                  </div>
                  <div className={`text-[10px] font-mono ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>
                    Développeur Freelance s'exportant dans la région CEMAC / Kinshasa
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ================= SMARTPHONE MOCKUP MOBILE ACTION SHOWCASE ================= */}
      <section id="smartphone-demo" className="py-24 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column (7 Columns) */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFD60A] bg-brand-black px-3 py-1 rounded-full uppercase">
                  Tableau de bord de poche
                </span>
                <h2 className={`font-display font-black text-3xl sm:text-4xl uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                  L'application mobile en direct
                </h2>
                <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
                  Explorez et interagissez avec la simulation de l'application smartphone MidPay. Cliquez sur les boutons de navigation à droite pour basculer d'écran et voir à quel point l'expérience marchande est fluide.
                </p>
              </div>

              {/* Dynamic screen choice selector tabs */}
              <div className="space-y-3">
                <span className={`text-[10px] font-mono font-bold uppercase block tracking-wider ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>
                  SÉLECTIONNEZ UN ÉCRAN DE DÉMONSTRATION SUR LE MOBILE :
                </span>
                
                <div className="space-y-2">
                  {/* Screen A */}
                  <button 
                    onClick={() => { setPhoneScreen('balance'); setIsQrPaid(false); }}
                    className={`w-full max-w-md p-4 rounded-2xl text-left border flex items-center gap-4 transition cursor-pointer ${
                      phoneScreen === 'balance' 
                        ? 'bg-[#FFD60A]/10 border-[#FFD60A]' 
                        : isDarkMode ? 'bg-brand-black hover:bg-white/5 border-white/5' : 'bg-brand-soft-gray hover:bg-black/5 border-transparent shadow-sm'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${phoneScreen === 'balance' ? 'bg-[#FFD60A] text-brand-black' : isDarkMode ? 'bg-white/5 text-white/50' : 'bg-black/5 text-brand-black/60'}`}>
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>Tableau de Bord & Solde Consolidé</div>
                      <p className={`text-[10px] mt-0.5 leading-normal ${isDarkMode ? 'text-white/45' : 'text-brand-black/45'}`}>Visualisez l'état de vos réserves Airtel Money, MTN MoMo et tontines locales.</p>
                    </div>
                  </button>

                  {/* Screen B */}
                  <button 
                    onClick={() => { setPhoneScreen('qr'); setIsQrPaid(false); }}
                    className={`w-full max-w-md p-4 rounded-2xl text-left border flex items-center gap-4 transition cursor-pointer ${
                      phoneScreen === 'qr' 
                        ? 'bg-[#FFD60A]/10 border-[#FFD60A]' 
                        : isDarkMode ? 'bg-brand-black hover:bg-white/5 border-white/5' : 'bg-brand-soft-gray hover:bg-black/5 border-transparent shadow-sm'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${phoneScreen === 'qr' ? 'bg-[#FFD60A] text-brand-black' : isDarkMode ? 'bg-white/5 text-white/50' : 'bg-black/5 text-brand-black/60'}`}>
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>Terminal de paiement QR Code</div>
                      <p className={`text-[10px] mt-0.5 leading-normal ${isDarkMode ? 'text-white/45' : 'text-brand-black/45'}`}>Générez instantanément des codes de paiement universels pour vos boutiques.</p>
                    </div>
                  </button>

                  {/* Screen C */}
                  <button 
                    onClick={() => { setPhoneScreen('momo'); setIsQrPaid(false); }}
                    className={`w-full max-w-md p-4 rounded-2xl text-left border flex items-center gap-4 transition cursor-pointer ${
                      phoneScreen === 'momo' 
                        ? 'bg-[#FFD60A]/10 border-[#FFD60A]' 
                        : isDarkMode ? 'bg-brand-black hover:bg-white/5 border-white/5' : 'bg-brand-soft-gray hover:bg-black/5 border-transparent shadow-sm'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${phoneScreen === 'momo' ? 'bg-[#FFD60A] text-brand-black' : isDarkMode ? 'bg-white/5 text-white/50' : 'bg-black/5 text-brand-black/60'}`}>
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>Demandes de Débit Push Direct</div>
                      <p className={`text-[10px] mt-0.5 leading-normal ${isDarkMode ? 'text-white/45' : 'text-brand-black/45'}`}>Envoyez directement une invitation de paiement sécurisée sans contact.</p>
                    </div>
                  </button>
                </div>

              </div>

            </div>

            {/* Right Smartphone Container Column (5 Columns) */}
            <div className="lg:col-span-6 flex items-center justify-center relative">
              
              {/* Outer decorative ring lights */}
              <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[420px] h-[420px] rounded-full blur-[100px] bg-brand-yellow/10 pointer-events-none" />

              {/* Smartphone Mockup element */}
              <div className="relative w-full max-w-[310px] h-[610px] bg-black border-[9px] border-[#2c2d2f] rounded-[48px] shadow-2xl overflow-hidden flex flex-col">
                
                {/* Speaker pill notch */}
                <div className="absolute top-3 left-[50%] -translate-x-[50%] w-24 h-4 bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-10 h-1 bg-white/20 rounded-full" />
                </div>

                {/* Simulated Screen Interface content block */}
                <div className="flex-1 bg-[#0A0A0B] text-white p-4 pt-10 flex flex-col justify-between relative overflow-hidden font-sans">
                  
                  {/* Top Status Header inside dynamic screen */}
                  <div className="flex justify-between items-center text-[9px] font-mono text-white/40 mb-4">
                    <span>MIDPAY NET v2.6</span>
                    <span className="flex items-center gap-1.5 text-green-500 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      RÉSEAU CONGO OK
                    </span>
                  </div>

                  {/* SCREEN RENDERS DEPENDING ON SELECTOR */}
                  <div className="flex-1 flex flex-col justify-between">
                    
                    {/* Screen 1: Balance View */}
                    {phoneScreen === 'balance' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-4 flex-1 flex flex-col justify-between pb-4"
                      >
                        {/* Upper app balance card */}
                        <div className="space-y-1">
                          <span className="text-[8px] font-mono uppercase tracking-widest text-white/40 block">Solde Consolidé Actuel</span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-display font-black text-white">454.800</span>
                            <span className="text-brand-yellow text-xs font-bold">FCFA</span>
                          </div>
                          <span className="text-[8px] font-mono text-white/40 block">742,00 USD (Taux Central Étalon)</span>
                        </div>

                        {/* Middle Operator details bar */}
                        <div className="space-y-1.5 bg-[#141416] p-2.5 rounded-xl border border-white/5">
                          <div className="text-[7.5px] font-mono uppercase text-white/30 block mb-1">Détail des réserves mobile money</div>
                          
                          <div className="flex justify-between items-center text-[10px]">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                              <span>MTN MoMo</span>
                            </div>
                            <span className="font-bold">214.500 FCFA</span>
                          </div>

                          <div className="flex justify-between items-center text-[10px]">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              <span>Airtel Money</span>
                            </div>
                            <span className="font-bold">180.300 FCFA</span>
                          </div>

                          <div className="flex justify-between items-center text-[10px] text-green-400">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              <span>Réserve Carte</span>
                            </div>
                            <span className="font-bold">60.000 FCFA</span>
                          </div>
                        </div>

                        {/* Simple list of simulated app transactions inside phone */}
                        <div className="space-y-1.5">
                          <div className="text-[8px] font-bold text-white/40 uppercase font-mono">Dernières rentrées de débits</div>
                          
                          <div className="p-2 bg-white/5 rounded-lg flex justify-between items-center text-[10px]">
                            <div>
                              <div className="font-bold truncate max-w-[120px]">Boutique Mode Sona</div>
                              <div className="text-[8px] text-white/40">MTN MoMo • 14:15</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-green-400">+12.500 F</div>
                              <div className="text-[7px] text-white/30">ID:9021-CG</div>
                            </div>
                          </div>

                          <div className="p-2 bg-white/5 rounded-lg flex justify-between items-center text-[10px]">
                            <div>
                              <div className="font-bold truncate max-w-[120px]">Arnold Makosso</div>
                              <div className="text-[8px] text-white/40">Airtel • 11:08</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-green-400">+45.000 F</div>
                              <div className="text-[7px] text-white/30">ID:4124-CG</div>
                            </div>
                          </div>
                        </div>

                      </motion.div>
                    )}

                    {/* Screen 2: QR Payment generator */}
                    {phoneScreen === 'qr' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-4 flex-1 flex flex-col justify-between pb-2"
                      >
                        <div className="text-center space-y-1">
                          <span className="text-[8px] font-mono uppercase tracking-widest text-[#FFD60A] block">Borne de Paiement QR</span>
                          <div className="text-xs font-bold">Générateur Universel de Débit</div>
                        </div>

                        {/* Beautiful simulated vector QR card */}
                        <div className="bg-white p-3.5 rounded-2xl mx-auto border border-white/10 flex flex-col items-center justify-center w-36 h-36 relative">
                          {isQrPaid ? (
                            <motion.div 
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="absolute inset-0 bg-green-500 rounded-2xl flex flex-col items-center justify-center text-white p-2 text-center"
                            >
                              <CheckCircle2 className="w-8 h-8 text-white mb-1.5 animate-bounce" />
                              <div className="font-bold text-[10px] uppercase">Règlement validé !</div>
                              <div className="text-[7px] text-white/80 font-mono mt-1">Ref: {Math.floor(100000 + Math.random() * 900000)}</div>
                            </motion.div>
                          ) : null}

                          <svg className="w-28 h-28 text-black" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                            {/* Handcrafted precise looking QR pixels */}
                            <path d="M0,0 h30 v30 h-30 z M0,10 h10 v10 h-10 z" strokeWidth="2" />
                            <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" strokeWidth="2" />
                            <path d="M0,70 h30 v30 h-30 z M0,80 h10 v10 h-10 z" strokeWidth="2" />
                            <rect x="40" y="40" width="20" height="20" fill="currentColor" opacity="0.15" />
                            <path d="M45,10 h10 M35,45 h15 M55,55 h10 M15,45 h5 M80,45 h10 M45,80 h10 M80,80 h10" strokeWidth="3" />
                          </svg>
                        </div>

                        <div className="text-center space-y-2">
                          <div className="font-mono text-xs font-black text-white">
                            {simulatedPaymentAmount.toLocaleString()} FCFA
                          </div>
                          
                          {/* Payment triggers */}
                          {!isQrPaid && (
                            <button
                              onClick={triggerMockPayment}
                              className="w-full py-2 bg-[#FFD60A] text-brand-black font-semibold text-[10px] rounded-lg transition uppercase tracking-widest cursor-pointer hover:bg-yellow-400"
                            >
                              Simuler le scan d'un client
                            </button>
                          )}
                          
                          <p className="text-[7.5px] font-mono text-white/40">Vos clients scannent ce QR code universel à l'aide de leur propre téléphone portable pour déclencher MTN MoMo ou Airtel Money.</p>
                        </div>
                      </motion.div>
                    )}

                    {/* Screen 3: Momo Push Request */}
                    {phoneScreen === 'momo' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-4 flex-1 flex flex-col justify-between pb-2"
                      >
                        <div className="text-center space-y-1">
                          <span className="text-[8px] font-mono uppercase tracking-widest text-white/40 block">Paiement sans contact direct</span>
                          <div className="text-xs font-bold">Demander un Débit Push</div>
                        </div>

                        <div className="space-y-2.5">
                          <div>
                            <span className="text-[7px] font-mono text-white/40 block uppercase">Opérateur de Cible</span>
                            <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center text-[10px]">
                              <span>MTN Mobile Money Congo</span>
                              <span className="w-2 h-2 rounded-full bg-yellow-500 shadow" />
                            </div>
                          </div>

                          <div>
                            <span className="text-[7px] font-mono text-white/40 block uppercase">Numéro de Téléphone Client</span>
                            <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-[10px] font-mono">
                              +242 06 512 8990
                            </div>
                          </div>

                          <div>
                            <span className="text-[7px] font-mono text-white/40 block uppercase">Valeur Facturée</span>
                            <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-[10px] font-mono font-bold">
                              15.000 FCFA
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-center">
                          {isQrPaid ? (
                            <div className="p-2 bg-green-500/10 border border-green-500/20 text-green-500 text-[9px] font-mono font-bold rounded-lg leading-relaxed">
                              PUSH DE DÉBIT TRANSMIS ! <br />
                              En attente de la saisie du code PIN par le client sur son terminal mobile.
                            </div>
                          ) : (
                            <button
                              onClick={triggerMockPayment}
                              className="w-full py-2.5 bg-[#FFD60A] hover:bg-yellow-400 text-brand-black font-semibold text-[10px] rounded-lg transition uppercase tracking-widest cursor-pointer"
                            >
                              Envoyer l'invitation Push
                            </button>
                          )}
                          <p className="text-[7px] font-mono text-white/40 leading-normal">L'invitation de débit pousse instantanément le code PIN requis sur l'écran du client dans la rue.</p>
                        </div>
                      </motion.div>
                    )}

                  </div>

                  {/* Navigation Pill indicator of mockup inside phone */}
                  <div className="flex justify-around border-t border-white/5 pt-3 mt-4 text-[9px] text-white/35 font-semibold">
                    <span className={phoneScreen === 'balance' ? 'text-[#FFD60A]' : ''}>Rapports</span>
                    <span className={phoneScreen === 'qr' ? 'text-[#FFD60A]' : ''}>Borne QR</span>
                    <span className={phoneScreen === 'momo' ? 'text-[#FFD60A]' : ''}>Facturation</span>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= PHYSICAL METAL CARD CUSTOMIZER (INTEGRATED) ================= */}
      <VirtualCards 
        cardConfig={cardConfig}
        setCardConfig={setCardConfig}
        isDarkMode={isDarkMode}
      />


      {/* ================= RIVER BRIDGE CROSSING (INTEGRATED) ================= */}
      <CongoBridge isDarkMode={isDarkMode} />


      {/* ================= CALL TO ACTION BANNER ================= */}
      <section className={`py-20 text-center relative overflow-hidden transition-colors ${
        isDarkMode ? 'bg-[#111111]' : 'bg-brand-soft-gray border-t border-black/5'
      }`}>
        {/* Glow point */}
        <div className="absolute inset-[15%] w-[400px] h-[400px] rounded-full blur-[120px] bg-brand-yellow/10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFD60A] uppercase bg-black px-3 py-1 rounded-full border border-white/5">
            Établi à Brazzaville
          </span>
          <h2 className={`font-display font-black text-3xl sm:text-4xl uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
            Prêt à moderniser votre infrastructure ?
          </h2>
          <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
            Rejoignez Pauline, Arnold et les milliers de marchands de la république du Congo qui font grandir leur tontine et leurs comptes instantanément sur notre nœud.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={() => {
                const el = document.getElementById('cards');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-[#FFD60A] text-brand-black font-display font-black text-sm rounded-xl yellow-glow-md cursor-pointer hover:bg-yellow-400"
            >
              Commander ma carte physique
            </button>
            <button
              onClick={onGoToDeveloper}
              className={`w-full sm:w-auto px-8 py-4 bg-transparent border font-display font-bold text-sm rounded-xl cursor-pointer ${
                isDarkMode 
                  ? 'border-white/10 hover:border-[#FFD60A]/35 text-white' 
                  : 'border-black/20 hover:border-[#FFD60A]/60 text-brand-black'
              }`}
            >
              Tester l'API Bac à Sable
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
