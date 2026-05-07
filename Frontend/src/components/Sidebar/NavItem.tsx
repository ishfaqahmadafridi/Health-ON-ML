import type { FC } from 'react';

interface NavItemProps {
  id: string;
  label: string;
  icon: any;
  isActive: boolean;
  onClick: () => void;
}

export const NavItem: FC<NavItemProps> = ({ id, label, icon: Icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-2xl transition-all duration-300 ${
        isActive
          ? 'bg-white/20 text-white shadow-lg ring-1 ring-white/30'
          : 'text-white/50 hover:text-white hover:bg-white/10'
      }`}
      title={label}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
};
