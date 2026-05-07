import type { FC } from 'react';
import { useAppSelector } from '../../store';

export const UserProfileInfo: FC = () => {
  const { doctors, currentDoctorId } = useAppSelector(state => state.doctor);
  const currentDoctor = doctors.find(d => d.id === currentDoctorId) || doctors[0];

  return (
    <div className="hidden md:flex flex-col items-start mr-1 text-left">
      <span className="text-xs font-bold text-gray-800 leading-tight">
        {currentDoctor?.name || 'No Doctor'}
      </span>
      <span className="text-[10px] text-gray-400 leading-tight">
        {currentDoctor?.role || 'Add Profile'}
      </span>
    </div>
  );
};
