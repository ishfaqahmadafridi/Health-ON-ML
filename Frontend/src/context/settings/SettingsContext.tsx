import React, { createContext, useContext, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearHistory, clearPredictionHistory, togglePreference } from '../../store/slices';

interface SettingsContextType {
  preferences: {
    darkMode: boolean;
    notifications: boolean;
    compactMode: boolean;
    autoSave: boolean;
  };
  handleToggle: (key: 'darkMode' | 'notifications' | 'compactMode' | 'autoSave') => void;
  handleClearHistory: () => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const preferences = useAppSelector(state => state.ui.preferences);

  const handleToggle = (key: keyof typeof preferences) => {
    dispatch(togglePreference(key));
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all assessment history? This cannot be undone.')) {
      dispatch(clearHistory());
      dispatch(clearPredictionHistory());
      alert('History cleared successfully.');
    }
  };

  const value = {
    preferences,
    handleToggle,
    handleClearHistory
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
