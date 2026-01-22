
import React from 'react';

const ShippingTrust: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="glass rounded-[3rem] p-8 md:p-12 border border-white/10 relative overflow-hidden">
          {/* Subtle background branding effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[100px] rounded-full -mr-20 -mt-20"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl space-y-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                  Partenaire Officiel
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-brand font-black text-white leading-tight">
                Livraison Simplifiée avec <br/>
                <span className="text-indigo-500">Mondial Relay</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Profitez du réseau n°1 de livraison de colis en Europe. Avec plus de 12 500 points de retrait en France, récupérez vos affiches quand vous le souhaitez, en toute liberté.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-white font-black text-xl mb-1">24h/48h</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Expédition Rapide</span>
                </div>
                <div className="flex flex-col items-center lg:items-start border-y sm:border-y-0 sm:border-x border-white/5 py-4 sm:py-0 sm:px-6">
                  <span className="text-white font-black text-xl mb-1">0,00€</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Dès 3 posters</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-white font-black text-xl mb-1">100%</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Colis Renforcé</span>
                </div>
              </div>
            </div>

            <div className="relative w-full lg:w-[450px] aspect-video bg-slate-950/50 rounded-[2.5rem] border border-white/10 p-8 flex flex-col items-center justify-center group">
              {/* Mondial Relay Logo Styled Implementation */}
              <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-[#ED1C24] rounded-2xl flex items-center justify-center shadow-2xl shadow-rose-600/20 transform group-hover:rotate-6 transition-transform">
                    <i className="fas fa-box-open text-white text-3xl"></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-3xl font-brand font-black tracking-tighter leading-none">Mondial <span className="text-[#ED1C24]">Relay</span></span>
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em] mt-1">Point Relais | Locker</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                       <i className="fas fa-check text-[10px] text-emerald-500"></i>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest animate-pulse">Suivi en temps réel activé</p>
              </div>
              
              {/* Floating Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg transform -rotate-12 border-2 border-slate-950">
                 <i className="fas fa-truck text-white text-xs"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingTrust;
