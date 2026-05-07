import type { FC } from 'react';
import { PatientProfile } from '../PatientProfile';
import { DiseaseGaugesSection } from './DiseaseGaugesSection';
import { ExplanationSection } from './ExplanationSection';
import { DashboardLayout } from './DashboardLayout';
import { useDashboard } from '../../hooks/dashboard/useDashboard';

/**
 * AnalysisView Component
 * Displays the clinical diagnostic results.
 * Now consumes data directly from DashboardContext.
 */
export const AnalysisView: FC = () => {
  const { patientData } = useDashboard();
  
  if (!patientData) return null;

  const leftPanel = <PatientProfile data={patientData} />;

  const rightPanel = (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <h2 className="text-lg font-black text-gray-800 uppercase tracking-tight">
          Multivariate Disease Risk Analysis
        </h2>
        <DiseaseGaugesSection />
      </div>
      
      <ExplanationSection />
    </div>
  );

  return <DashboardLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
};
