import type { FC } from 'react';

interface RiskAlertsProps {
  hasHighRisk: boolean;
  hasMediumRisk: boolean;
}

export const RiskAlerts: FC<RiskAlertsProps> = ({ hasHighRisk, hasMediumRisk }) => {
  if (hasHighRisk) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-8 max-w-2xl mx-auto flex items-start gap-4 shadow-sm shadow-red-500/5">
        <div className="text-2xl mt-0.5">⚠️</div>
        <div>
          <h4 className="text-red-900 font-bold mb-1 uppercase tracking-wider text-xs">High Risk Warning</h4>
          <p className="text-red-700 font-medium text-sm">
            Critical risks have been identified. Please consult with a healthcare professional as soon as possible for a detailed diagnostic review.
          </p>
        </div>
      </div>
    );
  }

  if (hasMediumRisk) {
    return (
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-8 max-w-2xl mx-auto flex items-start gap-4 shadow-sm shadow-orange-500/5">
        <div className="text-2xl mt-0.5">📋</div>
        <div>
          <h4 className="text-orange-900 font-bold mb-1 uppercase tracking-wider text-xs">Medium Risk Notice</h4>
          <p className="text-orange-700 font-medium text-sm">
            Moderate risk levels were detected. We recommend scheduling a routine check-up with your physician to discuss preventative measures.
          </p>
        </div>
      </div>
    );
  }

  return null;
};
