import type { FC } from 'react';
import { NavItem } from './NavItem';
import { useSidebar } from '../../context/sidebar/SidebarContext';

interface NavListProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const NavList: FC<NavListProps> = ({ activeView, onViewChange }) => {
  const { navItems } = useSidebar();

  return (
    <nav className="flex flex-col gap-6">
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          isActive={activeView === item.id}
          onClick={() => onViewChange(item.id)}
        />
      ))}
    </nav>
  );
};
