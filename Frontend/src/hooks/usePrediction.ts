/**
 * usePrediction Hook
 * Manages prediction state and API calls
 */

import { useState, useCallback } from 'react';
import { PatientInput, PredictionResponse, PredictionState } from '../types';
import { predictHealthRisks, savePrediction } from '../api/health';

const initialState: PredictionState = {
  data: null,
  loading: false,
  error: null,
  submitted: false,
};

export function usePrediction() {
  const [state, setState] = useState<PredictionState>(initialState);

  const submit = useCallback(async (patientData: PatientInput) => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const result = await predictHealthRisks(patientData);
      setState((prev) => ({
        ...prev,
        data: result,
        loading: false,
        submitted: true,
        error: null,
      }));

      // Try to save to history (non-blocking)
      savePrediction(patientData, result).catch(() => {
        // Silently fail, prediction is already successful
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }));
    }
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    submit,
    reset,
  };
}
