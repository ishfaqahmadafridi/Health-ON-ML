import type { FC } from 'react';

interface DashboardActionsProps {
  onNewAssessment: () => void;
}

export const DashboardActions: FC<DashboardActionsProps> = ({ onNewAssessment }) => {
  return (
    <div className="flex gap-4 mb-8">
      <button className="btn-primary">📥 Generate Full Report (PDF)</button>
      <button className="btn-secondary">💾 Save Assessment</button>
      <button className="btn-secondary" onClick={onNewAssessment}>
        ➕ New Assessment
      </button>
    </div>
  );
};
