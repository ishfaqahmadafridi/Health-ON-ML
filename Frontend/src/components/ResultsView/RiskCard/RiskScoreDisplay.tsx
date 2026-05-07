import type { FC } from 'react';

interface RiskScoreDisplayProps {
  score: number;
  level: string;
  color: string;
}

export const RiskScoreDisplay: FC<RiskScoreDisplayProps> = ({ score, level, color }) => {
  return (
    <div className="mb-6">
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-5xl font-black tracking-tighter" style={{ color }}>
          {score}%
        </span>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Risk Score
        </span>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-100 bg-white shadow-sm">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
          {level} Risk Profile
        </span>
      </div>
    </div>
  );
};
