import type { FC } from 'react';

interface DiseaseGaugeProps {
  disease: 'heart' | 'diabetes' | 'kidney';
  title: string;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  description: string;
}

export const DiseaseGauge: FC<DiseaseGaugeProps> = ({
  disease,
  title,
  riskScore,
  riskLevel,
  description,
}) => {
  const getGaugeColor = () => {
    if (riskLevel === 'Low') return '#50C878';
    if (riskLevel === 'Medium') return '#FDB913';
    return '#FF6B6B';
  };

  const getBgColor = () => {
    if (riskLevel === 'Low') return '#E8F8E8';
    if (riskLevel === 'Medium') return '#FFF3E0';
    return '#FFE5E5';
  };

  const getHeaderBg = () => {
    if (riskLevel === 'Low') return '#50C878';
    if (riskLevel === 'Medium') return '#FDB913';
    return '#C41E3A';
  };

  const getDiseaseNumber = () => {
    if (disease === 'heart') return '1';
    if (disease === 'diabetes') return '2';
    return '3';
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (riskScore / 100) * circumference;

  return (
    <div className="card overflow-hidden" style={{ backgroundColor: getBgColor() }}>
      <div className="px-6 py-4 text-white flex items-center gap-4" style={{ backgroundColor: getHeaderBg() }}>
        <span className="text-2xl font-bold">{getDiseaseNumber()}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <div className="p-6">
        <div className="flex flex-col items-center justify-center mb-6">
          <svg width="150" height="150" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#E0E0E0"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke={getGaugeColor()}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>

          <div className="flex flex-col items-center justify-center -mt-16 mb-2">
            <div className="text-3xl font-bold text-gray-900">{riskScore}%</div>
            <div className="text-sm font-semibold text-gray-600">{riskLevel} Risk</div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-700 mb-4">{description}</p>

        <div className="text-center pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-600">💡 AI Explanation</span>
        </div>
      </div>
    </div>
  );
};
