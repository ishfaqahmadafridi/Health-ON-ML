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
    <div className="factors-chart">
      <h4>{getDiseaseName()} - Key Contributing Factors</h4>
      <div className="factors-list">
        {factors.map((factor, idx) => (
          <div key={idx} className="factor-item">
            <div className="factor-header">
              <span className="factor-name">{factor.name}</span>
              <span className="factor-value">{factor.value}</span>
            </div>
            <div className="factor-bar">
              <div
                className="factor-fill"
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
