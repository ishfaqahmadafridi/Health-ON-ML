import type { FC } from 'react';
import { Bell } from 'lucide-react';
import { SettingsSection } from './SettingsSection';
import { ToggleField } from './ToggleField';
import { useSettings } from '../../hooks/settings/useSettings';

export const NotificationSettings: FC = () => {
  const { preferences, handleToggle } = useSettings();

  return (
    <SettingsSection title="Notifications" icon={Bell}>
      <ToggleField 
        label="Email alerts for high-risk patients" 
        isActive={preferences.notifications} 
        onToggle={() => handleToggle('notifications')} 
      />
      <ToggleField 
        label="Weekly assessment summaries" 
        isActive={false} 
        onToggle={() => {}} 
      />
      <ToggleField 
        label="System update notifications" 
        isActive={true} 
        onToggle={() => {}} 
      />
    </SettingsSection>
  );
};
