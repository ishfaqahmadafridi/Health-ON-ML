import type { FC } from 'react';
import { SettingsProvider } from '../../context/settings/SettingsContext';
import { SettingsHeader } from './SettingsHeader';
import { NotificationSettings } from './NotificationSettings';
import { PreferenceSettings } from './PreferenceSettings';
import { SystemSettings } from './SystemSettings';
import { DangerZone } from './DangerZone';
import { SettingsFooter } from './SettingsFooter';

/**
 * Settings Module Entry Point
 * Orchestrates all preference-related sub-components.
 */
export const Settings: FC = () => {
  return (
    <SettingsProvider>
      <div className="max-w-3xl mx-auto w-full">
        <SettingsHeader />
        <NotificationSettings />
        <PreferenceSettings />
        <SystemSettings />
        <DangerZone />
        <SettingsFooter />
      </div>
    </SettingsProvider>
  );
};
