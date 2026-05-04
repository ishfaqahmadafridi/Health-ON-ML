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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeView={view} onViewChange={handleViewChange} />

      {checkingBackend && (
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
            <p className="text-gray-700">Initializing Health-ON-ML...</p>
          </div>
        </div>
      )}

      {!checkingBackend && !backendAvailable && (
        <div className="flex-1 flex items-center justify-center bg-red-50">
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
        <div className="flex-1 flex flex-col">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-6">
              <h3 className="font-semibold text-red-800 mb-2">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {view === 'form' && (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="w-full max-w-2xl">
                <PatientForm onSubmit={handleFormSubmit} isLoading={loading} />
              </div>
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
            <div className="flex-1 p-6 bg-white rounded-lg shadow-sm m-6">
              <h1 className="text-3xl font-bold mb-6 text-gray-900">Assessment History</h1>
              <p className="text-gray-500">Coming soon...</p>
            </div>
          )}

          {view === 'settings' && (
            <div className="flex-1 p-6 bg-white rounded-lg shadow-sm m-6">
              <h1 className="text-3xl font-bold mb-6 text-gray-900">Settings</h1>
              <p className="text-gray-500">Coming soon...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
