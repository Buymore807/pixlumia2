
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  onCartToggle: () => void;
  cartCount: number;
  onNavigate: (page: 'home' | 'custom-print' | 'account') => void;
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ onCartToggle, cartCount, onNavigate, user }) => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-indigo-600 blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                <i className="fas fa-gem text-white text-lg"></i>
              </div>
            </div>
            <span className="text-2xl font-brand font-extrabold tracking-tight text-white transition-all">
              PIX<span className="text-indigo-400">LUMIA</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            <button onClick={() => onNavigate('home')} className="text-slate-400 hover:text-white transition-all text-sm font-semibold tracking-wide uppercase group relative">
              Galerie <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => onNavigate('custom-print')} className="text-slate-400 hover:text-white transition-all text-sm font-semibold tracking-wide uppercase group relative">
              Impression <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
            </button>
          </div>

          <div className="flex items-center gap-2">
             <button 
              onClick={() => onNavigate('account')}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <i className={user ? "fas fa-user-check text-indigo-400" : "fas fa-user"}></i>
              {user ? user.firstName : 'Mon Compte'}
            </button>

            <button 
              onClick={onCartToggle}
              className="relative w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              <i className="fas fa-shopping-bag"></i>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-fuchsia-500 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-slate-950">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
