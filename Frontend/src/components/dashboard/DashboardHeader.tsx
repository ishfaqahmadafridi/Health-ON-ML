import type { FC } from 'react';

interface DashboardHeaderProps {
  onNewAssessment: () => void;
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({ onNewAssessment }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold text-gray-900">Multivariate Disease Risk Analysis</h2>
      <button
        onClick={onNewAssessment}
        className="btn-secondary text-sm"
      >
        🔄 New Assessment
      </button>
    </div>
  );
};
