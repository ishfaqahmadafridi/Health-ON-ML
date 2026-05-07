import type { FC } from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteDoctorButtonProps {
  onDelete: () => void;
}

export const DeleteDoctorButton: FC<DeleteDoctorButtonProps> = ({ onDelete }) => {
  return (
    <button 
      onClick={() => {
        if (window.confirm('Delete this medical profile? This cannot be undone.')) {
          onDelete();
        }
      }}
      className="w-full flex items-center justify-center gap-2 py-4 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all active:scale-95 mt-6"
    >
      <Trash2 className="w-4 h-4" />
      Terminate Professional Profile
    </button>
  );
};
