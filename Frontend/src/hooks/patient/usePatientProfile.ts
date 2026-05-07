import { useContext } from 'react';
import { PatientProfileContext } from '../../context/patient/PatientProfileContext';

/**
 * Global hook to consume the PatientProfile Context
 */
export const usePatientProfile = () => {
  const context = useContext(PatientProfileContext);
  if (context === undefined) {
    throw new Error('usePatientProfile must be used within a PatientProfileProvider');
  }
  return context;
};
