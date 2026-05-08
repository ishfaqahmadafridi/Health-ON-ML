import type { FC } from 'react';
import { DashboardProvider } from '../../context/dashboard/DashboardContext';
import { useDashboard } from '../../hooks/dashboard/useDashboard';
import { FormView } from './FormView';
import { AnalysisView } from './AnalysisView';
import { DashboardEmptyState } from './DashboardEmptyState';
import type { DashboardProps } from './types';

import { useLocation } from 'react-router-dom';

/**
 * Internal content component that consumes the Dashboard Context
 */
const DashboardContent: FC = () => {
  const { currentView, patientData } = useDashboard();
  const location = useLocation();

  // Route: /analysis -> Show the Patient Form for data entry
  if (location.pathname === '/analysis') {
    return (
      <div className="w-full max-w-xl mx-auto pb-10">
        <FormView />
      </div>
    );
  }

  // Route: / (Dashboard) -> Show BOTH Form and Graphs side-by-side
  return (
    <div className="flex gap-8 items-start w-full max-w-[1600px] mx-auto pb-10">
      <div className="w-[380px] shrink-0">
        <FormView />
      </div>
      <div className="flex-1 min-w-0">
        {patientData ? (
          <AnalysisView />
        ) : (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
            <div className="text-center p-10">
              <h3 className="text-xl font-bold text-gray-400 mb-2">No Analysis Data</h3>
              <p className="text-sm text-gray-400 max-w-sm">
                Enter the patient's profile and input data on the left, then click Predict Multi-Risk to view the analysis here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
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
      error={props.error}
    >
      <DashboardContent />
    </DashboardProvider>
  );
};
