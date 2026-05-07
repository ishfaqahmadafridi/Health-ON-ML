import { FC } from 'react';

interface DiseaseGaugeProps {
  disease: string;
  riskScore: number;
  riskLevel: string;
  description: string;
}

export const DiseaseGauge: FC<DiseaseGaugeProps> = ({
  disease,
  riskScore,
  riskLevel,
  description,
}) => {
  // Define colors based on risk level
  const getColors = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return {
          bg: 'from-red-600 to-red-400',
          footer: 'rgba(153, 27, 27, 0.2)', // red-900 with opacity
          ring: 'text-red-500',
          track: 'rgba(255, 255, 255, 0.2)',
          shadow: 'shadow-red-500/30'
        };
      case 'medium':
        return {
          bg: 'from-orange-500 to-orange-400',
          footer: 'rgba(154, 52, 18, 0.2)', // orange-900 with opacity
          ring: 'text-orange-400',
          track: 'rgba(255, 255, 255, 0.2)',
          shadow: 'shadow-orange-500/30'
        };
      default:
        return {
          bg: 'from-green-500 to-green-400',
          footer: 'rgba(20, 83, 45, 0.2)', // green-900 with opacity
          ring: 'text-green-400',
          track: 'rgba(255, 255, 255, 0.2)',
          shadow: 'shadow-green-500/30'
        };
    }
  };

  const colors = getColors(riskLevel);
  const strokeDasharray = 2 * Math.PI * 45; // Circumference of r=45
  const strokeDashoffset = strokeDasharray - (strokeDasharray * riskScore) / 100;

  return (
    <div
      className={`relative w-full max-w-[280px] rounded-[32px] overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:shadow-3xl bg-gradient-to-br ${colors.bg} ${colors.shadow} border border-white/20`}
    >
      {/* ─── Header ─── */}
      <div className="pt-6 px-6 pb-2">
        <h3 className="text-white text-xs font-black tracking-[0.15em] uppercase opacity-90 drop-shadow-sm">
          {disease}
        </h3>
      </div>

      {/* ─── Gauge Center ─── */}
      <div className="flex flex-col items-center justify-center py-4 relative">
        <svg className="w-40 h-40 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r="45"
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-white/10"
            style={{ stroke: colors.track }}
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r="45"
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`transition-all duration-1000 ease-out ${colors.ring}`}
            style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
          />
          {/* Score Text */}
          <text
            x="80"
            y="75"
            className="fill-white text-3xl font-black"
            textAnchor="middle"
            dominantBaseline="middle"
            transform="rotate(90 80 80)"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          >
            {riskScore}%
          </text>
          <text
            x="80"
            y="100"
            className="fill-white/80 text-[10px] font-bold tracking-widest uppercase"
            textAnchor="middle"
            dominantBaseline="middle"
            transform="rotate(90 80 80)"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
          >
            {riskLevel.toUpperCase()} RISK
          </text>
        </svg>

        {/* Description text below gauge */}
        <p className="text-[11.5px] text-center text-white/85 leading-snug mt-3 px-2 font-medium">
          {description}
        </p>
      </div>

      {/* ─── Footer with darker overlay ─── */}
      <div
        className="px-5 py-2.5 flex justify-end items-center text-white"
        style={{ backgroundColor: colors.footer }}
      >
        <div className="flex items-center gap-1.5 cursor-pointer opacity-75 hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-black tracking-widest uppercase">Details</span>
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
