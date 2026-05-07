import type { FC } from 'react';
import { ChartHeader } from './ChartHeader';
import { YAxis } from './YAxis';
import { GridLines } from './GridLines';
import { FactorBar } from './FactorBar';
import { XAxisLabels } from './XAxisLabels';

interface KeyFactorsChartProps {
  disease: 'heart' | 'diabetes' | 'kidney';
  factors: Array<{ name: string; value: number }>;
}

/**
 * KeyFactorsChart Module
 * Orchestrates clinical factor visualization using granular sub-components.
 */
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
      <ChartHeader />
      
      <div className="flex w-full h-40 gap-2">
        <YAxis ticks={yTicks} />

        <div className="flex-1 relative h-32 flex items-end justify-around px-2">
          <GridLines count={yTicks.length} />
          
          {factors.map((factor, idx) => (
            <FactorBar 
              key={idx} 
              value={factor.value} 
              color={getChartColor()} 
              isTransparent={idx === 3} 
            />
          ))}
        </div>
      </div>

      <XAxisLabels labels={factors.map(f => f.name)} />
    </div>
  );
};
