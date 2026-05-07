import type { FC } from 'react';
import { Activity } from 'lucide-react';
import { usePatientProfile } from '../../hooks/patient/usePatientProfile';

export const ClinicalMeasurementsCard: FC = () => {
  const { patientData } = usePatientProfile();

  if (!patientData) return null;

  return (
    <div className="bg-blue-600 rounded-[32px] p-8 text-white shadow-xl shadow-blue-600/20">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-5 h-5 opacity-80" />
        <h3 className="text-xs font-black uppercase tracking-widest">Clinical Snapshot</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase opacity-60 mb-1">Height</p>
          <p className="text-xl font-black">{patientData.height} <span className="text-xs font-medium">cm</span></p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase opacity-60 mb-1">Weight</p>
          <p className="text-xl font-black">{patientData.weight} <span className="text-xs font-medium">kg</span></p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase opacity-60 mb-1">Blood Pressure</p>
          <p className="text-xl font-black">{patientData.systolicBP}/{patientData.diastolicBP}</p>
        </div>
      </div>
    </div>
  );
};
