import type { FC } from 'react';
import { ProfileField } from './ProfileField';
import { useDetailedProfile } from '../../hooks/patient/useDetailedProfile';

export const DemographicsRow: FC = () => {
  const { data } = useDetailedProfile();
  return (
    <div className="flex gap-3">
      <ProfileField label="Age:" className="flex-1">
        {data?.age || '--'}
      </ProfileField>
      <ProfileField label="Gender:" className="flex-1">
        <span className="capitalize">{data?.gender || '--'}</span>
      </ProfileField>
    </div>
  );
};
