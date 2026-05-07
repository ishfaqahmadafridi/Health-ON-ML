import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';

interface DropdownMenuItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({ icon: Icon, label, onClick, variant = 'default' }) => {
  const textColor = variant === 'danger' ? 'text-red-500' : 'text-gray-600';
  const hoverColor = variant === 'danger' ? 'hover:bg-red-50' : 'hover:bg-gray-50';

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${textColor} ${hoverColor}`}
    >
      <Icon className={`h-4 w-4 ${variant === 'default' ? 'text-gray-400' : ''}`} />
      <span className="flex-1 text-left">{label}</span>
    </button>
  );
};
