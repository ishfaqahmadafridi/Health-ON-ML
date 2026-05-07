import type { FC } from 'react';
import { Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const HistoryStats: FC = () => {
  const stats = [
    { label: 'Avg Risk', value: '24%', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'High Priority', value: '8', icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Verified', value: '100%', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map(stat => (
        <div key={stat.label} className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md">
          <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-xl font-black text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
