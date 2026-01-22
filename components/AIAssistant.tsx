
import React, { useState } from 'react';
import { getPosterRecommendations, RecommendationResponse } from '../services/geminiService';
import { Product } from '../types';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterApply: (theme: string) => void;
  products: Product[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose, onFilterApply, products }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<RecommendationResponse | null>(null);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    const result = await getPosterRecommendations(prompt, products);
    setResponse(result);
    setIsLoading(false);
  };

  const recommendedProducts = response?.recommendedProductIds 
    ? products.filter(p => response.recommendedProductIds.includes(p.id))
    : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-end p-4 pointer-events-none">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm pointer-events-auto" onClick={onClose}></div>
      <div className="relative w-full max-w-lg glass border border-white/10 rounded-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-right-10 pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-600/20 blur-[80px] rounded-full"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-indigo-500/50 shadow-lg">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Lumia AI" />
              </div>
              <div>
                <h2 className="text-white font-black text-sm uppercase tracking-widest">Conseiller Lumia</h2>
                <p className="text-indigo-400 text-[9px] font-black uppercase">Votre Expert Déco</p>
              </div>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pb-4">
            {!response && !isLoading ? (
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <p className="text-slate-300 text-sm leading-relaxed">
                  "Bonjour ! Je suis Lumia. Dites-moi quel style vous aimez ou décrivez-moi votre pièce, et je sélectionnerai les meilleures affiches de notre catalogue pour vous."
                </p>
              </div>
            ) : null}

            {isLoading && (
              <div className="py-12 flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                <p className="text-indigo-400 text-[9px] font-black uppercase tracking-widest animate-pulse">Exploration du catalogue...</p>
              </div>
            )}

            {response && !isLoading && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-2xl">
                  <p className="text-slate-200 text-sm leading-relaxed">
                    "{response.reasoning}"
                  </p>
                </div>

                {recommendedProducts.length > 0 && (
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ma sélection pour vous :</p>
                    <div className="grid grid-cols-2 gap-3">
                      {recommendedProducts.map(p => (
                        <div 
                          key={p.id} 
                          onClick={() => { onFilterApply(p.title); onClose(); }}
                          className="glass p-3 rounded-2xl border border-white/5 cursor-pointer hover:border-indigo-500/50 transition-all group"
                        >
                          <img src={p.image} className="aspect-[3/4] w-full object-cover rounded-xl mb-2 grayscale-[0.3] group-hover:grayscale-0 transition-all" alt="" />
                          <p className="text-white font-bold text-[10px] truncate uppercase">{p.title}</p>
                          <p className="text-indigo-400 text-[8px] font-black uppercase mt-1">Voir l'affiche</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Explorer ces ambiances :</p>
                  <div className="flex flex-wrap gap-2">
                    {response.suggestedThemes.map((theme, i) => (
                      <button
                        key={i}
                        onClick={() => { onFilterApply(theme); onClose(); }}
                        className="px-4 py-2 bg-slate-800 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all"
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleAsk} className="relative pt-4 border-t border-white/5">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Décrivez votre style ici..."
              className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-5 text-white text-xs outline-none focus:border-indigo-500/50 transition-all pr-16"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="absolute right-2 bottom-2 w-12 h-12 bg-white text-slate-950 rounded-xl flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-50"
            >
              <i className="fas fa-magic text-xs"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
