import { createSlice } from '@reduxjs/toolkit';
import type { PredictionResponse } from '../../types';

interface PredictionState {
  results: PredictionResponse | null;
  history: Array<{
    id: string;
    timestamp: string;
    results: PredictionResponse;
  }>;
}

const initialState: PredictionState = {
  results: null,
  history: [],
};

export const predictionSlice = createSlice({
  name: 'prediction',
  initialState,
  reducers: {
    setPredictionResults: (state, action) => {
      state.results = action.payload as PredictionResponse;
      // Add to history with timestamp
      state.history.unshift({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        results: state.results,
      });
    },
    clearPredictionResults: (state) => {
      state.results = null;
    },
    loadPredictionFromHistory: (state, action) => {
      state.results = action.payload as PredictionResponse;
    },
    clearPredictionHistory: (state) => {
      state.history = [];
    },
    removePredictionFromHistory: (state, action) => {
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
