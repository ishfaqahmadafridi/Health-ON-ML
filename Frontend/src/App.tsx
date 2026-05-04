/**
 * App Component
 * Main application entry point
 * Orchestrates the form, prediction, and results views
 */

import React, { useEffect, useState } from 'react';
import { PatientForm } from './components/PatientForm';
import { ResultsView } from './components/ResultsView';
import { usePrediction } from './hooks/usePrediction';
import { healthCheck } from './api/health';
import './App.css';

type AppView = 'form' | 'results' | 'error';

function App() {
  const { data, loading, error, submitted, submit, reset } = usePrediction();
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

  const handleFormSubmit = async (formData: React.ComponentProps<typeof PatientForm>['onSubmit']) => {
    if (!backendAvailable) {
      alert('Backend API is not available. Please ensure the backend server is running.');
      return;
    }
    await submit(formData);
    setView('results');
  };

  const handleNewAssessment = () => {
    reset();
    setView('form');
  };

  if (checkingBackend) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-700">Initializing Health-ON-ML...</p>
        </div>
      </div>
    );
  }

  if (!backendAvailable) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-600">Health-ON-ML</h1>
          <p className="text-sm text-gray-600">
            General Health Risk Prediction System
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 mb-2">Error</h3>
            <p className="text-red-700">{error}</p>
            {view !== 'form' && (
              <button
                onClick={handleNewAssessment}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              >
                Back to Form
              </button>
            )}
          </div>
        )}

        {view === 'form' && (
          <PatientForm onSubmit={handleFormSubmit} isLoading={loading} />
        )}

        {view === 'results' && data && (
          <ResultsView results={data} onNewAssessment={handleNewAssessment} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 mt-16">
        <p>© 2024 Health-ON-ML. This tool is for educational purposes only.</p>
        <p className="text-xs mt-2">
          Please consult a healthcare professional for medical advice.
        </p>
      </footer>
    </div>
  );
}

export default App;
