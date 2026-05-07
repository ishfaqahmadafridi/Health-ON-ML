import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PredictionResponse, PredictionState, HistoryEntry } from '../../../types';

const initialState: PredictionState = {
  data: null,
  history: [],
  loading: false,
  error: null,
  submitted: false,
};

export const predictionSlice = createSlice({
  name: 'prediction',
  initialState,
  reducers: {
    setPredictionResults: (state, action: PayloadAction<PredictionResponse>) => {
      state.data = action.payload;
      state.submitted = true;
      // Add to history with timestamp
      state.history.unshift({
        id: `ASN-${Date.now()}`,
        timestamp: new Date().toISOString(),
        results: action.payload,
      });
    },
    clearPredictionResults: (state) => {
      state.data = null;
      state.submitted = false;
    },
    loadPredictionFromHistory: (state, action: PayloadAction<PredictionResponse>) => {
      state.data = action.payload;
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
