import type { FC } from 'react';
import { ProfileField } from './ProfileField';
import { useDetailedProfile } from '../../hooks/patient/useDetailedProfile';

export const NameField: FC = () => {
  const { data } = useDetailedProfile();
  return (
    <ProfileField label="Name:">
      {data?.name || '---'}
    </ProfileField>
  );
};
