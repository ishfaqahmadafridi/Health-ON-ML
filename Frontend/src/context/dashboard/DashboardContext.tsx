import React, { createContext, useContext, ReactNode } from 'react';
import { useDashboardState } from '../../hooks/dashboard/useDashboardState';
import type { PatientInput, PredictionResponse } from '../../types';

interface DashboardContextType {
  currentView: 'empty' | 'form' | 'analysis';
  setView: (view: 'empty' | 'form' | 'analysis') => void;
  patientData: PatientInput | null;
  results: PredictionResponse | null;
  isLoading: boolean;
  error: string | null;
  onFormSubmit: (data: PatientInput) => Promise<void>;
  handleNewAssessment: () => void;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{
  children: ReactNode;
  onFormSubmit: (data: PatientInput) => Promise<void>;
  patientData: PatientInput | null;
  results: PredictionResponse | null;
  isLoading: boolean;
  error?: string | null;
}> = ({ children, onFormSubmit, patientData, results, isLoading, error = null }) => {
  const hasData = !!patientData;
  const { currentView, setView } = useDashboardState(hasData);

  const handleSubmit = async (data: PatientInput) => {
    try {
      await onFormSubmit(data);
      setView('analysis');
    } catch (err) {
      // Error handling is managed by the parent, but we keep analysis view 
      // if it was already showing or switch back to form if needed
    }
  };

  const handleNewAssessment = () => {
    setView('form');
  };

  const value = {
    currentView,
    setView,
    patientData,
    results,
    isLoading,
    error: error || null,
    onFormSubmit: handleSubmit,
    handleNewAssessment
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};
