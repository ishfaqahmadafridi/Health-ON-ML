import { useContext } from 'react';
import { PatientFormContext } from '../../context/form/PatientFormContext';

/**
 * Global hook to consume the PatientForm Context.
 * Allows atomic form sections (Medical, Personal, Lifestyle) 
 * to access and update the shared form state directly.
 */
export const usePatientForm = () => {
  const context = useContext(PatientFormContext);
  if (context === undefined) {
    throw new Error('usePatientForm must be used within a PatientFormProvider');
  }
  return context;
};
