import type { FC } from 'react';
import { Heart } from 'lucide-react';
import { usePatientProfile } from '../../hooks/patient/usePatientProfile';

export const LifestyleSummary: FC = () => {
  const { patientData } = usePatientProfile();

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-5 h-5 text-emerald-500" />
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Lifestyle Factors</h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-2xl">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Smoker</p>
          <p className="text-sm font-black text-gray-800">{patientData?.smoker || '--'}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Alcohol</p>
          <p className="text-sm font-black text-gray-800">{patientData?.alcohol || '--'}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Active</p>
          <p className="text-sm font-black text-gray-800">{patientData?.active || '--'}</p>
        </div>
      </div>
    </div>
  );
};
