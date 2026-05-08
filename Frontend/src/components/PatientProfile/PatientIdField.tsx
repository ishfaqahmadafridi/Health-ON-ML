import type { FC } from 'react';
import { ProfileField } from './ProfileField';

export const PatientIdField: FC = () => {
  // Generate a random ID for the current session to avoid the hardcoded 10234 confusion
  const randomId = Math.floor(10000 + Math.random() * 90000);
  
  return (
    <ProfileField label="Patient ID:">
      P-{randomId}
    </ProfileField>
  );
};
