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
 * Implements the Narrow Navy Sidebar from the reference image.
 */
export const Sidebar: FC<SidebarProps> = (props) => {
  return (
    <SidebarProvider>
      <aside className="w-16 bg-[#0B3B6F] flex flex-col items-center py-6 h-[calc(100vh-2rem)] rounded-[32px] my-4 ml-4 shadow-xl sticky top-4 transition-all z-50">
        <SidebarLogo />
        
        <div className="flex-1 flex flex-col items-center gap-4 mt-10">
          <NavList activeView={props.activeView} onViewChange={props.onViewChange} />
        </div>

        <SidebarFooter />
      </aside>
    </SidebarProvider>
  );
};
