import type { FC } from 'react';

interface DashboardEmptyStateProps {
  onStartAssessment: () => void;
}

export const DashboardEmptyState: FC<DashboardEmptyStateProps> = ({ onStartAssessment }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🏥</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Health-ON-ML</h2>
        <p className="text-gray-600 mb-6">
          Start your multivariate disease risk assessment by providing your health information.
        </p>
        <button
          onClick={onStartAssessment}
          className="btn-primary"
        >
          ➕ Start Assessment
        </button>
      </div>
    </div>
  );
};
