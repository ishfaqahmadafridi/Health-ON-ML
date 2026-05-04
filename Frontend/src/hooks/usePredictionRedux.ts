import { useCallback } from 'react';
import type { PatientInput, PredictionResponse } from '../types';
import { predictHealthRisks, savePrediction } from '../api/health';
import {
  useAppDispatch,
  useAppSelector,
  setPatientData,
  setPredictionResults,
  setLoading,
  setError,
  clearError,
} from '../store';

/**
 * Custom hook for Redux-integrated prediction logic
 * Handles form submission, API calls, and state management
 */
export const usePredictionRedux = () => {
  const dispatch = useAppDispatch();
  const { data: patientData } = useAppSelector(state => state.patient);
  const { results } = useAppSelector(state => state.prediction);
  const { loading, error } = useAppSelector(state => state.ui);

  const submit = useCallback(
    async (patientData: PatientInput) => {
      try {
        dispatch(clearError());
        dispatch(setLoading(true));

        // Save patient data to Redux
        dispatch(setPatientData(patientData));

        // Call API to get predictions
        const response = await predictHealthRisks(patientData);

        // Save prediction results to Redux
        dispatch(setPredictionResults(response));

        // Save to backend history (non-blocking)
        savePrediction(patientData, response).catch((err) => {
          console.warn('Failed to save prediction to history:', err);
        });

        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Prediction failed';
        dispatch(setError(errorMessage));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    dispatch(setPatientData(null));
    dispatch(setPredictionResults(null));
    dispatch(clearError());
  }, [dispatch]);

  return {
    patientData,
    results,
    loading,
    error,
    submit,
    reset,
  };
};
