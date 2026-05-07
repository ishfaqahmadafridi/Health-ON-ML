import type { FC, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface SettingsSectionProps {
  title: string;
  icon: LucideIcon;
  color?: 'blue' | 'red';
  children: ReactNode;
}

export const SettingsSection: FC<SettingsSectionProps> = ({ 
  title, 
  icon: Icon, 
  color = 'blue', 
  children 
}) => {
  const bgClass = color === 'blue' ? 'bg-blue-50' : 'bg-red-50';
  const textClass = color === 'blue' ? 'text-blue-500' : 'text-red-500';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-9 h-9 ${bgClass} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-4.5 h-4.5 ${textClass}`} />
        </div>
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};
