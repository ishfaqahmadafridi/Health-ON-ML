import type { FC } from 'react';
import { ProfileField } from './ProfileField';
import { useDetailedProfile } from '../../hooks/patient/useDetailedProfile';

export const GlucoseDisplay: FC = () => {
  const { data } = useDetailedProfile();
  return (
    <ProfileField label="Glucose Level:">
      {data?.glucose || '--'} mg/dL
    </ProfileField>
  );
};
