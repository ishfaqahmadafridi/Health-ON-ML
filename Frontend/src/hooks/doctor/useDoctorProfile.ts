import { useContext } from 'react';
import { DoctorProfileContext } from '../../context/doctor/DoctorProfileContext';

/**
 * Global hook to consume the DoctorProfile Context
 */
export const useDoctorProfile = () => {
  const context = useContext(DoctorProfileContext);
  if (context === undefined) {
    throw new Error('useDoctorProfile must be used within a DoctorProfileProvider');
  }
  return context;
};
