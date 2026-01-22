
import React, { useState, useRef } from 'react';
import { Product, PosterFormat, FORMAT_DETAILS } from '../types';

interface ServiceImpressionPageProps {
  onAddToCart: (p: Product, format: PosterFormat) => void;
  customStudioBg?: string | null;
  onBack: () => void;
}

const REAL_FORMAT_SCALES: Record<PosterFormat, string> = {
  'A4': '16.1%',      
  'A3': '22.7%',      
  '40x60cm': '30.6%', 
  '50x70cm': '38.3%', 
  '60x90cm': '46%'  
};

const ServiceImpressionPage: React.FC<ServiceImpressionPageProps> = ({ onAddToCart, customStudioBg, onBack }) => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<PosterFormat>('40x60cm');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    if (!userImage) {
      fileInputRef.current?.click();
      return;
    }

    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      title: "Impression Personnalisée",
      category: "Perso",
      price: 0,
      image: userImage,
      description: "Tirage d'une photo personnelle.",
      rating: 5.0,
      isCustom: true
    };

    onAddToCart(customProduct, selectedFormat);
  };

  return (
    <div className="flex-grow animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em] mb-12"
        >
          <i className="fas fa-arrow-left text-[8px]"></i>
          Retour à la Galerie
        </button>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* ZONE CONFIGURATEUR (GAUCHE) */}
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-brand font-black text-white mb-6">Laboratoire <br/><span className="gradient-text">Impression</span></h1>
              <p className="text-slate-400 leading-relaxed text-lg">
                Importez votre fichier haute définition et visualisez-le instantanément dans notre studio virtuel avant de commander.
              </p>
            </div>

            {/* STEP 1: IMPORT */}
            <div className="glass p-10 rounded-[2.5rem] border border-white/5 space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black">1</span>
                <h3 className="text-white font-bold uppercase tracking-widest text-xs">Sélection de l'image</h3>
              </div>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative aspect-[16/9] rounded-3xl border-2 border-dashed transition-all cursor-pointer group flex flex-col items-center justify-center overflow-hidden
                  ${userImage ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/10 hover:border-indigo-500/30 bg-slate-900/50'}
                `}
              >
                {userImage ? (
                  <>
                    <img src={userImage} className="w-full h-full object-cover opacity-40" alt="Preview" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <i className="fas fa-check-circle text-emerald-500 text-3xl"></i>
                      <span className="text-white font-black text-[10px] uppercase tracking-widest bg-slate-950/80 px-4 py-2 rounded-full border border-white/10">Changer l'image</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                      <i className="fas fa-file-upload text-xl"></i>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-sm">Cliquer ou glisser un fichier</p>
                      <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-1">JPG, PNG, TIFF (Max 25Mo)</p>
                    </div>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              </div>
            </div>

            {/* STEP 2: FORMAT */}
            <div className="glass p-10 rounded-[2.5rem] border border-white/5 space-y-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black">2</span>
                  <h3 className="text-white font-bold uppercase tracking-widest text-xs">Choix du format</h3>
                </div>
                <span className="text-3xl font-brand font-black text-white">{FORMAT_DETAILS[selectedFormat].price.toFixed(2)}€</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(Object.keys(FORMAT_DETAILS) as PosterFormat[]).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`flex flex-col p-6 rounded-2xl border transition-all text-left group
                      ${selectedFormat === fmt 
                        ? 'bg-white border-white' 
                        : 'bg-slate-950/50 border-white/5 hover:border-indigo-500/30'}
                    `}
                  >
                    <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${selectedFormat === fmt ? 'text-slate-500' : 'text-slate-500'}`}>Format</span>
                    <span className={`text-lg font-brand font-black ${selectedFormat === fmt ? 'text-slate-950' : 'text-white'}`}>{fmt}</span>
                    <span className={`text-[11px] font-bold mt-2 ${selectedFormat === fmt ? 'text-indigo-600' : 'text-slate-400'}`}>
                      {FORMAT_DETAILS[fmt].price.toFixed(2)}€ • 235g Satin
                    </span>
                  </button>
                ))}
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={!userImage}
                className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 shadow-2xl
                  ${userImage 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/20 active:scale-95' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}
                `}
              >
                {!userImage ? 'Importez une image pour continuer' : 'Valider et ajouter au panier'}
                {userImage && <i className="fas fa-shopping-basket text-[10px]"></i>}
              </button>
            </div>
          </div>

          {/* ZONE PREVIEW STUDIO (DROITE) */}
          <div className="sticky top-32 space-y-8">
            <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
              
              {/* PHOTOGRAPHIC STUDIO PREVIEW */}
              <div className="absolute inset-0 bg-[#050505]">
                {/* STUDIO BACKGROUND */}
                {customStudioBg ? (
                  <div className="absolute inset-0">
                    <img src={customStudioBg} className="w-full h-full object-cover brightness-[0.75]" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 opacity-60"></div>
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 right-0 h-[85%] flex">
                        <div className="w-[32%] h-full relative overflow-hidden bg-[#9d846b]">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30"></div>
                            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, transparent 62%, rgba(0,0,0,0.45) 62%, rgba(0,0,0,0.45) 100%)', backgroundSize: '16px 100%' }}></div>
                        </div>
                        <div className="w-[68%] h-full bg-[#415364] relative">
                            <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall-2.png')]"></div>
                            <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black/40 to-transparent"></div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-[#dfd3bc]">
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent h-6"></div>
                    </div>
                  </div>
                )}

                {/* THE POSTER */}
                <div 
                    className="absolute top-[38%] left-[64%] -translate-x-1/2 -translate-y-1/2 aspect-[3/4] transition-all duration-700 ease-out flex items-center justify-center z-20"
                    style={{ width: REAL_FORMAT_SCALES[selectedFormat] }}
                >
                    <div className="absolute inset-[-1px] bg-black/80 blur-[2px] rounded-[1px]"></div>
                    <div className="absolute inset-0 rounded-[1px] shadow-[0_35px_80px_-10px_rgba(0,0,0,0.9),0_15px_30px_-5px_rgba(0,0,0,0.8)]"></div>
                    <div className="relative w-full h-full p-[2%] bg-[#050505] rounded-[1px] border border-white/10 ring-1 ring-black/95 overflow-hidden shadow-inner">
                        <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-slate-900">
                            {userImage ? (
                                <img src={userImage} className="w-full h-full object-cover brightness-[0.88] contrast-[1.05]" alt="" />
                            ) : (
                                <i className="fas fa-image text-slate-800 text-2xl"></i>
                            )}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/[0.05] pointer-events-none"></div>
                    </div>
                </div>

                {/* HUD */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-12 text-center">
                  <div className="glass py-4 px-8 rounded-full border border-white/10 inline-flex items-center gap-6">
                    <div className="flex flex-col items-center">
                      <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Aperçu Réel</span>
                      <span className="text-white font-bold text-xs">Distance 2.5m</span>
                    </div>
                    <div className="w-px h-6 bg-white/10"></div>
                    <div className="flex flex-col items-center">
                      <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Format</span>
                      <span className="text-indigo-400 font-bold text-xs">{selectedFormat}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl border border-white/5 bg-emerald-500/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <div>
                  <p className="text-white text-xs font-bold uppercase">Expédition Prioritaire</p>
                  <p className="text-slate-400 text-[10px] font-medium mt-1">
                    Les commandes personnalisées sont traitées en 24h et expédiées sous tube rigide renforcé.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceImpressionPage;
