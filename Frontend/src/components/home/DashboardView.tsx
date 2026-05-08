import { useNavigate } from 'react-router-dom';
import { Dashboard } from '../dashboard';
import { useAppDispatch, useAppSelector } from '../../store';
import { usePrediction } from '../../hooks/prediction/usePrediction';
import { setError, setPredictionResults } from '../../store/slices';
import type { PatientInput } from '../../types';

export const DashboardView = () => {
  const dispatch = useAppDispatch();
  const { loading, error, submit } = usePrediction();
  const { currentPatient, results } = useAppSelector(state => state.prediction);
  const navigate = useNavigate();

  const handleFormSubmit = async (formData: PatientInput) => {
    try {
      const predictionResults = await submit(formData);
      dispatch(setPredictionResults({ patient: formData, results: predictionResults }));
      navigate('/');
    } catch (err) {
      dispatch(setError((err as Error).message));
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-red-500"></div>
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}
      <Dashboard
        onFormSubmit={handleFormSubmit}
        patientData={currentPatient}
        results={results}
        isLoading={loading}
        error={error}
      />
    </div>
  );
};
