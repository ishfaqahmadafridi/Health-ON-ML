import type { FC } from 'react';

interface RiskGuidanceProps {
  guidance: string;
  description: string;
}

export const RiskGuidance: FC<RiskGuidanceProps> = ({ guidance, description }) => {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-gray-500 leading-relaxed italic">
        "{description}"
      </p>
      
      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
          Clinical Guidance
        </h4>
        <p className="text-xs font-bold text-gray-700 leading-relaxed">
          {guidance}
        </p>
      </div>
    </div>
  );
};
