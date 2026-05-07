import type { FC } from 'react';
import { Palette } from 'lucide-react';
import { SettingsSection } from './SettingsSection';
import { ToggleField } from './ToggleField';
import { useSettings } from '../../hooks/settings/useSettings';

export const PreferenceSettings: FC = () => {
  const { preferences, handleToggle } = useSettings();

  return (
    <SettingsSection title="Preferences" icon={Palette}>
      <ToggleField 
        label="Dark Mode" 
        isActive={preferences.darkMode} 
        onToggle={() => handleToggle('darkMode')} 
      />
      <ToggleField 
        label="Compact View" 
        isActive={preferences.compactMode} 
        onToggle={() => handleToggle('compactMode')} 
      />
      <ToggleField 
        label="Auto-save assessments" 
        isActive={preferences.autoSave} 
        onToggle={() => handleToggle('autoSave')} 
      />
    </SettingsSection>
  );
};
