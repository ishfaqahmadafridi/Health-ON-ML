import type { FC } from 'react';

interface KeyFactorsChartProps {
  disease: 'heart' | 'diabetes' | 'kidney';
  factors: Array<{ name: string; value: number }>;
}

export const KeyFactorsChart: FC<KeyFactorsChartProps> = ({ disease, factors }) => {
  const getChartColor = () => {
    switch (disease) {
      case 'heart': return '#801A1A';
      case 'diabetes': return '#E67E22';
      case 'kidney': return '#2E7D32';
      default: return '#4A90E2';
    }
  };

  const yTicks = [100, 80, 60, 40, 20, 0];

  return (
    <div className="flex flex-col items-center w-full">
      <h4 className="text-[10px] font-black text-gray-700 uppercase mb-4">Key Contributing Factors</h4>
      
      <div className="flex w-full h-40 gap-2">
        {/* Y-Axis */}
        <div className="flex flex-col justify-between h-32 pr-2 border-r border-gray-100">
          {yTicks.map(tick => (
            <span key={tick} className="text-[8px] font-bold text-gray-400 text-right w-4">{tick}</span>
          ))}
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative h-32 flex items-end justify-around px-2">
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {yTicks.map(tick => (
              <div key={tick} className="w-full h-[1px] bg-gray-50"></div>
            ))}
          </div>

          {/* Bars */}
          {factors.map((factor, idx) => (
            <div key={idx} className="relative flex flex-col items-center justify-end h-full w-5 group z-10">
              <div 
                className="w-full rounded-t-sm transition-all duration-1000 ease-out"
                style={{ 
                  height: `${Math.max(factor.value, 2)}%`, // Ensure at least a sliver is visible
                  backgroundColor: getChartColor(),
                  opacity: idx === 3 ? 0.5 : 0.95
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* X-Axis Labels */}
      <div className="flex w-full pl-6 mt-1 justify-around">
        {factors.map((factor, idx) => (
          <span key={idx} className="text-[8px] font-bold text-gray-500 uppercase rotate-[-15deg] origin-top-left truncate w-full text-center">
            {factor.name}
          </span>
        ))}
      </div>
    </div>
  );
};
