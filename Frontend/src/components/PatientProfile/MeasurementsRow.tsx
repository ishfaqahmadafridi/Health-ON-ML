import type { FC } from 'react';
import { ProfileField } from './ProfileField';
import { useDetailedProfile } from '../../hooks/patient/useDetailedProfile';

export const MeasurementsRow: FC = () => {
  const { data } = useDetailedProfile();
  return (
    <div className="flex gap-3">
      <ProfileField label="Weight:" className="flex-1">
        {data?.weight || '--'} kg
      </ProfileField>
      <ProfileField label="Height:" className="flex-1">
        {data?.height || '--'} cm
      </ProfileField>
    </div>
  );
};
