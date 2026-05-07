import type { FC } from 'react';
import { useDashboard } from '../../hooks/dashboard/useDashboard';

/**
 * Section displaying AI-generated clinical explanations.
 * Now consumes results directly from DashboardContext.
 */
export const ExplanationSection: FC = () => {
  const { results } = useDashboard();

  if (!results) return null;

  return (
    <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
      <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-4">
        AI Clinical Explanation
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed font-medium">
        Based on the current physiological markers, the patient exhibits a multi-factor risk profile.
        The system identifies {results.heartDisease.level} cardiovascular risk alongside 
        {results.diabetes.level} diabetic indicators. Clinical monitoring is recommended for 
        parameters exceeding baseline thresholds.
      </p>
    </div>
  );
};
