
import React, { useMemo, useState } from 'react';
import { CartItem, Product, PosterFormat, FORMAT_DETAILS, User, RelayPoint, Order } from '../types';
import MondialRelayPicker from './MondialRelayPicker';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  allProducts: Product[];
  onRemove: (id: string, format: PosterFormat) => void;
  onUpdateQuantity: (id: string, format: PosterFormat, delta: number) => void;
  onAddToCart: (product: Product, format: PosterFormat, discount: number) => void;
  user: User | null;
  onAuthRequired: () => void;
  onOrderComplete: (order: Order) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, allProducts, onRemove, onUpdateQuantity, onAddToCart, user, onAuthRequired, onOrderComplete }) => {
  const [step, setStep] = useState<'cart' | 'delivery' | 'payment'>('cart');
  const [selectedRelay, setSelectedRelay] = useState<RelayPoint | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const total = useMemo(() => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((acc, item) => {
      const price = item.finalPrice || (FORMAT_DETAILS[item.selectedFormat]?.price || 0);
      return acc + price * (item.quantity || 1);
    }, 0);
  }, [items]);

  const activeFormats = useMemo(() => {
    if (!Array.isArray(items)) return [];
    const formats = new Set<PosterFormat>();
    items.forEach(item => formats.add(item.selectedFormat));
    return Array.from(formats);
  }, [items]);

  const suggestions = useMemo(() => {
    if (!Array.isArray(allProducts) || !Array.isArray(items)) return [];
    const cartProductIds = new Set(items.map(item => item.id));
    return allProducts
      .filter(p => !cartProductIds.has(p.id))
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
  }, [items, allProducts]);

  const handleCheckout = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    setStep('delivery');
  };

  const handleOrder = () => {
    if (!selectedRelay) return;
    setIsProcessing(true);
    
    // Simulation de paiement
    setTimeout(() => {
      const newOrder: Order = {
        id: `PX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        date: new Date().toLocaleDateString('fr-FR'),
        items: [...items],
        total: total,
        status: 'En attente',
        deliveryType: 'Mondial Relay',
        deliveryInfo: selectedRelay
      };
      onOrderComplete(newOrder);
      setIsProcessing(false);
      setStep('cart');
      setSelectedRelay(null);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-white/5 shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        
        {/* Header with Steps */}
        <div className="p-8 border-b border-white/5 bg-slate-900/50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-brand font-black text-white flex items-center gap-3">
               PANIER
            </h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-white rounded-full">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          {items.length > 0 && (
            <div className="flex items-center gap-3">
              {[
                { s: 'cart', i: 'fa-shopping-basket', l: 'Articles' },
                { s: 'delivery', i: 'fa-truck-ramp-box', l: 'Livraison' },
                { s: 'payment', i: 'fa-credit-card', l: 'Paiement' }
              ].map((item, idx) => (
                <React.Fragment key={item.s}>
                  <div className={`flex flex-col items-center gap-2 flex-1 group`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] border transition-all
                      ${step === item.s ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-950 border-white/5 text-slate-600'}
                    `}>
                      <i className={`fas ${item.i}`}></i>
                    </div>
                    <span className={`text-[8px] font-black uppercase tracking-tighter ${step === item.s ? 'text-white' : 'text-slate-600'}`}>
                      {item.l}
                    </span>
                  </div>
                  {idx < 2 && <div className="w-4 h-[1px] bg-white/5 -mt-4"></div>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center border border-white/5">
                <i className="fas fa-ghost text-3xl text-slate-600"></i>
              </div>
              <p className="text-white font-black">Votre panier est vide</p>
              <button onClick={onClose} className="px-8 py-3 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase">Explorer</button>
            </div>
          ) : step === 'cart' ? (
            <div className="space-y-8">
               <div className="space-y-6">
                {items.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="flex gap-4 animate-in fade-in slide-in-from-right-4">
                      <div className="w-16 h-22 bg-slate-800 rounded-xl overflow-hidden border border-white/10 shadow-lg flex-shrink-0">
                        <img src={item.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1 flex flex-col py-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-white font-bold text-xs truncate uppercase tracking-tight">{item.title}</h4>
                          <button onClick={() => onRemove(item.id, item.selectedFormat)} className="text-slate-600 hover:text-rose-500 transition-colors"><i className="fas fa-trash text-[9px]"></i></button>
                        </div>
                        <span className="text-[9px] font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 w-fit mt-1">{item.selectedFormat}</span>
                        <div className="mt-auto flex items-center justify-between">
                          <p className="text-white font-brand font-black text-sm">{(item.finalPrice * item.quantity).toFixed(2)}€</p>
                          <div className="flex items-center bg-slate-950/50 rounded-lg border border-white/5 p-0.5">
                            <button onClick={() => onUpdateQuantity(item.id, item.selectedFormat, -1)} className="w-6 h-6 flex items-center justify-center text-slate-500"><i className="fas fa-minus text-[7px]"></i></button>
                            <span className="w-6 text-center text-xs font-black text-white">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(item.id, item.selectedFormat, 1)} className="w-6 h-6 flex items-center justify-center text-slate-500"><i className="fas fa-plus text-[7px]"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                ))}
              </div>

              {suggestions.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Suggéré pour vous</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {suggestions.map(p => (
                      <div key={p.id} className="glass p-3 rounded-2xl border border-white/10">
                         <img src={p.image} className="aspect-[3/4] w-full object-cover rounded-xl mb-3 shadow-md" alt="" />
                         <p className="text-[10px] font-bold text-white truncate uppercase mb-2">{p.title}</p>
                         <button onClick={() => onAddToCart(p, 'A4', 1)} className="w-full py-2 bg-indigo-600/20 text-indigo-400 text-[8px] font-black uppercase rounded-lg border border-indigo-500/30">Ajouter A4</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : step === 'delivery' ? (
            <div className="space-y-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-white font-black text-sm uppercase tracking-widest">Mondial Relay</h3>
                <p className="text-slate-500 text-[10px] font-medium leading-relaxed">Veuillez sélectionner votre point de retrait favoris parmi la liste.</p>
              </div>
              <MondialRelayPicker onSelect={setSelectedRelay} selectedPointId={selectedRelay?.id} />
              <button 
                onClick={() => setStep('cart')}
                className="text-slate-500 hover:text-white transition-colors text-[9px] font-black uppercase tracking-widest"
              >
                <i className="fas fa-arrow-left mr-2"></i> Modifier mes articles
              </button>
            </div>
          ) : (
             <div className="space-y-8 flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 mb-4">
                  <i className="fas fa-lock text-3xl"></i>
                </div>
                <div>
                  <h3 className="text-white font-black text-lg uppercase tracking-widest">Paiement Sécurisé</h3>
                  <p className="text-slate-500 text-xs mt-2 px-8">Transaction cryptée via Stripe. Aucun détail bancaire n'est stocké sur nos serveurs.</p>
                </div>
                <div className="w-full glass p-6 rounded-3xl border border-white/10 space-y-4">
                   <div className="flex justify-between items-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
                      <span>Sous-total</span>
                      <span className="text-white">{total.toFixed(2)}€</span>
                   </div>
                   <div className="flex justify-between items-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
                      <span>Mondial Relay</span>
                      <span className="text-emerald-400">Gratuit</span>
                   </div>
                   <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                      <span className="text-white font-black uppercase text-xs">Total Final</span>
                      <span className="text-2xl font-brand font-black gradient-text">{total.toFixed(2)}€</span>
                   </div>
                </div>
                <button 
                  onClick={() => setStep('delivery')}
                  className="text-slate-500 hover:text-white transition-colors text-[9px] font-black uppercase tracking-widest"
                >
                  <i className="fas fa-arrow-left mr-2"></i> Changer de Point Relais
                </button>
             </div>
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="p-8 glass border-t border-white/10 space-y-6">
            {step === 'cart' && (
              <button 
                onClick={handleCheckout}
                className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.02] shadow-2xl"
              >
                Commander ({total.toFixed(2)}€)
              </button>
            )}
            {step === 'delivery' && (
              <button 
                onClick={() => selectedRelay && setStep('payment')}
                disabled={!selectedRelay}
                className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl
                  ${selectedRelay ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}
                `}
              >
                Continuer
              </button>
            )}
            {step === 'payment' && (
              <button 
                onClick={handleOrder}
                disabled={isProcessing}
                className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <> <i className="fas fa-circle-notch animate-spin"></i> Traitement... </>
                ) : (
                  <> Payer {total.toFixed(2)}€ </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
