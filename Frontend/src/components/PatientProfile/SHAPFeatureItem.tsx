import type { FC } from 'react';

interface SHAPFeatureItemProps {
  label: string;
  val: number;
  color: string;
}

export const SHAPFeatureItem: FC<SHAPFeatureItemProps> = ({ label, val, color }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[9px] font-bold text-gray-500 min-w-[50px]">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000`} 
          style={{ width: `${val}%` }}
        />
      </div>
    </div>
  );
};
