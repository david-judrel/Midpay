import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PresentationHome from './components/PresentationHome';
import PaymentSandbox from './components/PaymentSandbox';
import DeveloperConsole from './components/DeveloperConsole';
import LiveTransactions from './components/LiveTransactions';
import Footer from './components/Footer';
import { SimulatedTransaction, CustomCardConfig } from './types';
import { Cpu, Server, Terminal, LineChart } from 'lucide-react';

const initialTransactions: SimulatedTransaction[] = [
  {
    id: 'tx_p1',
    senderName: 'Pauline Sona',
    recipientName: 'Gaston Makosso',
    amount: 15400,
    currency: 'XAF',
    channel: 'MTN Mobile Money',
    status: 'settled',
    timestamp: '18:42:15',
    referenceNumber: 'MP-MTN-391054-CG',
    fee: 69
  },
  {
    id: 'tx_p2',
    senderName: 'Brazza Logistique Sarl',
    recipientName: 'Entrepôt Kintele Co',
    amount: 350000,
    currency: 'XAF',
    channel: 'Bank Transfer',
    status: 'settled',
    timestamp: '17:15:30',
    referenceNumber: 'MP-BAN-823901-CG',
    fee: 1750
  },
  {
    id: 'tx_p3',
    senderName: 'Mvoula Importations',
    recipientName: 'Airtel API Congo',
    amount: 125000,
    currency: 'XAF',
    channel: 'Airtel Money',
    status: 'settled',
    timestamp: '15:24:08',
    referenceNumber: 'MP-AIR-904122-CG',
    fee: 562
  },
  {
    id: 'tx_p4',
    senderName: 'Jean Ndolo',
    recipientName: 'Marchand de Poto-Poto',
    amount: 5000,
    currency: 'XAF',
    channel: 'MTN Mobile Money',
    status: 'settled',
    timestamp: '12:02:11',
    referenceNumber: 'MP-MTN-104922-CG',
    fee: 22
  },
  {
    id: 'tx_p5',
    senderName: 'Global SaaS Brazza Ltd',
    recipientName: 'Serveur Cloud Centre-ville',
    amount: 85000,
    currency: 'XAF',
    channel: 'Visa Card',
    status: 'settled',
    timestamp: '10:44:59',
    referenceNumber: 'MP-VIS-731908-CG',
    fee: 1020
  }
];

const initialCardConfig: CustomCardConfig = {
  holderName: 'KOFFI NDOLO',
  color: 'black',
  tier: 'Black Gold',
  number: '4850  4902  9022  4519',
  expiry: '08/31',
  cvv: '811',
  isLocked: false
};

