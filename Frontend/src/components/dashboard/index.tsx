import type { FC } from 'react';
import { FormView } from './FormView';
import { AnalysisView } from './AnalysisView';
import { DashboardEmptyState } from './DashboardEmptyState';
import { useDashboardState } from './useDashboardState';
import type { PatientInput, PredictionResponse } from '../../types';

export interface DashboardProps {
  onFormSubmit: (data: PatientInput) => Promise<void>;
  patientData: PatientInput | null;
  results: PredictionResponse | null;
  isLoading: boolean;
}

/**
 * Dashboard Component
 * Orchestrates the main dashboard experience with three views:
 * 1. EmptyState - Initial welcome screen
 * 2. FormView - Patient form for data entry
 * 3. AnalysisView - Results and analysis display
 *
 * Child Components:
 * - FormView: Renders patient form
 * - AnalysisView: Renders results with multiple sub-components
 *   - DashboardLayout: Two-column layout
 *   - DashboardHeader: Title and action button
 *   - DiseaseGaugesSection: Three risk gauge cards
 *   - ExplanationSection: AI explanation card
 *   - KeyFactorsSection: Contributing factors visualization
 *   - DashboardActions: Action buttons
 */
export const Dashboard: FC<DashboardProps> = ({
  onFormSubmit,
  patientData,
  results,
  isLoading,
}) => {
  const hasData = !!patientData;
  const { currentView, setView } = useDashboardState(hasData);

  const handleFormSubmit = async (data: PatientInput) => {
    await onFormSubmit(data);
    setView('analysis');
  };

  const handleNewAssessment = () => {
    setView('form');
  };

  // View: Form - Show form when no data exists
  if (currentView === 'form' && !patientData) {
    return (
      <FormView onSubmit={handleFormSubmit} isLoading={isLoading} />
    );
  }

  // View: Analysis - Show results when data exists
  if (currentView === 'analysis' && patientData) {
    return (
      <AnalysisView
        patientData={patientData}
        results={results}
        onNewAssessment={handleNewAssessment}
      />
    );
  }

  // View: Empty - Show welcome screen initially
  return (
    <DashboardEmptyState onStartAssessment={() => setView('form')} />
  );
};

// Export all dashboard sub-components for flexibility
export { DashboardLayout } from './DashboardLayout';
export { LeftPanel } from './LeftPanel';
export { RightPanel } from './RightPanel';
export { DashboardHeader } from './DashboardHeader';
export { DiseaseGaugesSection } from './DiseaseGaugesSection';
export { ExplanationSection } from './ExplanationSection';
export { KeyFactorsSection } from './KeyFactorsSection';
export { DashboardActions } from './DashboardActions';
export { FormView } from './FormView';
export { AnalysisView } from './AnalysisView';
export { PatientDataSummary } from './PatientDataSummary';
export { DashboardEmptyState } from './DashboardEmptyState';
export { useDashboardState } from './useDashboardState';
