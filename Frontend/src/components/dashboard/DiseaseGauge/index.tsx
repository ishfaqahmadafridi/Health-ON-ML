import { FC } from 'react';

interface DiseaseGaugeProps {
  disease: string;
  index: number;
  riskScore: number;
  riskLevel: string;
  description: string;
}

export const DiseaseGauge: FC<DiseaseGaugeProps> = ({
  disease,
  index,
  riskScore,
  riskLevel,
  description,
}) => {
  const getColors = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return { bg: 'bg-[#B91C1C]', ring: 'stroke-[#991B1B]', fill: 'stroke-white' };
      case 'medium':
        return { bg: 'bg-[#F59E0B]', ring: 'stroke-[#D97706]', fill: 'stroke-white' };
      default:
        return { bg: 'bg-[#10B981]', ring: 'stroke-[#047857]', fill: 'stroke-white' };
    }
  };

  const colors = getColors(riskLevel);

  // SVG Arc calculation for semi-circle
  const radius = 60;
  const circumference = Math.PI * radius;
  // riskScore is 0-100, we map it to 0-circumference
  const strokeDashoffset = circumference - (riskScore / 100) * circumference;

  // The needle angle from -90 to +90 deg
  const needleAngle = -90 + (riskScore / 100) * 180;

  return (
    <div className={`relative w-full min-h-[260px] rounded-md flex flex-col overflow-hidden shadow-sm ${colors.bg}`}>
      
      {/* Title */}
      <div className="pt-5 px-5 pb-2">
        <h3 className="text-white text-sm font-bold uppercase tracking-wider">
          {index}. {disease} RISK
        </h3>
      </div>

      {/* Gauge Area */}
      <div className="flex flex-col items-center justify-center pt-2 flex-1">
        <div className="relative w-40 h-20 flex items-end justify-center overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 160 80">
            {/* Background Arc */}
            <path
              d="M 20 80 A 60 60 0 0 1 140 80"
              fill="none"
              strokeWidth="16"
              className={colors.ring}
              strokeLinecap="butt"
            />
            {/* Progress Arc */}
            <path
              d="M 20 80 A 60 60 0 0 1 140 80"
              fill="none"
              strokeWidth="16"
              className={colors.fill}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />
            {/* Needle */}
            <g transform={`translate(80,80) rotate(${needleAngle})`}>
              <polygon points="-4,0 4,0 0,-50" fill="#1F2937" />
              <circle cx="0" cy="0" r="4" fill="#1F2937" />
            </g>
          </svg>
        </div>
        
        {/* Value Below Meter */}
        <div className="text-center flex flex-col items-center mt-2">
          <span className="text-white text-3xl font-black leading-none">{riskScore}%</span>
          <span className="text-white text-[11px] font-bold tracking-widest uppercase mt-1">
            {riskLevel} RISK
          </span>
        </div>
      </div>

      {/* Footer / Description */}
      <div className="px-5 pb-4 mt-auto">
        <div className="flex flex-col gap-3">
          <p className="text-[11px] text-white/90 leading-tight">
            {description}
          </p>
          <div className="flex justify-end">
            <button 
              onClick={() => {
                document.getElementById('ai-explanation-box')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[10px] font-bold text-white/70 hover:text-white cursor-pointer uppercase flex items-center gap-1 outline-none focus:outline-none"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              SHAP Explain
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
