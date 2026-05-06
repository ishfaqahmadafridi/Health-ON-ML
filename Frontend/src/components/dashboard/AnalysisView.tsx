import type { FC } from 'react';
import { PatientProfile } from '../PatientProfile';
import { DashboardHeader } from './DashboardHeader';
import { DiseaseGaugesSection } from './DiseaseGaugesSection';
import { ExplanationSection } from './ExplanationSection';
import { KeyFactorsSection } from './KeyFactorsSection';
import { DashboardActions } from './DashboardActions';
import { DashboardLayout } from './DashboardLayout';
import type { PatientInput, PredictionResponse } from '../../types';

interface AnalysisViewProps {
  patientData: PatientInput;
  results: PredictionResponse | null;
  onNewAssessment: () => void;
}

export const AnalysisView: FC<AnalysisViewProps> = ({
  patientData,
  results,
  onNewAssessment,
}) => {
  const leftPanel = <PatientProfile data={patientData} />;

  const rightPanel = (
    <div className="max-w-4xl mx-auto">
      <DashboardHeader onNewAssessment={onNewAssessment} />
      <DiseaseGaugesSection results={results} />
      <ExplanationSection />
      <KeyFactorsSection />
      <DashboardActions onNewAssessment={onNewAssessment} />
    </div>
  );

  return <DashboardLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
};
