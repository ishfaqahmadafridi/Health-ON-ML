export interface DiseaseRisk {
  riskScore: number;
  level: 'Low' | 'Medium' | 'High';
  probability?: number;
}

export interface PredictionResponse {
  heartDisease: DiseaseRisk;
  diabetes: DiseaseRisk;
  kidneyDisease: DiseaseRisk;
  timestamp?: string;
  patientId?: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: string;
  results: PredictionResponse;
}

export interface PredictionState {
  data: PredictionResponse | null;
  history: HistoryEntry[];
  loading: boolean;
  error: string | null;
  submitted: boolean;
}
