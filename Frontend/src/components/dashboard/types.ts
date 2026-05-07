import type { PatientInput, PredictionResponse } from '../../types';

export interface DashboardProps {
  onFormSubmit: (data: PatientInput) => Promise<void>;
  patientData: PatientInput | null;
  results: PredictionResponse | null;
  isLoading: boolean;
}
