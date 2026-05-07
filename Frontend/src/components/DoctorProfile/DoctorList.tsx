import type { FC } from 'react';
import { useDoctorProfile } from '../../hooks/doctor/useDoctorProfile';
import { DoctorListItem } from './DoctorListItem';

export const DoctorList: FC = () => {
  const { doctors, currentDoctorId, handleEdit, handleSwitch } = useDoctorProfile();

  return (
    <div className="space-y-4">
      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
        Registered Practitioners ({doctors.length})
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {doctors.map(doctor => (
          <DoctorListItem 
            key={doctor.id}
            doctor={doctor}
            isActive={currentDoctorId === doctor.id}
            onEdit={() => handleEdit(doctor)}
            onSwitch={() => handleSwitch(doctor.id)}
          />
        ))}
      </div>
    </div>
  );
};
