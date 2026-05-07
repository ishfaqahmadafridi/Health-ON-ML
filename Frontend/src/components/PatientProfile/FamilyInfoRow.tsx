import type { FC } from 'react';
import { ProfileField } from './ProfileField';
import { useDetailedProfile } from '../../hooks/patient/useDetailedProfile';

export const FamilyInfoRow: FC = () => {
  const { data } = useDetailedProfile();
  return (
    <div className="flex gap-3">
      <ProfileField label="Father's Name:" className="flex-1">
        {data?.fatherName || '---'}
      </ProfileField>
      <ProfileField label="Contact:" className="flex-1">
        {data?.contactNumber || '---'}
      </ProfileField>
    </div>
  );
};
