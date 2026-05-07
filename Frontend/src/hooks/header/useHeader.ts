import { useContext } from 'react';
import { HeaderContext } from '../../context/header/HeaderContext';

/**
 * Global hook to consume the Header Context
 */
export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};
