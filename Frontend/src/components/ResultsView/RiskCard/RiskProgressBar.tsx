import type { FC } from 'react';

interface RiskProgressBarProps {
  score: number;
  color: string;
}

export const RiskProgressBar: FC<RiskProgressBarProps> = ({ score, color }) => {
  return (
    <div className="mt-6">
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full transition-all duration-1000 ease-out rounded-full"
          style={{
            width: `${score}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}40`
          }}
        ></div>
      </div>
    </div>
  );
};
