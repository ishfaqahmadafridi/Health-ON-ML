import { useContext } from 'react';
import { DetailedProfileContext } from '../../context/patient/DetailedProfileContext';

/**
 * Hook to consume the detailed patient profile context
 */
export const useDetailedProfile = () => {
  const context = useContext(DetailedProfileContext);
  if (context === undefined) {
    throw new Error('useDetailedProfile must be used within a DetailedProfileProvider');
  }
  return context;
};
