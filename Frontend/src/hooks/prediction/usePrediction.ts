import { useState } from 'react';
import type { PatientInput, PredictionResponse } from '../../types';
import { predictHealthRisks } from '../../api/health';

/**
 * Hook for handling individual prediction logic without Redux
 */
export const usePrediction = () => {
  const [data, setData] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (patientData: PatientInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await predictHealthRisks(patientData);
      setData(response);
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Prediction failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setData(null);
    setError(null);
  };

  return { data, loading, error, submit, clear };
};
