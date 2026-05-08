import { useAppDispatch, useAppSelector } from '../../store';
import { fetchPrediction } from '../../store/thunks/predictionThunks';
import { clearPredictionResults } from '../../store/slices';
import type { PatientInput } from '../../types';

/**
 * Hook for handling prediction logic integrated with Redux state
 */
export const usePredictionRedux = () => {
  const dispatch = useAppDispatch();
  const { results: data, currentPatient, history, loading, error, submitted } = useAppSelector(
    (state) => state.prediction
  );

  const submitAssessment = async (patientData: PatientInput) => {
    try {
      await dispatch(fetchPrediction(patientData)).unwrap();
    } catch (err) {
      console.error('Assessment failed:', err);
    }
  };

  const resetAssessment = () => {
    dispatch(clearPredictionResults());
  };

  return {
    results: data,
    isLoading: loading,
    error,
    isSubmitted: submitted,
    submitAssessment,
    resetAssessment,
  };
};
