import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PredictionResponse, PredictionState, HistoryEntry, PatientInput } from '../../../types';

export interface ExtendedPredictionState {
  currentPatient: PatientInput | null;
  results: PredictionResponse | null;
  history: Array<{
    id: string;
    timestamp: string;
    results: PredictionResponse;
  }>;
  loading: boolean;
  error: string | null;
  submitted: boolean;
}

const initialState: ExtendedPredictionState = {
  currentPatient: null,
  results: null,
  history: [],
  loading: false,
  error: null,
  submitted: false,
};

export const predictionSlice = createSlice({
  name: 'prediction',
  initialState,
  reducers: {
    setPredictionResults: (state, action: PayloadAction<{ patient: PatientInput; results: PredictionResponse }>) => {
      state.currentPatient = action.payload.patient;
      state.results = action.payload.results;
      state.submitted = true;
      // Add to history with timestamp
      state.history.unshift({
        id: `ASN-${Date.now()}`,
        timestamp: new Date().toISOString(),
        results: action.payload.results,
      });
    },
    clearPredictionResults: (state) => {
      state.currentPatient = null;
      state.results = null;
      state.submitted = false;
    },
    loadPredictionFromHistory: (state, action: PayloadAction<PredictionResponse>) => {
      state.results = action.payload;
      state.submitted = true;
    },
    clearPredictionHistory: (state) => {
      state.history = [];
    },
    removePredictionFromHistory: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter(item => item.id !== action.payload);
    },
  },
});

export const {
  setPredictionResults,
  clearPredictionResults,
  loadPredictionFromHistory,
  clearPredictionHistory,
  removePredictionFromHistory,
} = predictionSlice.actions;

export default predictionSlice.reducer;
