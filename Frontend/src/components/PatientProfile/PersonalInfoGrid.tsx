import type { FC } from 'react';
import { usePatientProfile } from '../../hooks/patient/usePatientProfile';

export const PersonalInfoGrid: FC = () => {
  const { patientData } = usePatientProfile();

  const items = [
    { label: 'Age', value: `${patientData?.age || '--'} years` },
    { label: 'Gender', value: patientData?.gender || '--' },
    { label: 'Blood Type', value: 'O+' },
    { label: 'Contact', value: patientData?.contactNumber || '+1 (555) 000-0000' },
    { label: 'Emergency Contact', value: '+1 (555) 876-5432' },
    { label: 'Insurance', value: 'BlueCross #BC-48291' },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {items.map(item => (
        <div key={item.label} className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
          <span className="text-sm font-semibold text-gray-800">{item.value}</span>
        </div>
      ))}
    </div>
  );
};
