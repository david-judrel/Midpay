import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, CreditCard, Server, Search, Filter, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';
import { SimulatedTransaction, PaymentChannel } from '../types';

interface LiveTransactionsProps {
  transactions: SimulatedTransaction[];
  isDarkMode: boolean;
}

export default function LiveTransactions({ transactions, isDarkMode }: LiveTransactionsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannelFilter, setSelectedChannelFilter] = useState<'All' | PaymentChannel>('All');

  // Stats calculation
  const totalVolume = transactions.reduce((acc, current) => acc + current.amount, 0);
  const averageLatency = "197ms";
  const successRate = "99,85%";

  // Filters application
  const filteredTxs = transactions.filter(tx => {
    const matchesSearch = 
      tx.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesChannel = 
      selectedChannelFilter === 'All' || 
      tx.channel === selectedChannelFilter;

    return matchesSearch && matchesChannel;
  });

  const getChannelIcon = (channel: PaymentChannel) => {
    switch (channel) {
      case 'MTN Mobile Money':
      case 'Airtel Money':
        return Smartphone;
      case 'Visa Card':
      case 'Mastercard':
        return CreditCard;
      default:
        return Server;
    }
  };

  const getChannelColor = (channel: PaymentChannel) => {
    switch (channel) {
      case 'MTN Mobile Money': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Airtel Money': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'Visa Card': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'Mastercard': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      default: return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
    }
  };

  return (
    <section 
      id="live-transactions" 
      className={`relative py-20 select-none border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-brand-deep-dark text-white border-white/5' 
          : 'bg-[#FFFFFF] text-brand-black border-black/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Module Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#FFD60A] bg-brand-black px-3 py-1 rounded-full uppercase">
            Transparence des Bilans de Débits
          </span>
          <h2 className={`font-display font-black text-3xl sm:text-4xl mt-4 tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
            Registre de Compensation en Direct
          </h2>
          <p className={`text-sm sm:text-base mt-2 leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-brand-black/60'}`}>
            Chaque transaction transitant par la passerelle de Brazzaville est enregistrée publiquement avec sa preuve de règlement cryptographique.
          </p>
        </div>

        {/* Dynamic Platform Stats Bento Board */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10 w-full">
          
          {/* Stat 1 */}
          <div className={`p-6 rounded-2xl border flex flex-col justify-between transition ${
            isDarkMode ? 'bg-[#1E1E1E] border-white/5' : 'bg-brand-soft-gray border-black/5 shadow-sm'
          }`}>
            <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest block ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>
              Volume global traité
            </span>
            <div className="flex items-baseline gap-2 mt-4">
              <span className={`text-2xl sm:text-3xl font-display font-black ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                {totalVolume.toLocaleString()}
              </span>
              <span className={`text-xs font-bold font-mono ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>FCFA (XAF)</span>
            </div>
            <div className="text-[10px] font-mono text-green-500 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +14.2% de croissance journalière
            </div>
          </div>

          {/* Stat 2 */}
          <div className={`p-6 rounded-2xl border flex flex-col justify-between transition ${
            isDarkMode ? 'bg-[#1E1E1E] border-white/5' : 'bg-brand-soft-gray border-black/5 shadow-sm'
          }`}>
            <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest block ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>
              Temps de traitement moyen
            </span>
            <div className={`text-2xl sm:text-3xl font-display font-black mt-4 ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
              {averageLatency}
            </div>
            <div className={`text-[10px] font-mono mt-2 flex items-center gap-1 ${isDarkMode ? 'text-white/55' : 'text-brand-black/55'}`}>
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow" /> Routage optimisé par cache périphérique
            </div>
          </div>

          {/* Stat 3 */}
          <div className={`p-6 rounded-2xl border flex flex-col justify-between transition ${
            isDarkMode ? 'bg-[#1E1E1E] border-white/5' : 'bg-brand-soft-gray border-black/5 shadow-sm'
          }`}>
            <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest block ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>
              Compensation COBAC validée
            </span>
            <div className="text-2xl sm:text-3xl font-display font-black text-green-500 mt-4">
              {successRate}
            </div>
            <div className="text-[10px] font-mono text-green-500 mt-2 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% de règlement garanti
            </div>
          </div>

        </div>

        {/* Ledger Filter and Search Bar */}
        <div id="search-filter-panel" className={`p-4 border rounded-2xl mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition ${
          isDarkMode ? 'bg-[#1E1E1E] border-white/5' : 'bg-white border-black/5 shadow-sm'
        }`}>
          {/* Search box */}
          <div className={`flex items-center gap-2.5 rounded-xl px-4 py-3 flex-1 border transition ${
            isDarkMode ? 'bg-black/40 border-white/10 focus-within:border-[#FFD60A]/40' : 'bg-brand-soft-gray border-transparent focus-within:border-black/15'
          }`}>
            <Search className={`w-4 h-4 ${isDarkMode ? 'text-white/30' : 'text-brand-black/30'}`} />
            <input 
              type="text" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`bg-transparent text-sm font-semibold w-full focus:outline-none ${isDarkMode ? 'text-white' : 'text-brand-black'}`}
              placeholder="Rechercher par expéditeur, destinataire ou référence..."
            />
          </div>

          {/* Category Filters list */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
            <Filter className={`w-3.5 h-3.5 mr-1 hidden sm:block ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`} />
            
            {(['All', 'MTN Mobile Money', 'Airtel Money', 'Visa Card', 'Bank Transfer'] as const).map((filterOpt) => {
              const isSelected = selectedChannelFilter === filterOpt;
              return (
                <button
                  key={filterOpt}
                  id={`filter-opt-${filterOpt.replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedChannelFilter(filterOpt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    isSelected 
                      ? 'bg-[#FFD60A] text-brand-black' 
                      : isDarkMode 
                        ? 'bg-black/40 hover:bg-black text-white/70' 
                        : 'bg-brand-soft-gray hover:bg-black/5 text-brand-black/70'
                  }`}
                >
                  {filterOpt === 'All' ? 'Tous les canaux' : filterOpt.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Transaction Ledger Table List */}
        <div className={`rounded-2xl border overflow-hidden transition ${
          isDarkMode ? 'bg-[#1E1E1E] border-white/10' : 'bg-white border-black/5 shadow-sm'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b text-[9px] font-mono uppercase transition ${
                  isDarkMode ? 'bg-black/40 border-white/5 text-white/40' : 'bg-brand-soft-gray border-black/5 text-brand-black/40'
                }`}>
                  <th className="py-4 px-6 font-extrabold">EXPÉDITEUR / DESTINATAIRE</th>
                  <th className="py-4 px-4 font-extrabold">CANAL DE RÈGLEMENT</th>
                  <th className="py-4 px-4 font-extrabold">RÉFÉRENCE UNIQUE</th>
                  <th className="py-4 px-4 font-extrabold">HORODATAGE</th>
                  <th className="py-4 px-6 text-right font-extrabold">VALEUR COMPENSÉE</th>
                </tr>
              </thead>
              <tbody className={`divide-y text-xs transition ${isDarkMode ? 'divide-white/5' : 'divide-black/5'}`}>
                {filteredTxs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={`text-center py-12 font-mono text-xs ${isDarkMode ? 'text-white/30' : 'text-brand-black/30'}`}>
                      Aucune trame de règlement correspondante trouvée dans l'index de ce nœud.
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence initial={false}>
                    {filteredTxs.map((tx) => {
                      const Icon = getChannelIcon(tx.channel);
                      return (
                        <motion.tr 
                          key={tx.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className={`transition-colors ${isDarkMode ? 'hover:bg-white/5 text-white/90' : 'hover:bg-brand-soft-gray/35 text-brand-black'}`}
                        >
                          {/* Sender Recipient Col */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              {/* Avatar circle */}
                              <div className="w-8 h-8 rounded-lg bg-brand-black text-[#FFD60A] font-display font-black flex items-center justify-center text-[10px] shrink-0 uppercase border border-white/5">
                                {tx.senderName.slice(0, 2)}
                              </div>
                              <div>
                                <div className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>{tx.senderName}</div>
                                <div className={`text-[9px] font-semibold uppercase mt-0.5 ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>
                                  vers {tx.recipientName}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Channel Badge Col */}
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono font-bold border ${getChannelColor(tx.channel)}`}>
                              <Icon className="w-3.5 h-3.5" />
                              {tx.channel}
                            </span>
                          </td>

                          {/* Link Ref Col */}
                          <td className={`py-4 px-4 font-mono font-bold tracking-widest select-all ${isDarkMode ? 'text-white/70' : 'text-brand-black/70'}`}>
                            {tx.referenceNumber}
                          </td>

                          {/* Date Col */}
                          <td className={`py-4 px-4 font-mono text-[10px] ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>
                            {tx.timestamp} (Brazza)
                          </td>

                          {/* Sum Col */}
                          <td className="py-4 px-6 text-right">
                            <div className={`font-display font-black text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                              {tx.amount.toLocaleString()} <span className={`font-mono text-[9px] font-bold ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>XAF</span>
                            </div>
                            <div className={`text-[8.5px] font-mono mt-0.5 ${isDarkMode ? 'text-white/40' : 'text-brand-black/40'}`}>
                              Commission : {tx.fee.toLocaleString()} FCFA
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
