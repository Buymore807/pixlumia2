
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    zipCode: '',
    city: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: formData.email,
      firstName: formData.firstName || 'Client',
      lastName: formData.lastName || 'Pixlumia',
      avatar: `https://i.pravatar.cc/150?u=${formData.email}`,
      phone: formData.phone,
      address: formData.address,
      zipCode: formData.zipCode,
      city: formData.city
    };
    onLogin(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative w-full max-w-lg glass border border-white/10 rounded-[3rem] p-10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/20 blur-[60px] rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-fuchsia-600/20 blur-[60px] rounded-full"></div>

        <div className="relative z-10">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg mb-6">
              <i className="fas fa-gem text-white text-2xl"></i>
            </div>
            <h2 className="text-2xl font-brand font-black text-white uppercase tracking-tight">
              {isLogin ? 'Bon retour !' : 'Rejoindre Pixlumia'}
            </h2>
            <p className="text-slate-500 text-xs font-medium mt-2">
              {isLogin ? 'Accédez à votre galerie et vos commandes.' : 'Bénéficiez d\'offres exclusives et gérez vos tirages.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  required
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-indigo-500/50 transition-all"
                />
                <input 
                  type="text" 
                  required
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>
            )}
            
            <input 
              type="email" 
              required
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-indigo-500/50 transition-all"
            />
            
            <input 
              type="password" 
              required
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-indigo-500/50 transition-all"
            />

            {!isLogin && (
              <div className="space-y-4 pt-4 border-t border-white/5">
                <input 
                  type="tel" 
                  placeholder="Téléphone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-indigo-500/50 transition-all"
                />
                <input 
                  type="text" 
                  placeholder="Adresse"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-indigo-500/50 transition-all"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Code Postal"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                    className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-indigo-500/50 transition-all"
                  />
                  <input 
                    type="text" 
                    placeholder="Ville"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-indigo-500/50 transition-all"
                  />
                </div>
              </div>
            )}
            
            <button 
              type="submit"
              className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-all mt-4"
            >
              {isLogin ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-500 hover:text-indigo-400 text-[10px] font-black uppercase tracking-widest transition-colors"
            >
              {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà membre ? Se connecter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
