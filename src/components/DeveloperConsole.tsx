import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, Copy, Check, Play, FileCode, RefreshCw } from 'lucide-react';

interface DeveloperConsoleProps {
  isDarkMode: boolean;
}

export default function DeveloperConsole({ isDarkMode }: DeveloperConsoleProps) {
  const [activeTab, setActiveTab] = useState<'curl' | 'nodejs' | 'python'>('curl');
  const [copied, setCopied] = useState(false);
  const [apiLogs, setApiLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [payloadOutput, setPayloadOutput] = useState<string | null>(null);

  const codeSnippets = {
    curl: `curl -X POST "https://api.midpay.com/v1/payments" \\
  -H "Authorization: Bearer sec_live_brazza_7820xk" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sender_phone": "+242065128990",
    "recipient_name": "Jean Ngolo",
    "amount": 15000,
    "currency": "XAF",
    "channel": "MTN_MOMO",
    "optimize_route": true
  }'`,
    
    nodejs: `import { MidPayClient } from '@midpay/node';

const midpay = new MidPayClient({ 
  apiKey: 'sec_live_brazza_7820xk' 
});

const payment = await midpay.payments.create({
  senderPhone: '+242065128990',
  recipientName: 'Jean Ngolo',
  amount: 15000,
  currency: 'XAF',
  channel: 'MTN_MOMO',
  optimizeRoute: true
});

console.log(\`Ref: \${payment.reference_code} settled!\`);`,

    python: `import midpay

midpay.api_key = "sec_live_brazza_7820xk"

payment = midpay.Payment.create(
    sender_phone="+242065128990",
    recipient_name="Jean Ngolo",
    amount=15000,
    currency="XAF",
    channel="MTN_MOMO",
    optimize_route=True
)

print(f"Status settled: {payment.reference_code}")`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runApiTest = () => {
    setIsRunning(true);
    setApiLogs([]);
    setPayloadOutput(null);

    const steps = [
      '>> Connexion au serveur api.midpay.com [port 443]',
      '>> POST /v1/payments (Chiffrement sécurisé TLS 1.3)',
      '>> Validation de la clé sec_live_... OK',
      '>> Résolution de la route MTN MoMo en République du Congo...',
      '>> Compensation réglementaire via le protocole COBAC...'
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      setApiLogs(prev => [...prev, steps[stepIdx]]);
      stepIdx++;

      if (stepIdx >= steps.length) {
        clearInterval(interval);
        
        // Output result payload
        setPayloadOutput(JSON.stringify({
          status: "success",
          reference_code: `MP-MOM-TX-${Math.floor(100000 + Math.random() * 900000)}`,
          channel_routed: "MTN_MOMO_CG",
          original_value: 15000,
          currency: "XAF",
          network_latency: "189ms",
          fee_charged: 67.5,
          cleared_cobac: true,
          timestamp: new Date().toISOString()
        }, null, 2));
        
        setIsRunning(false);
      }
    }, 550);
  };

  return (
    <section 
      id="developer" 
      className={`relative py-20 select-none border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-brand-deep-dark text-white border-white/5' 
          : 'bg-[#F2F2F7] text-brand-black border-black/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Module Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFD60A] bg-brand-black px-3 py-1 rounded-full uppercase">
              Écosystème Développeur
            </span>
            <h2 className={`font-display font-black text-3xl sm:text-4xl mt-4 tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
              Une API unique pour la CEMAC
            </h2>
            <p className={`text-sm sm:text-base mt-2 leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
              Évitez les intégrations complexes avec chaque opérateur de télécom local. MidPay unifie MTN MoMo, Airtel Money, Visa, Mastercard et les virements interbancaires régionaux.
            </p>
          </div>
          
          <div className={`flex items-center gap-2 text-xs font-mono p-2.5 border rounded-xl ${
            isDarkMode ? 'bg-[#1E1E1E] border-white/10 text-white/90' : 'bg-white border-black/10 text-brand-black/80 shadow-sm'
          }`}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-bold">Disponibilité Congo : 99,99%</span>
          </div>
        </div>

        {/* API Code Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Code Viewer (Left 6 Columns) */}
          <div className="lg:col-span-6 flex flex-col bg-brand-black rounded-3xl p-5 border border-white/5 shadow-2xl relative overflow-hidden">
            {/* Header selection tabs */}
            <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-brand-yellow" />
                <span className="font-mono text-xs text-white/50 font-bold uppercase">Exemples d'intégration</span>
              </div>

              <div className="flex gap-1 bg-white/5 p-0.5 rounded-lg border border-white/5">
                {(['curl', 'nodejs', 'python'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-mono text-[10px] px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      activeTab === tab 
                        ? 'bg-white text-brand-black font-extrabold shadow-sm' 
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Snippet box */}
            <div className="relative flex-1 font-mono text-[11px] text-white/80 p-3 bg-[#0A0A0A] rounded-xl border border-white/5 overflow-x-auto min-h-[220px]">
              <pre className="whitespace-pre">{codeSnippets[activeTab]}</pre>
              
              {/* Copy control */}
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5 rounded-lg transition cursor-pointer"
                title="Copier le code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Test Trigger */}
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
              <span className="text-[9px] font-mono text-white/40">
                Identifiants de test : sec_live_brazza...
              </span>
              <button
                onClick={runApiTest}
                disabled={isRunning}
                className="flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellow/90 font-display font-bold text-xs text-brand-black px-4 py-2.5 rounded-xl transition yellow-glow-sm disabled:opacity-50 cursor-pointer"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Lancement de la requête...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Tester l'appel API en direct
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Glowing Terminal Monitor Output (Right 6 Columns) */}
          <div className="lg:col-span-6 flex flex-col bg-[#0F0F0F] rounded-3xl p-5 border border-white/5 shadow-2xl relative overflow-hidden text-white min-h-[350px]">
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-4 font-mono text-xs">
              <span className="font-extrabold text-brand-yellow tracking-widest uppercase flex items-center gap-1.5 text-[10px]">
                <TerminalIcon className="w-4 h-4 text-brand-yellow" />
                Console de Réponse API
              </span>
              <span className="text-white/40 text-[9px]">CADRE DE CONTRÔLE</span>
            </div>

            {/* Terminal contents */}
            <div className="flex-1 font-mono text-[11px] text-white/70 space-y-3.5 overflow-y-auto max-h-[300px]">
              {apiLogs.length === 0 && !isRunning && !payloadOutput && (
                <div className="h-full flex flex-col items-center justify-center text-center text-white/20 py-12 px-6">
                  <TerminalIcon className="w-10 h-10 text-white/5 mb-3" />
                  <p className="font-sans text-xs">Aucune requête API émise. Cliquez sur "Tester l'appel API en direct" pour examiner le payload retourné par le nœud de Brazzaville.</p>
                </div>
              )}

              {/* Steps feed */}
              <div className="space-y-1">
                {apiLogs.map((log, index) => (
                  <div key={index} className="text-white/50 text-[11px]">
                    {log}
                  </div>
                ))}
              </div>

              {/* Response output */}
              <AnimatePresence>
                {payloadOutput && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-3 bg-brand-black/90 text-brand-yellow border border-yellow-500/10 rounded-lg text-[10.5px] leading-relaxed relative"
                  >
                    <span className="absolute top-2 right-2 bg-brand-yellow/10 text-brand-yellow px-1.5 py-0.5 rounded text-[8px] font-bold border border-yellow-500/20">
                      HTTP/1.1 200 OK
                    </span>
                    <pre className="whitespace-pre-wrap overflow-x-auto">{payloadOutput}</pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Developer credentials warning */}
            <div className="border-t border-white/5 pt-3.5 mt-4 text-[9px] font-mono text-white/30 flex items-center justify-between">
              <span>NIVEAU DE SÉCURITÉ : COBAC CHIFFRÉ</span>
              <span className="font-semibold text-brand-yellow">PASSERELLE CONGO OPÉRATIONNELLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
