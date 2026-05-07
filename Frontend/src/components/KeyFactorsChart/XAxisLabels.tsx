import type { FC } from 'react';

interface XAxisLabelsProps {
  labels: string[];
}

export const XAxisLabels: FC<XAxisLabelsProps> = ({ labels }) => {
  return (
    <div className="flex w-full pl-6 mt-1 justify-around">
      {labels.map((label, idx) => (
        <span 
          key={idx} 
          className="text-[8px] font-bold text-gray-500 uppercase rotate-[-15deg] origin-top-left truncate w-full text-center"
        >
          {label}
        </span>
      ))}
    </div>
  );
};
