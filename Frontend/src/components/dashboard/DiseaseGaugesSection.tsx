import type { FC } from 'react';
import { DiseaseGauge } from '../DiseaseGauge';
import type { PredictionResponse } from '../../types';

interface DiseaseGaugesSectionProps {
  results: PredictionResponse | null;
}

export const DiseaseGaugesSection: FC<DiseaseGaugesSectionProps> = ({ results }) => {
  if (!results) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <DiseaseGauge
        disease="heart"
        title="HEART DISEASE RISK"
        riskScore={results.heartDisease.riskScore}
        riskLevel={results.heartDisease.level}
        description="Mainly driven by Blood Pressure, Cholesterol, and Age."
      />
      <DiseaseGauge
        disease="diabetes"
        title="DIABETES RISK"
        riskScore={results.diabetes.riskScore}
        riskLevel={results.diabetes.level}
        description="Driven by Glucose levels, BMI, and Activity Level."
      />
      <DiseaseGauge
        disease="kidney"
        title="KIDNEY DISEASE RISK"
        riskScore={results.kidneyDisease.riskScore}
        riskLevel={results.kidneyDisease.level}
        description="Mainly influenced by Blood Pressure and Age."
      />
    </div>
  );
};
