import React, { createContext, useContext, ReactNode } from 'react';
import { LayoutGrid, User, Heart, ClipboardList, Settings } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: any;
}

interface SidebarContextType {
  navItems: NavItem[];
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'patient-profile', label: 'Patient Profile', icon: User },
    { id: 'analysis', label: 'Analysis', icon: Heart },
    { id: 'history', label: 'History', icon: ClipboardList },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const value = { navItems };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
