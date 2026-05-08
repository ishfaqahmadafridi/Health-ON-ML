import type { FC } from 'react';
import type { NavItem as NavItemType } from '../../context/sidebar/SidebarContext';

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  onClick: () => void;
}

export const NavItem: FC<NavItemProps> = ({ item, isActive, onClick }) => {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 group ${
        isActive
          ? 'bg-white/15 text-white'
          : 'text-white/50 hover:text-white hover:bg-white/5'
      }`}
      title={item.label}
    >
      <Icon size={20} />
      
      {/* Tooltip for accessibility since label is hidden */}
      <span className="absolute left-14 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[100]">
        {item.label}
      </span>
    </button>
  );
};
