
import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  posterTitle: string;
  contextImage: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Thomas L.",
    location: "Paris, FR",
    rating: 5,
    text: "La qualité du papier 235g est incroyable. J'ai pris le format 60x90 pour mon salon, le rendu des couleurs d'Inception est hyper fidèle.",
    posterTitle: "Inception - 60x90cm",
    contextImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/150?u=thomas"
  },
  {
    id: 2,
    name: "Sarah M.",
    location: "Lyon, FR",
    rating: 5,
    text: "Fan absolue d'Arcane, l'affiche trône fièrement dans mon setup gaming. Reçu en 3 jours dans un tube ultra rigide. Zéro défaut.",
    posterTitle: "Arcane - A3",
    contextImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 3,
    name: "Julien R.",
    location: "Bruxelles, BE",
    rating: 4,
    text: "Le grain du papier satiné évite les reflets gênants de ma lampe de bureau. L'offre groupée dans le panier m'a permis de refaire toute ma déco.",
    posterTitle: "Dune Part II - 40x60cm",
    contextImage: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1000&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/150?u=julien"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-4">La communauté Pixlumia</h2>
          <h3 className="text-4xl md:text-5xl font-brand font-black text-white">Vos murs, <span className="gradient-text">votre style</span></h3>
          <p className="text-slate-500 mt-6 max-w-xl mx-auto font-medium">
            Découvrez comment nos collectionneurs subliment leur intérieur avec nos tirages premium.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="group">
              <div className="relative aspect-[4/5] mb-6 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
                <img 
                  src={t.contextImage} 
                  alt={t.posterTitle} 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-2xl border border-white/10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Modèle exposé</p>
                  <p className="text-white text-xs font-bold">{t.posterTitle}</p>
                </div>
              </div>

              <div className="glass p-8 rounded-[2rem] border border-white/5 relative">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-amber-400 text-[10px]"></i>
                  ))}
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border border-white/10" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-sm">{t.name}</span>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <i className="fas fa-check-circle text-emerald-500 text-[8px]"></i>
                        <span className="text-emerald-500 text-[8px] font-black uppercase">Vérifié</span>
                      </div>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{t.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-8 px-8 py-4 glass rounded-3xl border border-white/10">
                <div className="text-center">
                    <p className="text-2xl font-brand font-black text-white">4.9/5</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Note Moyenne</p>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="text-center">
                    <p className="text-2xl font-brand font-black text-white">+1500</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Clients Heureux</p>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="text-center">
                    <p className="text-2xl font-brand font-black text-white">24h</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Expédition</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
