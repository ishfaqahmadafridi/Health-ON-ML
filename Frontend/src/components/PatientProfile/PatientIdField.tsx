import type { FC } from 'react';
import { ProfileField } from './ProfileField';

export const PatientIdField: FC = () => {
  return (
    <ProfileField label="Patient ID:">
      P-10234
    </ProfileField>
  );
};
