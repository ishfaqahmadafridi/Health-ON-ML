import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderContextType {
  isUserDropdownOpen: boolean;
  setIsUserDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchFocused: boolean;
  setIsSearchFocused: React.Dispatch<React.SetStateAction<boolean>>;
  notificationCount: number;
  handleLogout: () => void;
}

export const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      // Add logout logic here
      console.log('Logging out...');
    }
  };

  const value = {
    isUserDropdownOpen,
    setIsUserDropdownOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isSearchFocused,
    setIsSearchFocused,
    notificationCount: 3, // Mock count
    handleLogout
  };

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};
