import type { FC } from 'react';

interface YAxisProps {
  ticks: number[];
}

export const YAxis: FC<YAxisProps> = ({ ticks }) => {
  return (
    <div className="flex flex-col justify-between h-32 pr-2 border-r border-gray-100">
      {ticks.map(tick => (
        <span key={tick} className="text-[8px] font-bold text-gray-400 text-right w-4">
          {tick}
        </span>
      ))}
    </div>
  );
};
