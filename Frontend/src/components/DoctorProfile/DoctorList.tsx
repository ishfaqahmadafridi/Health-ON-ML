import type { FC } from 'react';
import type { Doctor } from '../../types';
import { DoctorListItem } from './DoctorListItem';

interface DoctorListProps {
  doctors: Doctor[];
  currentDoctorId: string | null;
  onEdit: (doctor: Doctor) => void;
  onSwitch: (id: string) => void;
}

export const DoctorList: FC<DoctorListProps> = ({ 
  doctors, 
  currentDoctorId, 
  onEdit, 
  onSwitch 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Registered Practitioners
        </h3>
        <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
          {doctors.length} Total
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {doctors.map(doctor => (
          <DoctorListItem 
            key={doctor.id}
            doctor={doctor}
            isActive={currentDoctorId === doctor.id}
            onEdit={() => onEdit(doctor)}
            onSwitch={() => onSwitch(doctor.id)}
          />
        ))}
      </div>
    </div>
  );
};
