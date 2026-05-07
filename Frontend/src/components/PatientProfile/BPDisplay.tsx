import type { FC } from 'react';
import { ProfileField } from './ProfileField';
import { useDetailedProfile } from '../../hooks/patient/useDetailedProfile';

export const BPDisplay: FC = () => {
  const { data } = useDetailedProfile();
  return (
    <ProfileField label="Blood Pressure:">
      {data?.systolicBP || '--'}/{data?.diastolicBP || '--'} mmHg
    </ProfileField>
  );
};
