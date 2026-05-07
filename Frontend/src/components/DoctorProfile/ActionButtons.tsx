import type { FC } from 'react';

interface ActionButtonsProps {
  onSave: () => void;
  onCancel: () => void;
  isNew: boolean;
}

export const ActionButtons: FC<ActionButtonsProps> = ({ onSave, onCancel, isNew }) => {
  return (
    <div className="flex items-center gap-3 pt-6 border-t border-gray-50 mt-8">
      <button
        onClick={onCancel}
        className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-500 font-black text-[10px] uppercase tracking-widest py-4 rounded-2xl transition-all active:scale-95"
      >
        Discard Changes
      </button>
      <button
        onClick={onSave}
        className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-widest py-4 rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-95"
      >
        {isNew ? 'Create Practitioner Profile' : 'Update Medical Profile'}
      </button>
    </div>
  );
};
