import type { FC } from 'react';

export const HeaderLogo: FC = () => {
  return (
    <div className="flex items-center">
      <span className="text-xs font-bold tracking-[0.05em] text-gray-800 uppercase whitespace-nowrap">
        General Health Risk Prediction System
      </span>
    </div>
  );
};
