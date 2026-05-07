import type { FC } from 'react';
import { DashboardProvider } from '../../context/dashboard/DashboardContext';
import { useDashboard } from '../../hooks/dashboard/useDashboard';
import { FormView } from './FormView';
import { AnalysisView } from './AnalysisView';
import { DashboardEmptyState } from './DashboardEmptyState';
import type { DashboardProps } from './types';

/**
 * Internal content component that consumes the Dashboard Context
 */
const DashboardContent: FC = () => {
  const { currentView, patientData, onFormSubmit, isLoading, setView, handleNewAssessment } = useDashboard();

  // View: Form - Show form when requested or when no data exists
  if (currentView === 'form' && !patientData) {
    return <FormView />;
  }

  // View: Analysis - Show results when data exists
  if (currentView === 'analysis' && patientData) {
    return <AnalysisView />;
  }

  // View: Empty - Show welcome screen initially
  return <DashboardEmptyState onStartAssessment={() => setView('form')} />;
};

/**
 * Main Dashboard Entry Point
 * Wraps the clinical workflow in the DashboardProvider
 */
export const Dashboard: FC<DashboardProps> = (props) => {
  return (
    <DashboardProvider 
      onFormSubmit={props.onFormSubmit}
      patientData={props.patientData}
      results={props.results}
      isLoading={props.isLoading}
    >
      <DashboardContent />
    </DashboardProvider>
  );
};
