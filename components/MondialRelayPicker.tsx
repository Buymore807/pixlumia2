
import React, { useState } from 'react';
import { RelayPoint } from '../types';

const MOCK_POINTS: RelayPoint[] = [
  { id: '1', name: 'Presse de la Poste', address: '12 Rue de Rivoli', city: 'Paris', zipCode: '75004', distance: '0.4 km' },
  { id: '2', name: 'Alimentation Générale', address: '45 Boulevard Sébastopol', city: 'Paris', zipCode: '75001', distance: '1.2 km' },
  { id: '3', name: 'Tabac Le Khédive', address: '2 Place de la Bastille', city: 'Paris', zipCode: '75011', distance: '1.8 km' },
];

interface MondialRelayPickerProps {
  onSelect: (point: RelayPoint) => void;
  selectedPointId?: string;
}

const MondialRelayPicker: React.FC<MondialRelayPickerProps> = ({ onSelect, selectedPointId }) => {
  const [zipCode, setZipCode] = useState('75000');

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input 
          type="text" 
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Code Postal" 
          className="flex-1 bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-white text-xs font-bold outline-none focus:border-indigo-500/50 transition-all"
        />
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">
          Chercher
        </button>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
        {MOCK_POINTS.map((point) => (
          <div 
            key={point.id}
            onClick={() => onSelect(point)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer group flex items-center justify-between
              ${selectedPointId === point.id 
                ? 'bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-600/20' 
                : 'bg-slate-950/50 border-white/5 hover:border-indigo-500/30'}
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                ${selectedPointId === point.id ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-500'}
              `}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <p className={`text-[11px] font-black uppercase ${selectedPointId === point.id ? 'text-white' : 'text-slate-300'}`}>
                  {point.name}
                </p>
                <p className={`text-[9px] font-medium ${selectedPointId === point.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                  {point.address}, {point.zipCode} {point.city}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-[9px] font-black ${selectedPointId === point.id ? 'text-white' : 'text-indigo-400'}`}>
                {point.distance}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs">
          <i className="fas fa-truck-fast"></i>
        </div>
        <div>
          <p className="text-white text-[10px] font-black uppercase tracking-widest">Mondial Relay</p>
          <p className="text-indigo-300 text-[9px] font-medium">Livraison estimée sous 3 à 5 jours ouvrés.</p>
        </div>
      </div>
    </div>
  );
};

export default MondialRelayPicker;
