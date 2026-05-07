import type { FC } from 'react';
import { SidebarProvider } from '../../context/sidebar/SidebarContext';
import { SidebarLogo } from './SidebarLogo';
import { NavList } from './NavList';
import { SidebarFooter } from './SidebarFooter';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

/**
 * Sidebar Module Entry Point
 * Provides a specialized navigation rail with SidebarContext.
 */
export const Sidebar: FC<SidebarProps> = (props) => {
  return (
    <SidebarProvider>
      <aside className="w-24 bg-[#2B78C5] flex flex-col items-center py-6 h-[calc(100vh-2rem)] rounded-[32px] my-4 ml-4 shadow-2xl shadow-blue-500/20 sticky top-4 transition-all">
        <SidebarLogo />
        
        <div className="flex-1 flex flex-col justify-center">
          <NavList activeView={props.activeView} onViewChange={props.onViewChange} />
        </div>

        <SidebarFooter />
      </aside>
    </SidebarProvider>
  );
};
