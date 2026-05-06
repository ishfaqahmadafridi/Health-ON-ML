/**
 * Example Redux Integration
 * This file demonstrates how to use Redux in components throughout the app
 */

import type { FC } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  setPatientData,
  setPredictionResults,
  setError,
  clearError,
  setLoading,
  setCurrentView,
  openModal,
  closeModal,
} from '../store';
import { predictHealthRisks } from '../api/health';
import type { PatientInput } from '../types';

/**
 * Example 1: Simple Selector Usage
 * Reading state from Redux
 */
export const ExampleReadState: FC = () => {
  const patientData = useAppSelector(state => state.patient.data);
  const results = useAppSelector(state => state.prediction.results);
  const loading = useAppSelector(state => state.ui.loading);
  const error = useAppSelector(state => state.ui.error);

  return (
    <div>
      <p>Patient: {patientData?.age} years old</p>
      <p>Risk Score: {results?.heartDisease.riskScore}%</p>
      <p>Status: {loading ? 'Loading...' : 'Ready'}</p>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

/**
 * Example 2: Dispatching Actions
 * Writing state to Redux
 */
export const ExampleDispatchActions: FC = () => {
  const dispatch = useAppDispatch();

  const handlePatientSubmit = (formData: PatientInput) => {
    // Save patient data to Redux
    dispatch(setPatientData(formData));
    // Clear any previous errors
    dispatch(clearError());
    // Show loading state
    dispatch(setLoading(true));
  };

  const handleError = (message: string) => {
    dispatch(setError(message));
    dispatch(setLoading(false));
  };

  return (
    <button onClick={() => handlePatientSubmit({} as PatientInput)}>
      Submit Form
    </button>
  );
};

/**
 * Example 3: View Navigation
 * Using Redux to manage which view is shown
 */
export const ExampleViewNavigation: FC = () => {
  const dispatch = useAppDispatch();
  const currentView = useAppSelector(state => state.ui.currentView);

  return (
    <div>
      <p>Current View: {currentView}</p>
      <button onClick={() => dispatch(setCurrentView('form'))}>
        Show Form
      </button>
      <button onClick={() => dispatch(setCurrentView('analysis'))}>
        Show Analysis
      </button>
    </div>
  );
};

/**
 * Example 4: Modal Management
 * Using Redux to control modal state
 */
export const ExampleModalManagement: FC = () => {
  const dispatch = useAppDispatch();
  const { showModal, modalType } = useAppSelector(state => state.ui);

  return (
    <div>
      <button onClick={() => dispatch(openModal('pdf'))}>
        Generate PDF
      </button>
      <button onClick={() => dispatch(openModal('save'))}>
        Save Assessment
      </button>
      <button onClick={() => dispatch(closeModal())}>
        Close Modal
      </button>

      {showModal && modalType === 'pdf' && (
        <div>PDF Modal Content</div>
      )}
      {showModal && modalType === 'save' && (
        <div>Save Modal Content</div>
      )}
    </div>
  );
};

/**
 * Example 5: Complete Flow
 * Full example: Form submission -> API call -> Save results -> Update UI
 */
export const ExampleCompleteFlow: FC = () => {
  const dispatch = useAppDispatch();
  const patientData = useAppSelector(state => state.patient.data);
  const { loading, error } = useAppSelector(state => state.ui);

  const handleSubmitWithPrediction = async (formData: PatientInput) => {
    try {
      // 1. Save patient data
      dispatch(setPatientData(formData));

      // 2. Show loading
      dispatch(setLoading(true));
      dispatch(clearError());

      // 3. Make API call
      const results = await predictHealthRisks(formData);

      // 4. Save results
      dispatch(setPredictionResults(results));

      // 5. Switch view
      dispatch(setCurrentView('analysis'));
    } catch (err) {
      // Error handling
      const message = err instanceof Error ? err.message : 'Unknown error';
      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <button
        onClick={() => handleSubmitWithPrediction({} as PatientInput)}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Submit Assessment'}
      </button>
      {error && <div className="text-red-600">{error}</div>}
      {patientData && (
        <div>
          <p>Patient age: {patientData.age}</p>
        </div>
      )}
    </div>
  );
};

/**
 * Example 6: Accessing History
 * Using Redux to access patient and prediction history
 */
export const ExampleHistoryAccess: FC = () => {
  const patientHistory = useAppSelector(
    state => state.patient.history
  );
  const predictionHistory = useAppSelector(
    state => state.prediction.history
  );

  return (
    <div>
      <h2>Patient History ({patientHistory.length})</h2>
      {patientHistory.map((item, idx) => (
        <div key={idx}>
          <p>Age: {item.age}</p>
        </div>
      ))}

      <h2>Prediction History ({predictionHistory.length})</h2>
      {predictionHistory.map(item => (
        <div key={item.id}>
          <p>{new Date(item.timestamp).toLocaleString()}</p>
          <p>Heart Disease: {item.results.heartDisease.riskScore}%</p>
        </div>
      ))}
    </div>
  );
};

/**
 * Summary of Redux Usage Patterns:
 *
 * READ state:
 * const value = useAppSelector(state => state.slice.property);
 *
 * WRITE state:
 * const dispatch = useAppDispatch();
 * dispatch(actionCreator(payload));
 *
 * PATTERNS:
 * - Use selectors to read state
 * - Use dispatch to update state
 * - Combine multiple selectors for complex state
 * - Use thunks for async operations
 * - Keep components pure (no side effects in render)
 */
