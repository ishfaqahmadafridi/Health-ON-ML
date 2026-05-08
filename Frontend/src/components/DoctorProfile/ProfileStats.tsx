import React, { FC, useState, useEffect } from 'react';
import { getDoctorStats } from '../../api/health';

export const ProfileStats: FC = () => {
  const [stats, setStats] = useState([
    { label: 'Assessments', value: '...', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'High Risk', value: '...', color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Success Rate', value: '...', color: 'text-green-600', bg: 'bg-green-50' }
  ]);

  useEffect(() => {
    getDoctorStats().then(data => {
      setStats([
        { label: 'Assessments', value: data.assessments, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'High Risk', value: data.highRisk, color: 'text-red-600', bg: 'bg-red-50' },
        { label: 'Success Rate', value: data.successRate, color: 'text-green-600', bg: 'bg-green-50' }
      ]);
    });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map(stat => (
        <div key={stat.label} className={`${stat.bg} p-4 rounded-2xl flex flex-col items-center justify-center`}>
          <span className={`text-xl font-black ${stat.color}`}>{stat.value}</span>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1 text-center leading-tight">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};
