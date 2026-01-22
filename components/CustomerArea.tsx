
import React, { useState, useEffect } from 'react';
import { User, Order } from '../types';

interface CustomerAreaProps {
  user: User | null;
  orders: Order[];
  onLogout: () => void;
  onAuthClick: () => void;
  onUpdateUser: (data: Partial<User>) => void;
}

const CustomerArea: React.FC<CustomerAreaProps> = ({ user, orders, onLogout, onAuthClick, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<User>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Synchroniser editData quand le mode édition est activé ou que user change
  useEffect(() => {
    if (user) {
      setEditData({
        phone: user.phone || '',
        address: user.address || '',
        zipCode: user.zipCode || '',
        city: user.city || ''
      });
    }
  }, [user, isEditing]);

  if (!user) {
    return (
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full glass rounded-[3rem] p-12 text-center border border-white/5">
          <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20 mx-auto mb-8">
            <i className="fas fa-user-lock text-3xl"></i>
          </div>
          <h2 className="text-2xl font-brand font-black text-white uppercase tracking-tight mb-4">Espace Réservé</h2>
          <p className="text-slate-500 text-sm font-medium mb-10">Connectez-vous pour accéder à vos commandes et vos préférences de galerie.</p>
          <button 
            onClick={onAuthClick}
            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
          >
            Se Connecter / S'inscrire
          </button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    onUpdateUser(editData);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="flex-grow animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        <div className="grid lg:grid-cols-4 gap-12">
          
          {/* Sidebar Profil */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass rounded-[2.5rem] border border-white/5 p-8 text-center overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-20"></div>
              <div className="relative pt-4">
                <img src={user.avatar || `https://i.pravatar.cc/150?u=${user.email}`} className="w-24 h-24 rounded-[2rem] mx-auto border-4 border-slate-950 shadow-2xl mb-6" alt="" />
                <h2 className="text-xl font-brand font-black text-white">{user.firstName} {user.lastName}</h2>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">{user.email}</p>
              </div>
              <div className="mt-10 pt-10 border-t border-white/5 space-y-4">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3
                    ${isEditing ? 'bg-indigo-600 text-white' : 'bg-white/5 text-white hover:bg-white/10'}
                  `}
                >
                  <i className="fas fa-user-edit"></i> {isEditing ? 'Annuler' : 'Éditer Coordonnées'}
                </button>
                <button 
                  onClick={onLogout}
                  className="w-full py-3 bg-rose-500/10 text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-3"
                >
                  <i className="fas fa-sign-out-alt"></i> Déconnexion
                </button>
              </div>
            </div>

            <div className="glass rounded-[2.5rem] border border-white/5 p-8">
              <h3 className="text-white font-black text-[10px] uppercase tracking-widest mb-6">Récapitulatif</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-500 uppercase">Commandes</span>
                  <span className="text-white">{orders.length}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-500 uppercase">Points Fidélité</span>
                  <span className="text-indigo-400">{(orders.length * 50)} pts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            
            {showSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-6 rounded-[2rem] flex items-center gap-4 animate-in slide-in-from-top-4">
                <i className="fas fa-check-circle"></i>
                <p className="text-xs font-bold uppercase tracking-widest">Profil mis à jour avec succès !</p>
              </div>
            )}

            {/* Formulaire de coordonnées */}
            {isEditing ? (
              <div className="glass rounded-[3rem] border border-indigo-500/30 p-10 space-y-8 animate-in slide-in-from-top-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-brand font-black text-white uppercase tracking-tight">Mes <span className="text-indigo-500">Coordonnées</span></h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Téléphone</label>
                    <input 
                      type="tel" 
                      value={editData.phone || ''} 
                      onChange={e => setEditData({...editData, phone: e.target.value})}
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-indigo-500/50"
                      placeholder="06 00 00 00 00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Adresse</label>
                    <input 
                      type="text" 
                      value={editData.address || ''} 
                      onChange={e => setEditData({...editData, address: e.target.value})}
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-indigo-500/50"
                      placeholder="12 rue de l'Art"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Code Postal</label>
                    <input 
                      type="text" 
                      value={editData.zipCode || ''} 
                      onChange={e => setEditData({...editData, zipCode: e.target.value})}
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-indigo-500/50"
                      placeholder="75000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Ville</label>
                    <input 
                      type="text" 
                      value={editData.city || ''} 
                      onChange={e => setEditData({...editData, city: e.target.value})}
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-indigo-500/50"
                      placeholder="Paris"
                    />
                  </div>
                </div>
                <button 
                  onClick={handleSave}
                  className="px-10 py-4 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all"
                >
                  Enregistrer les modifications
                </button>
              </div>
            ) : (
              <div className="glass rounded-[3rem] border border-white/5 p-10 flex flex-wrap gap-12">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Téléphone</p>
                    <p className="text-white font-bold text-sm">{user.phone || 'Non renseigné'}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Adresse de livraison par défaut</p>
                    <p className="text-white font-bold text-sm">
                      {user.address ? `${user.address}, ${user.zipCode} ${user.city}` : 'Non renseignée'}
                    </p>
                 </div>
              </div>
            )}

            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-brand font-black text-white uppercase tracking-tight">Historique <span className="text-indigo-500">Commandes</span></h3>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-full border border-white/5">{orders.length} commandes</span>
              </div>

              {orders.length === 0 ? (
                <div className="glass rounded-[3rem] border border-dashed border-white/10 p-20 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-700 mx-auto mb-6">
                    <i className="fas fa-box-open text-2xl"></i>
                  </div>
                  <p className="text-white font-bold text-sm">Aucune commande pour le moment.</p>
                  <p className="text-slate-500 text-xs mt-2">Votre galerie attend son premier tirage !</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="glass rounded-[2.5rem] border border-white/5 overflow-hidden group hover:border-indigo-500/30 transition-all">
                      <div className="p-8 flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                            <i className="fas fa-receipt text-xl"></i>
                          </div>
                          <div>
                            <p className="text-white font-black text-sm uppercase tracking-widest">{order.id}</p>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Commandée le {order.date}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-12">
                          <div className="hidden sm:block">
                              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Livraison</p>
                              <p className="text-white text-[10px] font-bold uppercase tracking-tighter truncate max-w-[150px]">
                                <i className="fas fa-map-marker-alt text-indigo-400 mr-2"></i>
                                {typeof order.deliveryInfo === 'object' ? order.deliveryInfo.name : order.deliveryType}
                              </p>
                          </div>
                          <div className="text-right">
                              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Statut</p>
                              <span className={`px-3 py-1 border rounded-full text-[9px] font-black uppercase tracking-widest ${order.status === 'Livré' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                  {order.status}
                              </span>
                          </div>
                          <div className="text-right">
                              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Montant</p>
                              <p className="text-white font-brand font-black text-xl">{order.total.toFixed(2)}€</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-8 pb-8 flex gap-3 overflow-x-auto custom-scrollbar">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex-shrink-0 w-12 h-16 rounded-lg overflow-hidden border border-white/10 group-hover:border-indigo-500/30 transition-colors">
                            <img src={item.image} className="w-full h-full object-cover" alt="" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerArea;
