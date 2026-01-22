
import React from 'react';

interface ServiceImpressionBannerProps {
  onAction: () => void;
}

const ServiceImpressionBanner: React.FC<ServiceImpressionBannerProps> = ({ onAction }) => {
  return (
    <section className="relative mt-12 w-full overflow-hidden rounded-[3rem] border border-white/5 bg-slate-900/40">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-transparent to-fuchsia-600/10 opacity-50"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_80%_20%,#818cf8_0%,transparent_50%)]"></div>
      </div>
      
      <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-8 md:p-16 items-center">
        <div className="space-y-8 text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <i className="fas fa-magic text-indigo-400 text-[10px]"></i>
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Nouveau Service</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-brand font-black text-white leading-tight">
            Donnez vie à <br/>
            <span className="gradient-text">Vos Propres Images</span>
          </h2>
          
          <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
            Photos de famille, créations digitales ou captures de jeux... Nous utilisons les mêmes papiers 235g Satin et encres pigmentaires que pour nos éditions d'art.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 border border-white/10">
                <i className="fas fa-layer-group text-sm"></i>
              </div>
              <div>
                <p className="text-white text-xs font-bold uppercase mb-1">Tous Formats</p>
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">De l'A4 au 60x90cm</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 border border-white/10">
                <i className="fas fa-shield-alt text-sm"></i>
              </div>
              <div>
                <p className="text-white text-xs font-bold uppercase mb-1">Qualité Musée</p>
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Papier Satiné 235g</p>
              </div>
            </div>
          </div>

          <button 
            onClick={onAction}
            className="inline-flex items-center gap-4 px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/5 group"
          >
            Démarrer mon impression
            <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>

        <div className="relative hidden lg:block">
          <div className="aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 rotate-3 shadow-2xl bg-slate-800">
            <img 
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop" 
              className="w-full h-full object-cover" 
              alt=""
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          {/* Correction ici : Utilisation d'une image plus stable et alt vide pour éviter le texte en cas d'erreur */}
          <div className="absolute -bottom-8 -left-8 aspect-[3/4] w-48 rounded-2xl overflow-hidden border border-white/10 -rotate-6 shadow-2xl bg-slate-800">
            <img 
              src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800&auto=format&fit=crop" 
              className="w-full h-full object-cover" 
              alt=""
              loading="lazy"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceImpressionBanner;
