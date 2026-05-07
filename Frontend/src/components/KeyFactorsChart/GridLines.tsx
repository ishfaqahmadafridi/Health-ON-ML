import type { FC } from 'react';

interface GridLinesProps {
  count: number;
}

export const GridLines: FC<GridLinesProps> = ({ count }) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full h-[1px] bg-gray-50"></div>
      ))}
    </div>
  );
};
