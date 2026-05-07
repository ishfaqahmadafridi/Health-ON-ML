import type { FC } from 'react';
import type { PredictionResponse } from '../../types';
import { RiskCard } from './RiskCard';

// Sub-components
import { ResultsHeader } from './ResultsHeader';
import { RiskAlerts } from './RiskAlerts';
import { SummarySection } from './SummarySection';
import { ActionButtons } from './ActionButtons';
import { ResultsFooter } from './ResultsFooter';

export interface ResultsViewProps {
  results: PredictionResponse;
  onNewAssessment: () => void;
}

export const ResultsView: FC<ResultsViewProps> = ({ results, onNewAssessment }) => {
  const riskLevels = [
    results.heartDisease.level,
    results.diabetes.level,
    results.kidneyDisease.level,
  ];
  const hasHighRisk = riskLevels.includes('High');
  const hasMediumRisk = riskLevels.includes('Medium');

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <ResultsHeader />

        <RiskAlerts 
          hasHighRisk={hasHighRisk} 
          hasMediumRisk={hasMediumRisk} 
        />

        {/* Risk Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <RiskCard
            disease="heart"
            title="Heart Disease"
            icon="❤️"
            risk={results.heartDisease}
          />
          <RiskCard
            disease="diabetes"
            title="Diabetes"
            icon="🩸"
            risk={results.diabetes}
          />
          <RiskCard
            disease="kidney"
            title="Kidney Disease"
            icon="🧬"
            risk={results.kidneyDisease}
          />
        </div>

        <SummarySection />

        <ActionButtons onNewAssessment={onNewAssessment} />

        <ResultsFooter />
      </div>
    </div>
  );
};