export default function App() {
  const [viewMode, setViewMode] = useState<'presentation' | 'developer'>('presentation');
  const [transactions, setTransactions] = useState<SimulatedTransaction[]>(initialTransactions);
  const [walletBalance, setWalletBalance] = useState<number>(74850200);
  const [cardConfig, setCardConfig] = useState<CustomCardConfig>(initialCardConfig);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Sub-tabs in the developer mode
  const [devTab, setDevTab] = useState<'sandbox' | 'api' | 'transactions'>('sandbox');

  return (
    <div className={`min-h-screen antialiased transition-colors duration-350 select-none ${
      isDarkMode 
        ? 'bg-brand-deep-dark text-white selection:bg-brand-yellow selection:text-brand-black' 
        : 'bg-[#F2F2F7] text-brand-black selection:bg-brand-yellow selection:text-brand-black'
    }`}>
      
      {/* Sleek Header Switcher */}
      <Navbar 
        viewMode={viewMode}
        setViewMode={setViewMode}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <main className="min-h-screen">
        {viewMode === 'presentation' ? (
          
          /* Visual App & Solution Vitrine */
          <PresentationHome 
            cardConfig={cardConfig}
            setCardConfig={setCardConfig}
            isDarkMode={isDarkMode}
            onGoToDeveloper={() => {
              setViewMode('developer');
              setDevTab('sandbox');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

        ) : (

          /* High-Speed Sandbox and Developer Workspace Dashboard */
          <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
            
            {/* Developer Workspace Jumbotron */}
            <div className={`p-8 rounded-3xl border mb-8 transition-all ${
              isDarkMode ? 'bg-[#1E1E1E] border-white/5' : 'bg-white border-black/10 shadow-lg shadow-black/5'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFD60A] animate-pulse" />
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFD60A] uppercase">
                      ESPACE PORTAIL TECHNIQUE
                    </span>
                  </div>
                  <h1 className={`font-display font-black text-3xl sm:text-4xl uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                    Console d'Intégration Réseau
                  </h1>
                  <p className={`text-xs sm:text-sm max-w-xl font-normal ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
                    Simulez l'acheminement de vos flux de facturation sous-régionaux, testez les signatures d'API cryptographiques COBAC et observez-les s'intégrer au grand livre public de Brazzaville.
                  </p>
                </div>

                {/* Simulated live node data stats in French */}
                <div className={`grid grid-cols-2 gap-4 p-4 rounded-2xl font-mono text-xs ${
                  isDarkMode ? 'bg-black/30' : 'bg-brand-soft-gray'
                }`}>
                  <div>
                    <span className="text-[10px] opacity-45 block uppercase">Réseau d'Étalon :</span>
                    <span className="font-extrabold text-[#FFD60A]">Cemac-Bridge-v2</span>
                  </div>
                  <div>
                    <span className="text-[10px] opacity-45 block uppercase">Statut API :</span>
                    <span className="font-extrabold text-green-500">200 OK (240ms)</span>
                  </div>
                </div>
              </div>

              {/* Tab selector buttons for Developer space */}
              <div className="flex flex-wrap items-center gap-2 border-t border-white/5 mt-8 pt-6">
                <button
                  id="dev-tab-trigger-sandbox"
                  onClick={() => setDevTab('sandbox')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer ${
                    devTab === 'sandbox'
                      ? 'bg-[#FFD60A] text-brand-black shadow-md'
                      : isDarkMode ? 'bg-[#111111] hover:bg-white/5 text-white/70' : 'bg-brand-soft-gray hover:bg-black/5 text-brand-black/70'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  1. SIMULATEUR PORTATIF (MOMO & TRANSFERTS)
                </button>
                
                <button
                  id="dev-tab-trigger-api"
                  onClick={() => setDevTab('api')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer ${
                    devTab === 'api'
                      ? 'bg-[#FFD60A] text-brand-black shadow-md'
                      : isDarkMode ? 'bg-[#111111] hover:bg-white/5 text-white/70' : 'bg-brand-soft-gray hover:bg-black/5 text-brand-black/70'
                  }`}
                >
                  <Terminal className="w-4 h-4" />
                  2. TERMINAL D'APPELS API (CODES & SDK)
                </button>

                <button
                  id="dev-tab-trigger-transactions"
                  onClick={() => setDevTab('transactions')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer ${
                    devTab === 'transactions'
                      ? 'bg-[#FFD60A] text-brand-black shadow-md'
                      : isDarkMode ? 'bg-[#111111] hover:bg-white/5 text-white/70' : 'bg-brand-soft-gray hover:bg-black/5 text-brand-black/70'
                  }`}
                >
                  <Server className="w-4 h-4" />
                  3. REGISTRE EN DIRECT (GRAND LIVRE)
                </button>
              </div>
            </div>

            {/* Render selected workspace tool */}
            <div className="space-y-12">
              {devTab === 'sandbox' && (
                <div className="animate-fadeIn">
                  <PaymentSandbox 
                    transactions={transactions}
                    setTransactions={setTransactions}
                    walletBalance={walletBalance}
                    setWalletBalance={setWalletBalance}
                    isDarkMode={isDarkMode}
                  />
                </div>
              )}

              {devTab === 'api' && (
                <div className="animate-fadeIn">
                  <DeveloperConsole isDarkMode={isDarkMode} />
                </div>
              )}

              {devTab === 'transactions' && (
                <div className="animate-fadeIn">
                  <LiveTransactions transactions={transactions} isDarkMode={isDarkMode} />
                </div>
              )}
            </div>

          </div>
        )}
      </main>

      {/* High-status Corporate Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
