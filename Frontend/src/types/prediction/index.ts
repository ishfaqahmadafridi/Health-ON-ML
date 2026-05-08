export interface DiseaseRisk {
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  description: string;
}

export interface PredictionResponse {
  heart: DiseaseRisk;
  diabetes: DiseaseRisk;
  kidney: DiseaseRisk;
  timestamp?: string;
  patientId?: string;
}

export interface HistoryEntry {
  id: number;
  patientName: string;
  patientAge: number;
  patientGender: string;
  patientInput: any;
  predictionResult: PredictionResponse;
  createdAt: string;
}

export interface PredictionState {
  data: PredictionResponse | null;
  history: HistoryEntry[];
  loading: boolean;
  error: string | null;
  submitted: boolean;
}
