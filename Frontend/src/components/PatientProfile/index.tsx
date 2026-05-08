import type { FC } from 'react';
import { DetailedProfileProvider } from '../../context/patient/DetailedProfileContext';
import { DetailedPatientProfile } from './DetailedPatientProfile';

/**
 * Advanced Patient Profile Entry Point
 * Provides clinical vitals, biometrics, and AI feature importance (SHAP).
 */
import type { PatientInput } from '../../types';

interface PatientProfileProps {
  data: PatientInput;
}

export const PatientProfile: FC<PatientProfileProps> = ({ data }) => {
  return (
    <DetailedProfileProvider initialData={data}>
      <DetailedPatientProfile />
    </DetailedProfileProvider>
  );
};
