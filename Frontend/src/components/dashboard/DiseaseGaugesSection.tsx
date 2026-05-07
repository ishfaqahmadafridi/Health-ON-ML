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
        label="Heart Disease"
        score={results.heartDisease.riskScore}
        level={results.heartDisease.level}
        color="rose"
      />
      <DiseaseGauge
        label="Type 2 Diabetes"
        score={results.diabetes.riskScore}
        level={results.diabetes.level}
        color="amber"
      />
      <DiseaseGauge
        label="Kidney Disease"
        score={results.kidneyDisease.riskScore}
        level={results.kidneyDisease.level}
        color="emerald"
      />
    </div>
  );
};
