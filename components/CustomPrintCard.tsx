
import React, { useState, useRef } from 'react';
import { Product, PosterFormat, FORMAT_DETAILS } from '../types';

interface CustomPrintCardProps {
  onAddToCart: (p: Product, format: PosterFormat) => void;
  customStudioBg?: string | null;
}

const REAL_FORMAT_SCALES: Record<PosterFormat, string> = {
  'A4': '16.1%',      
  'A3': '22.7%',      
  '40x60cm': '30.6%', 
  '50x70cm': '38.3%', 
  '60x90cm': '46%'  
};

const CustomPrintCard: React.FC<CustomPrintCardProps> = ({ onAddToCart, customStudioBg }) => {
  const [selectedFormat, setSelectedFormat] = useState<PosterFormat>('40x60cm');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
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

  const currentPrice = FORMAT_DETAILS[selectedFormat].price;

  return (
    <div 
      className={`group relative bg-slate-900/40 rounded-[2.5rem] overflow-visible border-2 border-dashed border-indigo-500/20 transition-all duration-500 ease-out flex flex-col will-change-transform
        ${isHovered 
          ? 'md:scale-150 z-50 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border-indigo-500/50 scale-100' 
          : 'scale-100 z-10 shadow-none hover:border-indigo-500/30'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !userImage && fileInputRef.current?.click()}
    >
      <div className="w-full h-full rounded-[2.5rem] overflow-hidden flex flex-col bg-slate-950/20">
        
        {/* VISUAL AREA */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#050505] border-b border-white/5 flex items-center justify-center">
            
            {!userImage && (
                <div className="flex flex-col items-center gap-4 p-8 text-center animate-pulse">
                    <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <i className="fas fa-cloud-upload-alt text-2xl text-indigo-400"></i>
                    </div>
                    <div>
                        <p className="text-white font-black text-xs uppercase tracking-widest">Importer votre image</p>
                        <p className="text-slate-500 text-[9px] mt-2 uppercase tracking-tighter">Photos de famille, créations, etc.</p>
                    </div>
                </div>
            )}

            {userImage && (
                <>
                    <img 
                        src={userImage} 
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isHovered ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100'}`}
                        alt="Preview"
                    />

                    <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        {customStudioBg ? (
                            <div className="absolute inset-0 bg-black">
                                <img src={customStudioBg} className="w-full h-full object-cover brightness-[0.75] contrast-[1.05]" alt="" />
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
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
                                        <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black/40 to-transparent"></div>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-[#dfd3bc]">
                                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent h-6"></div>
                                </div>
                            </div>
                        )}

                        <div 
                            className="absolute top-[38%] left-[64%] -translate-x-1/2 -translate-y-1/2 aspect-[3/4] transition-all duration-700 ease-out flex items-center justify-center z-20"
                            style={{ width: REAL_FORMAT_SCALES[selectedFormat] }}
                        >
                            <div className="absolute inset-[-1px] bg-black/80 blur-[2px] rounded-[1px]"></div>
                            <div className="absolute inset-0 rounded-[1px] shadow-[0_35px_80px_-10px_rgba(0,0,0,0.9),0_15px_30px_-5px_rgba(0,0,0,0.8)]"></div>
                            <div className="relative w-full h-full p-[2%] bg-[#050505] rounded-[1px] border border-white/10 ring-1 ring-black/95 overflow-hidden shadow-inner">
                                <div className="relative w-full h-full overflow-hidden">
                                    <img src={userImage} className="w-full h-full object-cover brightness-[0.88] contrast-[1.05] saturate-[0.98]" alt="" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/[0.05] pointer-events-none"></div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                            <div className="flex items-center gap-3 bg-black/80 backdrop-blur-xl border border-white/10 py-1.5 px-4 rounded-full shadow-2xl">
                                <span className="text-[6px] text-white/40 font-black uppercase tracking-[0.4em]">Studio Perso</span>
                                <div className="w-px h-2 bg-white/10"></div>
                                <span className="text-[8px] text-white font-black tracking-widest uppercase">{selectedFormat}</span>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
        </div>

        {/* INTERACTION AREA */}
        <div className="relative h-44 overflow-hidden bg-indigo-600/5">
          <div className={`absolute inset-0 p-6 flex flex-col transition-all duration-500 ease-in-out transform ${isHovered ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em]">Service Pro</span>
              <div className="flex items-center gap-1"><i className="fas fa-magic text-indigo-500 text-[8px]"></i><span className="text-[10px] text-white font-bold">Import</span></div>
            </div>
            <h3 className="text-white font-bold text-lg mb-4 truncate uppercase tracking-tighter">Tirage Personnel</h3>
            <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-500 uppercase">Dès 4.90€</span>
                <p className="text-white text-2xl font-brand font-black mt-1">{userImage ? currentPrice.toFixed(2) + '€' : 'Libre'}</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                className="flex items-center gap-2 text-indigo-400 font-black text-[9px] uppercase tracking-widest hover:text-white transition-colors"
              >
                 {userImage ? 'Changer' : 'Importer'} <i className="fas fa-upload text-[8px] ml-1"></i>
              </button>
            </div>
          </div>

          <div className={`absolute inset-0 p-5 flex flex-col justify-between transition-all duration-500 ease-in-out transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Choix du format :</span>
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
                handleAddToCart();
              }} 
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-[8px] uppercase shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"
            >
               {userImage ? "Ajouter au panier" : "Choisir une image"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPrintCard;
