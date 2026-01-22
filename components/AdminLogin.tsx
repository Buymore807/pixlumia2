
import React, { useState } from 'react';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mot de passe par défaut pour le projet
    if (password === 'PIXLUMIA2025') {
      onSuccess();
      setPassword('');
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" onClick={onClose}></div>
      <div className="relative w-full max-w-sm glass border border-white/10 rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
        
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center text-indigo-500 shadow-inner">
            <i className={`fas fa-lock ${error ? 'text-rose-500 animate-shake' : 'text-indigo-400'}`}></i>
          </div>
          
          <div>
            <h2 className="text-xl font-brand font-black text-white uppercase tracking-tight">Accès Restreint</h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2">Zone Administrateur Pixlumia</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative">
              <input 
                type="password" 
                autoFocus
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-slate-950 border ${error ? 'border-rose-500' : 'border-white/5'} rounded-2xl px-5 py-4 text-center text-white text-sm outline-none focus:border-indigo-500/50 transition-all`}
              />
              {error && (
                <p className="text-rose-500 text-[8px] font-black uppercase tracking-widest mt-2 animate-pulse">Mot de passe incorrect</p>
              )}
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all"
            >
              Déverrouiller
            </button>
            
            <button 
              type="button"
              onClick={onClose}
              className="text-slate-600 hover:text-white text-[8px] font-black uppercase tracking-widest transition-colors"
            >
              Annuler
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
