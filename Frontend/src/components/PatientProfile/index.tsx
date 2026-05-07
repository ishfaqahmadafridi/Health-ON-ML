import type { FC } from 'react';
import { DetailedProfileProvider } from '../../context/patient/DetailedProfileContext';
import { DetailedPatientProfile } from './DetailedPatientProfile';

/**
 * Advanced Patient Profile Entry Point
 * Provides clinical vitals, biometrics, and AI feature importance (SHAP).
 */
export const PatientProfile: FC = () => {
  return (
    <DetailedProfileProvider>
      <DetailedPatientProfile />
    </DetailedProfileProvider>
  );
};
