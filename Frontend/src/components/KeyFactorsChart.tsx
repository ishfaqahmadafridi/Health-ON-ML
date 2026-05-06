import type { FC } from 'react';

interface KeyFactorsChartProps {
  disease: 'heart' | 'diabetes' | 'kidney';
  factors: Array<{ name: string; value: number }>;
}

export const KeyFactorsChart: FC<KeyFactorsChartProps> = ({ disease, factors }) => {
  const getChartColor = () => {
    switch (disease) {
      case 'heart':
        return '#C41E3A';
      case 'diabetes':
        return '#FDB913';
      case 'kidney':
        return '#50C878';
      default:
        return '#4A90E2';
    }
  };

  const getDiseaseName = () => {
    switch (disease) {
      case 'heart':
        return 'Heart Disease';
      case 'diabetes':
        return 'Diabetes';
      case 'kidney':
        return 'Kidney Disease';
    }
  };

  const maxValue = Math.max(...factors.map((f) => f.value), 100);

  return (
    <div className="mb-6">
      <h4 className="text-sm font-semibold text-gray-900 mb-4">{getDiseaseName()} - Key Contributing Factors</h4>
      <div className="space-y-3">
        {factors.map((factor, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">{factor.name}</span>
              <span className="font-semibold text-gray-900">{factor.value}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
              <div
                className="h-full rounded transition-all duration-300"
                style={{
                  width: `${(factor.value / maxValue) * 100}%`,
                  backgroundColor: getChartColor(),
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
