import type { FC } from 'react';
import { User } from 'lucide-react';

interface ProfileHeaderProps {
  onAddClick: () => void;
  showAddButton: boolean;
}

export const ProfileHeader: FC<ProfileHeaderProps> = ({ onAddClick, showAddButton }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Doctor Profiles</h2>
          <p className="text-sm text-gray-400 font-medium">Manage clinical staff and practitioners</p>
        </div>
      </div>
      
      {showAddButton && (
        <button 
          onClick={onAddClick}
          className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-black text-[10px] uppercase tracking-widest px-5 py-3 rounded-xl transition-all active:scale-95"
        >
          + Add New Practitioner
        </button>
      )}
    </div>
  );
};
