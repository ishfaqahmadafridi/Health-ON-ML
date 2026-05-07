import type { FC } from 'react';

interface FactorBarProps {
  value: number;
  color: string;
  isTransparent?: boolean;
}

export const FactorBar: FC<FactorBarProps> = ({ value, color, isTransparent }) => {
  return (
    <div className="relative flex flex-col items-center justify-end h-full w-5 group z-10">
      <div 
        className="w-full rounded-t-sm transition-all duration-1000 ease-out"
        style={{ 
          height: `${Math.max(value, 2)}%`,
          backgroundColor: color,
          opacity: isTransparent ? 0.5 : 0.95
        }}
      ></div>
    </div>
  );
};
