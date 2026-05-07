import type { FC } from 'react';
import { UserAvatar } from './UserAvatar';
import { useAppSelector } from '../../store';

export const DropdownUserInfo: FC = () => {
  const { doctors, currentDoctorId } = useAppSelector(state => state.doctor);
  const currentDoctor = doctors.find(d => d.id === currentDoctorId) || doctors[0];

  return (
    <div className="px-5 py-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <UserAvatar />
        <div>
          <p className="text-sm font-bold text-gray-900">{currentDoctor?.name || 'Create Profile'}</p>
          <p className="text-xs text-gray-400">{currentDoctor?.email || 'Settings -> Accounts'}</p>
        </div>
      </div>
    </div>
  );
};
