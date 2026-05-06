import { createAsyncThunk } from '@reduxjs/toolkit';
import type { PatientInput, PredictionResponse } from '../types';
import { predictHealthRisks, savePrediction } from '../api/health';

/**
 * Async thunk for fetching predictions from the API
 * Handles API call, error handling, and async state management
 */
export const fetchPrediction = createAsyncThunk(
  'prediction/fetchPrediction',
  async (patientData: PatientInput, { rejectWithValue }) => {
    try {
      const response = await predictHealthRisks(patientData);
      
      // Save to backend history (non-blocking)
      savePrediction(patientData, response).catch((err) => {
        console.warn('Failed to save prediction to history:', err);
      });
      
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch prediction';
      return rejectWithValue(message);
    }
  }
);

/**
 * Async thunk for checking backend health
 */
export const checkBackendHealth = createAsyncThunk(
  'ui/checkBackendHealth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8000/api/health');
      return response.ok;
    } catch (error) {
      return rejectWithValue(false);
    }
  }
);
