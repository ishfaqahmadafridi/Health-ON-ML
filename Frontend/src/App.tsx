/**
 * App Component
 * Main application entry point
 * Orchestrates the form, prediction, and results views
 */

import { useEffect, useState } from 'react';
import { Dashboard } from './components/dashboard';
import { Sidebar } from './components/Sidebar';
import { usePrediction } from './hooks/usePrediction';
import { healthCheck } from './api/health';
import type { PatientInput } from './types';

function App() {
  const { data, loading, error, submit } = usePrediction();
  const [checkingBackend, setCheckingBackend] = useState(true);

  // Check if backend is available on mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        await healthCheck();
      } catch (err) {
        console.warn('Backend health check failed:', err);
        // Continue anyway - allow frontend-only testing
      } finally {
        setCheckingBackend(false);
      }
    };

    checkBackend();
  }, []);

  const handleFormSubmit = async (formData: PatientInput) => {
    await submit(formData);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeView="dashboard" onViewChange={() => {}} />

      {checkingBackend && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
              <div className="w-full h-full border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600">Initializing Health-ON-ML...</p>
          </div>
        </div>
      )}

      {!checkingBackend && (
        <>
          {error && (
            <div className="absolute top-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
              <h3 className="font-semibold text-red-800 mb-2">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <Dashboard
            onFormSubmit={handleFormSubmit}
            patientData={data as PatientInput | null}
            results={data}
            isLoading={loading}
          />
        </>
      )}
    </div>
  );
}

export default App;
