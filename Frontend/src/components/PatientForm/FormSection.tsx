import type { FC, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface FormSectionProps {
  title: string;
  icon: LucideIcon;
  color: 'blue' | 'rose' | 'emerald' | 'amber';
  children: ReactNode;
}

export const FormSection: FC<FormSectionProps> = ({ title, icon: Icon, color, children }) => {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colorStyles[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
};
