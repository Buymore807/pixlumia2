
import React, { useState, useEffect } from 'react';
import { Product, PosterFormat, FORMAT_DETAILS } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product, format: PosterFormat) => void;
  customStudioBg?: string | null;
}

/**
 * LOGIQUE D'ÉCHELLE PROPORTIONNELLE (Basée sur la largeur réelle) :
 * 60x90cm (60cm large) = 46% (Référence)
 * 50x70cm (50cm large) = 46% / (60/50) = 38.3%
 * 40x60cm (40cm large) = 46% / (60/40) = 30.6%
 * A3 (29.7cm large) = 46% / (60/29.7) = 22.7%
 * A4 (21cm large) = 46% / (60/21) = 16.1%
 */
const REAL_FORMAT_SCALES: Record<PosterFormat, string> = {
  'A4': '16.1%',      
  'A3': '22.7%',      
  '40x60cm': '30.6%', 
  '50x70cm': '38.3%', 
  '60x90cm': '46%'  
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, customStudioBg }) => {
  const [selectedFormat, setSelectedFormat] = useState<PosterFormat>('A4');
  const [imageError, setImageError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const currentPrice = FORMAT_DETAILS[selectedFormat].price + (product.price || 0);

  useEffect(() => {
    setImageError(false);
    setIsImageLoaded(false);
  }, [product.image]);

  return (
    <div 
      className={`group relative bg-slate-900/40 rounded-[2.5rem] overflow-visible border border-white/5 transition-all duration-500 ease-out flex flex-col will-change-transform
        ${isHovered 
          ? 'md:scale-150 z-50 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border-indigo-500/50 scale-100' 
          : 'scale-100 z-10 shadow-none hover:border-indigo-500/30'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Support tactile pour mobile : un tap affiche le studio
      onClick={() => setIsHovered(!isHovered)}
    >
      {/* Container to maintain overflow-hidden for internal elements */}
      <div className="w-full h-full rounded-[2.5rem] overflow-hidden flex flex-col">
        
        {/* 1. VISUAL AREA (Studio Photo) */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#050505] border-b border-white/5">
          
          {!isImageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
              <div className="w-8 h-8 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
          )}

          {imageError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950">
              <i className="fas fa-image text-slate-800 text-5xl mb-4"></i>
            </div>
          ) : (
            <>
              <img 
                src={product.image} 
                alt={product.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'} ${isHovered ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100'}`}
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setImageError(true)}
              />

              {/* INTERACTIVE PHOTO STUDIO */}
              <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  
                  {/* BACKGROUND ENGINE */}
                  {customStudioBg ? (
                      <div className="absolute inset-0 bg-black">
                          <img src={customStudioBg} className="w-full h-full object-cover brightness-[0.75] contrast-[1.05]" alt="" />
                          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 opacity-60"></div>
                      </div>
                  ) : (
                      <div className="absolute inset-0">
                          {/* Default Studio "Lumia" */}
                          <div className="absolute top-0 left-0 right-0 h-[85%] flex">
                              <div className="w-[32%] h-full relative overflow-hidden bg-[#9d846b]">
                                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30"></div>
                                  <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, transparent 62%, rgba(0,0,0,0.45) 62%, rgba(0,0,0,0.45) 100%)', backgroundSize: '16px 100%' }}></div>
                                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                              </div>
                              <div className="w-[68%] h-full bg-[#415364] relative">
                                  <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall-2.png')]"></div>
                                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
                                  <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black/40 to-transparent"></div>
                              </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-[#dfd3bc]">
                              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
                              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent h-6"></div>
                          </div>
                          {/* Props */}
                          <div className="absolute top-0 left-[6%] w-[12%] h-[40%] z-40 flex flex-col items-center">
                              <div className="w-[1px] h-3/4 bg-black/80"></div>
                              <div className="w-full aspect-[2/3] bg-gradient-to-br from-[#eecb82] to-[#7d5e21] rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10"></div>
                          </div>
                          <div className="absolute bottom-[8%] left-[8%] w-[26%] aspect-square z-30">
                              <div className="absolute bottom-[10%] left-0 w-full h-[75%] bg-[#2d5c75] rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.7)] border-b-2 border-black/40">
                                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-white/10 rounded-[2.5rem]"></div>
                              </div>
                          </div>
                      </div>
                  )}

                  {/* PHOTOGRAPHIC POSTER INTEGRATION */}
                  <div 
                      className="absolute top-[38%] left-[64%] -translate-x-1/2 -translate-y-1/2 aspect-[3/4] transition-all duration-700 ease-out flex items-center justify-center z-20"
                      style={{ 
                          width: REAL_FORMAT_SCALES[selectedFormat],
                      }}
                  >
                      <div className="absolute inset-[-1px] bg-black/80 blur-[2px] rounded-[1px]"></div>
                      <div className="absolute inset-0 rounded-[1px] shadow-[0_35px_80px_-10px_rgba(0,0,0,0.9),0_15px_30px_-5px_rgba(0,0,0,0.8)]"></div>
                      <div className="relative w-full h-full p-[2%] bg-[#050505] rounded-[1px] border border-white/10 ring-1 ring-black/95 overflow-hidden shadow-inner">
                          <div className="relative w-full h-full overflow-hidden">
                              <img 
                                  src={product.image} 
                                  className="w-full h-full object-cover brightness-[0.88] contrast-[1.05] saturate-[0.98]" 
                                  alt="" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/[0.05] pointer-events-none"></div>
                          </div>
                          <div className="absolute inset-0 pointer-events-none">
                              <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-white/[0.08] blur-[40px] rotate-45 transform-gpu"></div>
                              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent mix-blend-overlay"></div>
                          </div>
                          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none mix-blend-multiply"></div>
                      </div>
                  </div>

                  {/* SCENE NOISE */}
                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-[100]"></div>

                  {/* Professional HUD (Labels) */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                      <div className="flex items-center gap-3 bg-black/80 backdrop-blur-xl border border-white/10 py-1.5 px-4 rounded-full shadow-2xl">
                          <span className="text-[6px] text-white/40 font-black uppercase tracking-[0.4em]">Studio</span>
                          <div className="w-px h-2 bg-white/10"></div>
                          <span className="text-[8px] text-white font-black tracking-widest uppercase">{selectedFormat}</span>
                      </div>
                  </div>
              </div>
            </>
          )}
        </div>

        {/* 2. INTERACTION AREA */}
        <div className="relative h-44 overflow-hidden bg-slate-900/50">
          <div className={`absolute inset-0 p-6 flex flex-col transition-all duration-500 ease-in-out transform ${isHovered ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em]">{product.category}</span>
              <div className="flex items-center gap-1"><i className="fas fa-star text-amber-500 text-[8px]"></i><span className="text-[10px] text-white font-bold">{product.rating}</span></div>
            </div>
            <h3 className="text-white font-bold text-lg mb-4 truncate">{product.title}</h3>
            <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-500 uppercase">Dès</span>
                <p className="text-white text-2xl font-brand font-black mt-1">{FORMAT_DETAILS['A4'].price.toFixed(2)}€</p>
              </div>
              <div className="flex items-center gap-2 text-indigo-400 font-black text-[9px] uppercase tracking-widest">
                 Aperçu Salon <i className="fas fa-expand-arrows-alt text-[8px] ml-1"></i>
              </div>
            </div>
          </div>

          <div className={`absolute inset-0 p-5 flex flex-col justify-between transition-all duration-500 ease-in-out transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Format :</span>
                <span className="text-white font-brand font-black text-lg">{currentPrice.toFixed(2)}€</span>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {(Object.keys(FORMAT_DETAILS) as PosterFormat[]).map(fmt => (
                  <button 
                    key={fmt} 
                    onClick={(e) => { e.stopPropagation(); setSelectedFormat(fmt); }} 
                    className={`text-[7px] font-black py-2 rounded-lg border transition-all ${selectedFormat === fmt ? 'bg-white text-slate-950 border-white shadow-lg' : 'bg-white/5 text-slate-500 border-white/5 hover:border-white/20 hover:text-white'}`}
                  >
                    {fmt.split('cm')[0]}
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product, selectedFormat);
              }} 
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-[8px] uppercase shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"
            >
               Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
