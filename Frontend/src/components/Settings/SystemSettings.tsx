import type { FC } from 'react';
import { Globe } from 'lucide-react';
import { SettingsSection } from './SettingsSection';
import { TextField } from './TextField';

export const SystemSettings: FC = () => {
  return (
    <SettingsSection title="System" icon={Globe}>
      <TextField label="Language" value="English" />
      <TextField label="Model Version" value="v2.4.1 (Latest)" />
      <TextField label="API Endpoint" value="http://localhost:8000" />
    </SettingsSection>
  );
};
