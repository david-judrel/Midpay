import React from 'react';
import { Globe, Shield, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className={`py-16 px-4 sm:px-6 relative overflow-hidden select-none border-t transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#111111] text-white border-white/5' 
        : 'bg-[#111111] text-white border-black/10'
    }`}>
      
      {/* Decorative ambient background orb */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-yellow/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/5 pb-12 mb-12">
          
          {/* Logo brand pitch (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FFD60A] flex items-center justify-center font-display font-black text-brand-black text-lg">
                M
              </div>
              <span className="font-display font-black text-xl tracking-tight text-white">
                MID<span className="text-brand-yellow">PAY</span>
              </span>
            </div>

            <p className="text-white/40 text-xs sm:text-sm max-w-sm leading-relaxed font-sans">
              MidPay est la plateforme financière africaine de nouvelle génération brevetée à Brazzaville, Congo. Nous fournissons des canaux de facturation mobile optimisés et une compensation transfrontalière souveraine au sein de la zone CEMAC.
            </p>

            {/* Quick platform status */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1 rounded-full font-mono text-[9px] text-[#FFD60A]">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
              Cœur de routage souverain CEMAC opérationnel
            </div>
          </div>

          {/* Map Columns (7 Cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1 */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono font-bold tracking-widest text-[#FFD60A] uppercase">
                Gamme Solutions
              </div>
              <ul className="space-y-2 text-xs text-white/55 font-medium">
                <li>
                  <button onClick={() => handleScrollToSection('sandbox')} className="hover:text-white transition cursor-pointer">
                    Bac à sable démo
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection('cards')} className="hover:text-white transition cursor-pointer">
                    Cartes Hybrides
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection('developer')} className="hover:text-white transition cursor-pointer">
                    Console API Développeurs
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection('bridge')} className="hover:text-white transition cursor-pointer">
                    Pont Transfrontalier
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono font-bold tracking-widest text-[#FFD60A] uppercase">
                Conformité & Normes
              </div>
              <ul className="space-y-2 text-xs text-white/55 font-medium font-mono">
                <li className="flex items-center gap-1">
                  <span>Régulation COBAC</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30" />
                </li>
                <li className="flex items-center gap-1">
                  <span>Directives CEMAC</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30" />
                </li>
                <li><span>PCI-DSS Niveau 1 Auditée</span></li>
                <li><span>ISO 27001 Certifiée</span></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <div className="text-[10px] font-mono font-bold tracking-widest text-[#FFD60A] uppercase">
                Siège Brazzaville
              </div>
              <p className="text-xs text-white/40 leading-relaxed font-mono">
                Avenue Amilcar Cabral, <br />
                Centre-ville, Brazzaville, <br />
                République du Congo
              </p>
              <div className="text-[9px] text-[#FFD60A] font-mono uppercase bg-[#FFD60A]/10 py-0.5 px-2 rounded inline-block">
                Tél : +242 06 512 8990
              </div>
            </div>

          </div>

        </div>

        {/* Bottom audit legal signature and terms */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] font-mono text-white/35">
          <div className="text-center sm:text-left space-y-1">
            <div>
              &copy; {currentYear} MidPay S.A. Tous droits réservés. Enregistré sous les régulations de la COBAC en Afrique Centrale.
            </div>
            <div className="text-[9px]">
              MidPay est un éditeur de solutions de compensation fintech et non une banque commerciale souveraine. Les cartes hybrides de débit sont émises en partenariat avec des institutions bancaires agréées Visa/Mastercard.
            </div>
          </div>

          <div className="flex gap-4 items-center shrink-0">
            <Globe className="w-3.5 h-3.5 text-[#FFD60A]" />
            <span>UTC 2026</span>
            <span className="text-white/10">|</span>
            <div className="flex items-center gap-1 text-[9px] bg-white/5 px-2.5 py-0.5 rounded border border-white/5">
              <Shield className="w-3 h-3 text-[#FFD60A]" /> Souveraineté Économique du Congo
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
