import { useContext } from 'react';
import { HistoryContext } from '../../context/history/HistoryContext';

/**
 * Global hook to consume the History Context
 */
export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
