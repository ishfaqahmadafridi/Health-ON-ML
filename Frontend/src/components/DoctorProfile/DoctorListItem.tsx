import type { FC } from 'react';
import { User, Settings2, RefreshCcw } from 'lucide-react';
import type { Doctor } from '../../types';

interface DoctorListItemProps {
  doctor: Doctor;
  isActive: boolean;
  onEdit: () => void;
  onSwitch: () => void;
}

export const DoctorListItem: FC<DoctorListItemProps> = ({ 
  doctor, 
  isActive, 
  onEdit, 
  onSwitch 
}) => {
  return (
    <div className={`group relative flex items-center justify-between p-5 rounded-[24px] border transition-all duration-300 ${
      isActive 
        ? 'bg-blue-600 border-transparent shadow-xl shadow-blue-600/20 text-white' 
        : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-gray-200/50'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl overflow-hidden shadow-inner ${isActive ? 'bg-white/20' : 'bg-gray-50'}`}>
          {doctor.image ? (
            <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-300'}`} />
            </div>
          )}
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-black tracking-tight">{doctor.name}</h4>
            {isActive && (
              <span className="text-[8px] font-black px-1.5 py-0.5 bg-white/20 rounded-md uppercase tracking-wider">
                Current Active
              </span>
            )}
          </div>
          <p className={`text-xs font-medium ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
            {doctor.role} • {doctor.specialty || 'General Practice'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!isActive && (
          <button 
            onClick={onSwitch}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all active:scale-95"
          >
            <RefreshCcw className="w-3 h-3" />
            Switch
          </button>
        )}
        <button 
          onClick={onEdit}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${
            isActive 
              ? 'bg-white/20 text-white hover:bg-white/30' 
              : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
          }`}
        >
          <Settings2 className="w-3 h-3" />
          Edit
        </button>
      </div>
    </div>
  );
};
