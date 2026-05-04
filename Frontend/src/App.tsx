/**
 * App Component
 * Main application entry point
 * Orchestrates the form, prediction, and results views
 */

import { useEffect, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
import { PatientForm } from './components/PatientForm';
import { usePrediction } from './hooks/usePrediction';
import { healthCheck } from './api/health';
import type { PatientInput } from './types';
import './App.css';

type AppView = 'dashboard' | 'form' | 'history' | 'settings';

function App() {
  const { data, loading, error, submit } = usePrediction();
  const [view, setView] = useState<AppView>('form');
  const [backendAvailable, setBackendAvailable] = useState(true);
  const [checkingBackend, setCheckingBackend] = useState(true);

  // Check if backend is available on mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const available = await healthCheck();
        setBackendAvailable(available);
      } catch {
        setBackendAvailable(false);
      } finally {
        setCheckingBackend(false);
      }
    };

    checkBackend();
  }, []);

  const handleFormSubmit = async (formData: PatientInput) => {
    if (!backendAvailable) {
      alert('Backend API is not available. Please ensure the backend server is running.');
      return;
    }
    await submit(formData);
    setView('dashboard');
  };

  const handleViewChange = (newView: string) => {
    setView(newView as AppView);
  };

  return (
    <div className="app-wrapper">
      <Sidebar activeView={view} onViewChange={handleViewChange} />

      {checkingBackend && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center">
            <div className="spinner"></div>
            <p className="text-gray-700 mt-4">Initializing Health-ON-ML...</p>
          </div>
        </div>
      )}

      {!checkingBackend && !backendAvailable && (
        <div className="flex items-center justify-center min-h-screen bg-red-50 flex-1">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h1>
            <p className="text-gray-700 mb-4">
              Unable to connect to the Health-ON-ML backend API.
            </p>
            <p className="text-gray-600 text-sm mb-6">
              Please ensure the backend server is running at{' '}
              <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:8000</code>
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Retry Connection
            </button>
          </div>
        </div>
      )}

      {!checkingBackend && backendAvailable && (
        <div className="app-content">
          {error && (
            <div className="error-banner">
              <h3>Error</h3>
              <p>{error}</p>
            </div>
          )}

          {view === 'form' && (
            <div className="form-container">
              <PatientForm onSubmit={handleFormSubmit} isLoading={loading} />
            </div>
          )}

          {view === 'dashboard' && (
            <Dashboard
              onFormSubmit={handleFormSubmit}
              patientData={data as PatientInput | null}
              results={data}
              isLoading={loading}
            />
          )}

          {view === 'history' && (
            <div className="content-panel">
              <h1>Assessment History</h1>
              <p>Coming soon...</p>
            </div>
          )}

          {view === 'settings' && (
            <div className="content-panel">
              <h1>Settings</h1>
              <p>Coming soon...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
