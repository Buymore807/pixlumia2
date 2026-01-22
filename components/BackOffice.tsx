
import React, { useState, useRef } from 'react';
import { Product, Category, PosterFormat, FORMAT_DETAILS } from '../types';

interface BackOfficeProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onClose: () => void;
  onReset: () => void;
  customStudioBg: string | null;
  onUpdateStudioBg: (bg: string | null) => void;
}

const BackOffice: React.FC<BackOfficeProps> = ({ 
  products, 
  onAddProduct, 
  onDeleteProduct, 
  onClose, 
  onReset,
  customStudioBg,
  onUpdateStudioBg 
}) => {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: 'Films',
    price: 0,
    rating: 5.0
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const studioBgRef = useRef<HTMLInputElement>(null);

  const categories: Category[] = ['Films', 'Séries', 'Jeux Vidéo', 'Anime'];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setNewProduct(prev => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStudioBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Attention: Image lourde (>2Mo). Cela peut ralentir le chargement.");
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateStudioBg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.image) return;

    const productToAdd: Product = {
      id: Date.now().toString(),
      title: newProduct.title as string,
      category: newProduct.category as Category,
      price: Number(newProduct.price) || 0,
      image: newProduct.image as string,
      description: newProduct.description || "Affiche premium.",
      rating: 5.0,
      featured: false
    };

    onAddProduct(productToAdd);
    setNewProduct({ category: 'Films', price: 0, rating: 5.0 });
    setImagePreview(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-brand font-black text-white">ESPACE <span className="text-indigo-500">ADMIN</span></h2>
          <p className="text-slate-500 font-medium mt-1">Personnalisez votre boutique et votre studio virtuel.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onReset} className="px-6 py-2 bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase rounded-xl border border-rose-500/20">Réinitialiser</button>
          <button onClick={onClose} className="px-6 py-2 glass text-white text-[10px] font-black uppercase rounded-xl">Boutique</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* COLONNE GAUCHE: CONFIG ET NOUVEAU PRODUIT */}
        <div className="space-y-8 lg:col-span-1">
          
          {/* CONFIG STUDIO GLOBAL */}
          <div className="glass p-8 rounded-[2rem] border border-indigo-500/20 bg-indigo-500/5">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-widest text-[12px]">
              <i className="fas fa-camera-retro text-indigo-500"></i> Studio Interactif
            </h3>
            
            <div 
                onClick={() => studioBgRef.current?.click()}
                className="relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-white/10 hover:border-indigo-500/40 cursor-pointer group transition-all"
            >
                {customStudioBg ? (
                    <img src={customStudioBg} className="w-full h-full object-cover" alt="Studio Background" />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50">
                        <i className="fas fa-upload text-slate-500 mb-2 group-hover:text-indigo-500 transition-colors"></i>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Image de Salon Réel</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Modifier le Fond</span>
                </div>
                <input type="file" ref={studioBgRef} onChange={handleStudioBgChange} className="hidden" accept="image/*" />
            </div>

            {customStudioBg && (
                <button 
                    onClick={() => onUpdateStudioBg(null)}
                    className="w-full mt-4 py-2 text-[8px] font-black text-slate-400 hover:text-rose-500 uppercase tracking-widest transition-colors"
                >
                    <i className="fas fa-undo mr-2"></i> Rétablir Salon "Lumia"
                </button>
            )}
            <p className="text-[8px] text-slate-500 mt-4 leading-relaxed uppercase tracking-tighter">
                * Cette image sera utilisée comme arrière-plan lors du survol de n'importe quelle affiche du catalogue.
            </p>
          </div>

          {/* AJOUT PRODUIT */}
          <div className="glass p-8 rounded-[2rem] border border-white/10">
            <h3 className="text-[12px] font-black text-white mb-8 uppercase tracking-widest">Ajouter un Poster</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div onClick={() => fileInputRef.current?.click()} className="aspect-[3/4] rounded-2xl border-2 border-dashed border-white/10 hover:border-indigo-500/30 cursor-pointer overflow-hidden flex items-center justify-center bg-slate-950/50">
                {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" alt="" /> : <i className="fas fa-plus text-slate-700"></i>}
                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
              </div>
              <input type="text" value={newProduct.title || ''} onChange={e => setNewProduct({...newProduct, title: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-white text-sm outline-none" placeholder="Titre de l'oeuvre" />
              <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value as Category})} className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-white text-sm outline-none">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase shadow-xl shadow-indigo-600/20 transition-all active:scale-95">Publier</button>
            </form>
          </div>
        </div>

        {/* COLONNE DROITE: TABLEAU */}
        <div className="lg:col-span-2">
          <div className="glass rounded-[2.5rem] border border-white/10 overflow-hidden shadow-xl">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-950/50">
                    <tr>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase">Affiche</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase">Titre</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.map(p => (
                      <tr key={p.id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="px-8 py-4"><img src={p.image} className="w-10 h-14 object-cover rounded shadow-lg" alt="" /></td>
                        <td className="px-8 py-4 text-white font-bold text-sm">{p.title}</td>
                        <td className="px-8 py-4 text-right">
                          <button onClick={() => onDeleteProduct(p.id)} className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 transition-all"><i className="fas fa-trash-alt text-xs"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackOffice;
