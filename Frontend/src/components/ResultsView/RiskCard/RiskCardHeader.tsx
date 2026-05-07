import type { FC } from 'react';

interface RiskCardHeaderProps {
  title: string;
  icon: React.ReactNode;
}

export const RiskCardHeader: FC<RiskCardHeaderProps> = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-4 mb-5">
      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
        {icon}
      </div>
      <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase">{title}</h3>
    </div>
  );
};
