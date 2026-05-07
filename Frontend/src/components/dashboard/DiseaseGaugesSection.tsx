import type { FC } from 'react';
import { DiseaseGauge } from './DiseaseGauge';
import { useDashboard } from '../../hooks/dashboard/useDashboard';

/**
 * Section rendering the three primary disease risk gauges.
 * Now consumes results directly from DashboardContext.
 */
export const DiseaseGaugesSection: FC = () => {
  const { results } = useDashboard();

  if (!results) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <DiseaseGauge
        disease="Heart Disease"
        riskScore={results.heartDisease.riskScore}
        riskLevel={results.heartDisease.level}
        description="Probability based on BP, Cholesterol, and Lifestyle factors."
      />
      <DiseaseGauge
        disease="Type 2 Diabetes"
        riskScore={results.diabetes.riskScore}
        riskLevel={results.diabetes.level}
        description="Risk based on Glucose, BMI, and Age demographics."
      />
      <DiseaseGauge
        disease="Kidney Disease"
        riskScore={results.kidneyDisease.riskScore}
        riskLevel={results.kidneyDisease.level}
        description="Assessment of renal stress and hydration markers."
      />
    </div>
  );
};
