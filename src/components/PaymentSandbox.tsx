import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, Smartphone, Send, Server, CheckCircle2, 
  RefreshCw, Receipt, Download, Share2 
} from 'lucide-react';
import { PaymentChannel, SimulatedTransaction } from '../types';

interface PaymentSandboxProps {
  transactions: SimulatedTransaction[];
  setTransactions: React.Dispatch<React.SetStateAction<SimulatedTransaction[]>>;
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
  isDarkMode: boolean;
}

export default function PaymentSandbox({ 
  transactions, 
  setTransactions, 
  walletBalance, 
  setWalletBalance,
  isDarkMode
}: PaymentSandboxProps) {
  // Input form state
  const [senderName, setSenderName] = useState('Koffi Ndolo');
  const [recipientName, setRecipientName] = useState('Marie Olangue');
  const [phonePrefix, setPhonePrefix] = useState('+242 06'); // MTN prefix in Congo
  const [phoneSuffix, setPhoneSuffix] = useState('512 8990');
  const [amountInput, setAmountInput] = useState('15000');
  const [selectedChannel, setSelectedChannel] = useState<PaymentChannel>('MTN Mobile Money');
  
  // Simulation progress states
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [activeReceipt, setActiveReceipt] = useState<SimulatedTransaction | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [receiptSuccessMsg, setReceiptSuccessMsg] = useState<string | null>(null);

  // Channels metadata
  const channelData = [
    { name: 'MTN Mobile Money' as PaymentChannel, type: 'Mobile XAF', feePct: 0.0045, icon: Smartphone, bg: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
    { name: 'Airtel Money' as PaymentChannel, type: 'Mobile XAF', feePct: 0.0045, icon: Smartphone, bg: 'bg-red-500/10 text-red-500 border-red-500/20' },
    { name: 'Visa Card' as PaymentChannel, type: 'International', feePct: 0.012, icon: CreditCard, bg: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    { name: 'Mastercard' as PaymentChannel, type: 'International', feePct: 0.012, icon: CreditCard, bg: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
    { name: 'Bank Transfer' as PaymentChannel, type: 'Virement Congo', feePct: 0.005, icon: Server, bg: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  ];

  const currentChannelMeta = channelData.find(c => c.name === selectedChannel) || channelData[0];
  const calculatedFee = Math.round(Number(amountInput) * currentChannelMeta.feePct);

  // Quick preset fields (French optimized)
  const applyPreset = (sender: string, recipient: string, prefix: string, suffix: string, amount: string, channel: PaymentChannel) => {
    setSenderName(sender);
    setRecipientName(recipient);
    setPhonePrefix(prefix);
    setPhoneSuffix(suffix);
    setAmountInput(amount);
    setSelectedChannel(channel);
  };

  const triggerReceiptMsg = (msg: string) => {
    setReceiptSuccessMsg(msg);
    setTimeout(() => {
      setReceiptSuccessMsg(null);
    }, 3500);
  };

  const startSimulation = () => {
    const amt = parseFloat(amountInput);
    if (!senderName || !recipientName || isNaN(amt) || amt <= 0) {
      setFormError('Veuillez remplir correctement tous les paramètres de transmission avec des données valides.');
      return;
    }

    setFormError(null);
    setIsSimulating(true);
    setSimulationStep(0);
    setActiveReceipt(null);
    setSimulationLogs([]);

    // Custom steps for different channels in French
    const logs = [
      `[AUTH] Initialisation du cadre de transaction pour ${senderName}...`,
      `[ROUTING] Liaison de la passerelle de Brazzaville sur le canal ${selectedChannel}...`,
      `[INTELLIGENCE] Moteur MidPay activé : routage optimisé. Commission : XAF ${calculatedFee}`,
      `[SECURITY] Génération du token d'autorisation sécurisé...`,
      `[CLEARING] Routage cryptographique direct vers les serveurs Airtel / MTN...`,
      `[SETTLED] Paiement compensé et réglé avec succès en 197ms !`
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      setSimulationLogs(prev => [...prev, logs[currentLogIndex]]);
      setSimulationStep(prev => prev + 1);
      currentLogIndex++;

      if (currentLogIndex >= logs.length) {
        clearInterval(interval);
        
        // Finalize transaction
        const refNo = `MP-${selectedChannel.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}-CG`;
        const newTx: SimulatedTransaction = {
          id: Math.random().toString(36).substring(2, 9),
          senderName,
          recipientName,
          amount: amt,
          currency: 'XAF',
          channel: selectedChannel,
          status: 'settled',
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          referenceNumber: refNo,
          fee: calculatedFee
        };

        // Update database lists
        setTransactions(prev => [newTx, ...prev]);
        setWalletBalance(prev => prev + amt - calculatedFee);
        setActiveReceipt(newTx);
        setIsSimulating(false);
      }
    }, 850); // 850ms per step feels fluid 
  };

  return (
    <section 
      id="sandbox" 
      className={`relative py-20 select-none border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-brand-deep-dark text-white border-white/5' 
          : 'bg-[#F2F2F7] text-brand-black border-black/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#FFD60A] bg-brand-black px-3 py-1 rounded-full uppercase">
              Interface Réseau Central
            </span>
            <h2 className={`font-display font-black text-3xl sm:text-4xl mt-3 tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
              Bac à sable Multi-Moyens
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-xl font-normal ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
              Contournez la fragmentation bancaire. Testez l'intégration en temps réel des opérateurs majeurs de la sous-région (MTN MoMo, Airtel Money, réseaux interbancaires).
            </p>
          </div>

          {/* Quick presets helper in French */}
          <div className={`flex flex-wrap items-center gap-1 p-1 rounded-xl border self-start ${
            isDarkMode ? 'bg-[#1E1E1E] border-white/10' : 'bg-white border-black/10 shadow-sm'
          }`}>
            <span className={`text-[9px] font-bold px-2 font-mono uppercase ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>Gabarits :</span>
            <button 
              onClick={() => applyPreset('Jean Ombassa', 'Pauline Sona', '+242 06', '677 1221', '12500', 'MTN Mobile Money')}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition cursor-pointer ${
                isDarkMode ? 'bg-[#111111] hover:bg-white/5 text-white/85' : 'bg-brand-soft-gray hover:bg-black/5 text-brand-black/80'
              }`}
            >
              Congo MTN MoMo
            </button>
            <button 
              onClick={() => applyPreset('Brazza Transports', 'Marie Likou', '+242 05', '511 4099', '45000', 'Airtel Money')}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition cursor-pointer ${
                isDarkMode ? 'bg-[#111111] hover:bg-white/5 text-white/85' : 'bg-brand-soft-gray hover:bg-black/5 text-brand-black/80'
              }`}
            >
              Airtel Brazzaville
            </button>
            <button 
              onClick={() => applyPreset('Sarl Kintelé', 'Direction Impôts', '+242 06', '998 0055', '300000', 'Bank Transfer')}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition cursor-pointer ${
                isDarkMode ? 'bg-[#111111] hover:bg-white/5 text-white/85' : 'bg-brand-soft-gray hover:bg-black/5 text-brand-black/80'
              }`}
            >
              Virement Express Congo
            </button>
          </div>
        </div>

        {/* Sandbox Content Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Control Panel (Left 7 Columns) */}
          <div className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6 relative overflow-hidden transition-all duration-300 ${
            isDarkMode ? 'bg-[#1E1E1E] border-white/10' : 'bg-white border-black/5 shadow-black/5'
          }`}>
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFD60A]" />
            
            <div className={`flex justify-between items-center pb-4 border-b ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
              <span className={`text-[10px] font-mono font-bold uppercase ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>
                Étape 1 : Paramétrer le transfert
              </span>
              <span className="text-[9px] px-2.5 py-0.5 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full font-mono font-semibold">
                MOTEUR DE SYNCHRONISATION ACTIF
              </span>
            </div>

            {/* Inputs grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`text-[10px] font-bold block mb-1.5 uppercase font-mono ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
                  Expéditeur (Débiteur)
                </label>
                <input 
                  type="text" 
                  value={senderName} 
                  onChange={(e) => setSenderName(e.target.value)} 
                  className={`w-full border font-semibold px-4 py-3 rounded-xl transition text-sm focus:outline-none ${
                    isDarkMode 
                      ? 'bg-black/40 placeholder-white/20 border-white/10 text-white focus:border-[#FFD60A]/40' 
                      : 'bg-brand-soft-gray placeholder-black/20 border-transparent focus:border-black/15 focus:bg-white text-brand-black'
                  }`}
                  placeholder="ex. Koffi Ndolo"
                />
              </div>

              <div>
                <label className={`text-[10px] font-bold block mb-1.5 uppercase font-mono ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
                  Destinataire (Créancier)
                </label>
                <input 
                  type="text" 
                  value={recipientName} 
                  onChange={(e) => setRecipientName(e.target.value)} 
                  className={`w-full border font-semibold px-4 py-3 rounded-xl transition text-sm focus:outline-none ${
                    isDarkMode 
                      ? 'bg-black/40 placeholder-white/20 border-white/10 text-white focus:border-[#FFD60A]/40' 
                      : 'bg-brand-soft-gray placeholder-black/20 border-transparent focus:border-black/15 focus:bg-white text-brand-black'
                  }`}
                  placeholder="ex. Marie Olangue"
                />
              </div>
            </div>

            {/* Local Phone validation and Amount input in French */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-7">
                <label className={`text-[10px] font-bold block mb-1.5 uppercase font-mono ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
                  Numéro Mobile (Indicatif Congo)
                </label>
                <div className={`flex rounded-xl overflow-hidden border transition ${
                  isDarkMode ? 'bg-black/40 border-white/10 focus-within:border-[#FFD60A]/40' : 'bg-brand-soft-gray border-transparent focus-within:border-black/15'
                }`}>
                  <select 
                    value={phonePrefix} 
                    onChange={(e) => setPhonePrefix(e.target.value)}
                    className={`bg-transparent font-semibold font-mono text-xs px-3 py-3 focus:outline-none border-r ${
                      isDarkMode ? 'text-white border-white/10' : 'text-brand-black border-black/5'
                    }`}
                  >
                    <option className="bg-[#1E1E1E] text-white" value="+242 06">+242 06 (MTN)</option>
                    <option className="bg-[#1E1E1E] text-white" value="+242 05">+242 05 (Airtel)</option>
                    <option className="bg-[#1E1E1E] text-white" value="+242 04">+242 04 (Autre Congo)</option>
                  </select>
                  <input 
                    type="text" 
                    value={phoneSuffix} 
                    onChange={(e) => setPhoneSuffix(e.target.value)}
                    className={`w-full bg-transparent font-mono font-semibold px-3.5 py-3 text-sm focus:outline-none ${
                      isDarkMode ? 'text-white' : 'text-brand-black'
                    }`}
                    placeholder="512 8990"
                  />
                </div>
              </div>

              <div className="sm:col-span-5">
                <label className={`text-[10px] font-bold block mb-1.5 uppercase font-mono ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
                  Montant en FCFA (XAF)
                </label>
                <div className={`flex rounded-xl overflow-hidden border transition ${
                  isDarkMode ? 'bg-black/40 border-white/10 focus-within:border-[#FFD60A]/40' : 'bg-brand-soft-gray border-transparent focus-within:border-black/15'
                }`}>
                  <input 
                    type="number" 
                    value={amountInput} 
                    onChange={(e) => setAmountInput(e.target.value)}
                    className={`w-full bg-transparent font-bold px-4 py-3 text-sm focus:outline-none ${
                      isDarkMode ? 'text-white' : 'text-brand-black'
                    }`}
                    placeholder="15000"
                    min="1"
                  />
                  <span className={`font-mono text-[10px] font-bold flex items-center px-4 ${
                    isDarkMode ? 'bg-white/5 text-white/70' : 'bg-black/5 text-brand-black/70'
                  }`}>
                    FCFA
                  </span>
                </div>
              </div>
            </div>

            {/* Sleek Horizontal Selector for Payment Methods */}
            <div className="space-y-3">
              <label className={`text-[10px] font-bold block uppercase font-mono ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
                Étape 2 : Canal de traitement local
              </label>
              
              <div id="payment-channel-grid" className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {channelData.map((channel) => {
                  const Icon = channel.icon;
                  const isSelected = selectedChannel === channel.name;
                  return (
                    <button
                      key={channel.name}
                      id={`channel-opt-${channel.name.replace(/\s+/g, '-')}`}
                      onClick={() => setSelectedChannel(channel.name)}
                      className={`flex flex-col items-start gap-2.5 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-[#FFD60A] text-[#111111] border-[#FFD60A] shadow-md' 
                          : isDarkMode 
                            ? 'bg-[#111111] hover:bg-white/5 text-white border-white/10' 
                            : 'bg-white hover:bg-brand-soft-gray/60 text-brand-black border-black/10'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg border ${
                        isSelected 
                          ? 'bg-brand-black text-[#FFD60A] border-transparent' 
                          : channel.bg
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold truncate tracking-tight">{channel.name}</div>
                        <div className={`text-[8.5px] font-mono uppercase ${isSelected ? 'text-[#111111]/60' : isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>
                          {channel.type}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Smart Fee Calculator info */}
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono transition ${
              isDarkMode ? 'bg-[#111111] border-white/5' : 'bg-brand-soft-gray border-black/10'
            }`}>
              <div className="space-y-1">
                <span className="text-brand-black bg-[#FFD60A] font-extrabold px-2 py-0.5 rounded text-[8.5px] uppercase">
                  Routage Intelligent Actif
                </span>
                <p className={`text-[10px] mt-1 font-sans ${isDarkMode ? 'text-white/55' : 'text-brand-black/55'}`}>
                  MidPay rationalise les transactions intracongolaises sous un barème fixe réduit.
                </p>
              </div>
              <div className={`flex gap-5 sm:border-l sm:pl-6 text-right ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                <div>
                  <div className={`text-[9px] ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>COMMISSION</div>
                  <div className={`font-mono font-extrabold text-sm ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                    {(currentChannelMeta.feePct * 100).toFixed(2)}%
                  </div>
                </div>
                <div>
                  <div className={`text-[9px] ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>FRAIS ESTIMÉS</div>
                  <div className="font-mono font-extrabold text-[#FFD60A] text-sm">
                    {calculatedFee} FCFA
                  </div>
                </div>
              </div>
            </div>

            {formError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 bg-red-600/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-mono font-bold"
              >
                {formError}
              </motion.div>
            )}

            {/* Start button */}
            <button
              id="start-simulation-trigger-btn"
              onClick={startSimulation}
              disabled={isSimulating}
              className={`w-full py-4 rounded-xl font-display font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                isSimulating 
                  ? 'bg-white/5 text-white/40 cursor-not-allowed border border-white/5' 
                  : 'bg-[#FFD60A] hover:bg-[#FFD60A]/95 hover:scale-[1.01] text-brand-black font-extrabold shadow-md'
              }`}
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Routage via la boucle CEMAC...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Lancer la compensation instantanée sur le réseau
                </>
              )}
            </button>
          </div>

          {/* Intelligent Simulation Monitor (Right 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Terminal View (Always elegant Dark styled as standard for monitors) */}
            <div className="bg-[#111111] text-white rounded-3xl p-6 border border-white/5 shadow-2xl relative overflow-hidden flex-1 flex flex-col min-h-[300px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD60A]/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-center border-b border-white/5 pb-3.5 mb-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#FFD60A] font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD60A] animate-ping" />
                  Moniteur Réseau MidPay
                </span>
                <span className="text-[9px] font-mono text-white/40">
                  Nœud : Brazzaville CG-SVR
                </span>
              </div>

              {/* Logs area */}
              <div id="simulation-scroller" className="font-mono text-[11px] text-white/70 space-y-3 flex-1 overflow-y-auto pr-1">
                {simulationLogs.length === 0 && !isSimulating && (
                  <div className="h-full flex flex-col items-center justify-center text-center text-white/30 px-4 py-8">
                    <Server className="w-8 h-8 text-white/10 mb-3" />
                    <p className="font-sans text-xs">Prêt pour la simulation de transfert. Configurez vos valeurs à gauche pour observer l'acheminement localisé.</p>
                  </div>
                )}

                {isSimulating && (
                  <div className="flex items-center gap-2.5 text-[#FFD60A] animate-pulse mb-4 text-[10px] bg-white/5 p-2 rounded border border-[#FFD60A]/10">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Compensation en cours (Étape {simulationStep}/6)...</span>
                  </div>
                )}

                <AnimatePresence>
                  {simulationLogs.map((log, index) => {
                    const isLast = index === simulationLogs.length - 1;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`leading-tight flex items-start gap-2 ${
                          isLast ? 'text-[#FFD60A] font-semibold' : 'text-white/60'
                        }`}
                      >
                        <span className="text-white/30 font-bold select-none">{`>`}</span>
                        <span>{log}</span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Telemetry metadata */}
              <div className="border-t border-white/5 pt-3.5 mt-4 flex items-center justify-between text-[9px] font-mono text-white/30">
                <span>RÉSEAU DE COMPENSATION SÉCURISÉ</span>
                <span className="text-[#FFD60A] select-all font-semibold">TAUX DE REUSSITE global 99,85%</span>
              </div>
            </div>

            {/* Generated Receipt Output Visual */}
            <AnimatePresence>
              {activeReceipt && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className={`rounded-3xl p-6 border shadow-2xl space-y-4 relative transition ${
                    isDarkMode ? 'bg-[#1E1E1E] border-white/10 text-white' : 'bg-white border-black/10 text-brand-black shadow-lg'
                  }`}
                >
                  <div className={`absolute top-0 right-10 w-8 h-4 rounded-b-md border-b border-x ${
                    isDarkMode ? 'bg-[#111111] border-white/5' : 'bg-brand-soft-gray border-black/5'
                  }`} />
                  
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1.5">
                      <Receipt className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-brand-black'}`} />
                      <span className={`font-display font-extrabold text-xs tracking-wider uppercase ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                        Billet de Règlement Souverain
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-bold bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded-full">
                      COMPENSÉ
                    </span>
                  </div>

                  <div className={`border-t border-b border-dashed py-3.5 my-1.5 space-y-2.5 text-xs font-mono ${
                    isDarkMode ? 'border-white/10' : 'border-black/10'
                  }`}>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-white/40' : 'text-brand-black/40'}>RÉFÉRENCE :</span>
                      <span className="font-bold select-all">{activeReceipt.referenceNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-white/40' : 'text-brand-black/40'}>EXPÉDITEUR :</span>
                      <span className="font-bold uppercase">{activeReceipt.senderName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-white/40' : 'text-brand-black/40'}>DESTINATAIRE :</span>
                      <span className="font-bold uppercase">{activeReceipt.recipientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-white/40' : 'text-brand-black/40'}>RÉSEAU DE TRANSFERT :</span>
                      <span className="font-bold">{activeReceipt.channel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-white/40' : 'text-brand-black/40'}>LATENCE :</span>
                      <span className="font-bold text-green-500">197ms (Temps Réel)</span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between pt-1">
                    <div>
                      <div className={`text-[9px] font-mono ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>VALEUR RÉGLÉE COMPROMISE</div>
                      <div className={`text-2xl font-display font-black ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                        {activeReceipt.amount.toLocaleString()} FCFA
                      </div>
                    </div>
                    <div className={`text-right text-[9px] font-mono ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>
                      Frais de routage: {activeReceipt.fee} FCFA <br /> Net: {(activeReceipt.amount - activeReceipt.fee).toLocaleString()} FCFA
                    </div>
                  </div>

                  {/* Actions sheet in French */}
                  <div className={`pt-3 border-t space-y-2 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                    {receiptSuccessMsg && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-2 bg-green-500/15 text-green-500 text-center rounded-xl text-[10px] font-mono font-bold"
                      >
                        {receiptSuccessMsg}
                      </motion.div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        id="receipt-download-pdf-btn"
                        onClick={() => triggerReceiptMsg(`Reçu enregistré sur le serveur CG`)}
                        className={`flex items-center justify-center gap-1.5 font-bold text-[10.5px] py-2.5 rounded-xl transition cursor-pointer ${
                          isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-brand-soft-gray hover:bg-black/5 text-brand-black'
                        }`}
                      >
                        <Download className="w-3.5 h-3.5" /> Charger le PDF
                      </button>
                      <button 
                        id="receipt-direct-share-btn"
                        onClick={() => triggerReceiptMsg(`Preuve cryptographique copiée`)}
                        className={`flex items-center justify-center gap-1.5 font-bold text-[10.5px] py-2.5 rounded-xl transition cursor-pointer ${
                          isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-brand-soft-gray hover:bg-black/5 text-brand-black'
                        }`}
                      >
                        <Share2 className="w-3.5 h-3.5" /> Partager Reçu
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
