import type { FC } from 'react';

interface ToggleFieldProps {
  label: string;
  isActive: boolean;
  onToggle: () => void;
}

export const ToggleField: FC<ToggleFieldProps> = ({ label, isActive, onToggle }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <button
        onClick={onToggle}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          isActive ? 'bg-blue-500' : 'bg-gray-200'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            isActive ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};
