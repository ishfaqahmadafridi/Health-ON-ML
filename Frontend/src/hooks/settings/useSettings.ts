import { useContext } from 'react';
import { SettingsContext } from '../../context/settings/SettingsContext';

/**
 * Global hook to consume the Settings Context
 */
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
