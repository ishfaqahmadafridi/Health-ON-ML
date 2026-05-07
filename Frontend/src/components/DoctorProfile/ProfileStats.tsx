import type { FC } from 'react';

export const ProfileStats: FC = () => {
  const stats = [
    { label: 'Assessments', value: '124', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'High Risk', value: '12', color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Success Rate', value: '98%', color: 'text-green-600', bg: 'bg-green-50' }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map(stat => (
        <div key={stat.label} className={`${stat.bg} p-4 rounded-2xl flex flex-col items-center justify-center`}>
          <span className={`text-xl font-black ${stat.color}`}>{stat.value}</span>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};
