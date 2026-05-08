import type { FC } from 'react';
import { DiseaseGauge } from './DiseaseGauge';
import { useDashboard } from '../../hooks/dashboard/useDashboard';

/**
 * Section rendering the three primary disease risk gauges.
 * Consumes results directly from DashboardContext.
 */
export const DiseaseGaugesSection: FC = () => {
  const { results } = useDashboard();

  if (!results) return null;

  const gauges = [
    { disease: 'Heart Disease', ...results.heart },
    { disease: 'Type 2 Diabetes', ...results.diabetes },
    { disease: 'Kidney Disease', ...results.kidney },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {gauges.map((gauge, idx) => (
        <DiseaseGauge
          key={idx}
          index={idx + 1}
          disease={gauge.disease}
          riskScore={gauge.riskScore}
          riskLevel={gauge.riskLevel}
          description={gauge.description}
        />
      ))}
    </div>
  );
};
