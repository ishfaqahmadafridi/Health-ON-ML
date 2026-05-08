import { createAsyncThunk } from '@reduxjs/toolkit';
import type { PatientInput, PredictionResponse } from '../../types';
import { predictHealthRisks, savePrediction, healthCheck } from '../../api/health';
import { addNotification } from '../slices';

/**
 * Async thunk for fetching predictions from the API
 * Handles API call, error handling, and async state management
 */
export const fetchPrediction = createAsyncThunk(
  'prediction/fetchPrediction',
  async (patientData: PatientInput, { dispatch, rejectWithValue }) => {
    try {
      const response = await predictHealthRisks(patientData);
      
      // Save to backend history (non-blocking)
      savePrediction(patientData, response).catch((err) => {
        console.warn('Failed to save prediction to history:', err);
      });

      // Check for high risk results and trigger notification
      const risks = [
        { label: 'Heart Disease', value: response.heart.riskScore },
        { label: 'Diabetes', value: response.diabetes.riskScore },
        { label: 'Kidney Disease', value: response.kidney.riskScore }
      ];

      const highRisk = risks.find(r => r.value > 70);
      if (highRisk) {
        dispatch(addNotification({
          title: 'High Risk Alert',
          message: `Patient ${patientData.name || 'P-Unknown'} flagged for ${highRisk.label} (${highRisk.value}%)`,
          type: 'alert'
        }));
      } else {
        dispatch(addNotification({
          title: 'Assessment Complete',
          message: `Risk analysis for Patient ${patientData.name || 'P-Unknown'} is ready`,
          type: 'success'
        }));
      }
      
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
      const isHealthy = await healthCheck();
      return isHealthy;
    } catch (error) {
      return rejectWithValue(false);
    }
  }
);
