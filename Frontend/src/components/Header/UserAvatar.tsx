import type { FC } from 'react';
import { User } from 'lucide-react';
import { useAppSelector } from '../../store';

export const UserAvatar: FC = () => {
  const { doctors, currentDoctorId } = useAppSelector(state => state.doctor);
  const currentDoctor = doctors.find(d => d.id === currentDoctorId) || doctors[0];

  return (
    <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 overflow-hidden">
      {currentDoctor?.image ? (
        <img src={currentDoctor.image} alt={currentDoctor.name} className="h-full w-full object-cover" />
      ) : (
        <User className="h-5 w-5" />
      )}
    </div>
  );
};
