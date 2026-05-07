import type { FC } from 'react';
import { Shield } from 'lucide-react';
import { SettingsSection } from './SettingsSection';
import { useSettings } from '../../hooks/settings/useSettings';

export const DangerZone: FC = () => {
  const { handleClearHistory } = useSettings();

  return (
    <SettingsSection title="Danger Zone" icon={Shield} color="red">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Clear all assessment history</p>
          <p className="text-xs text-gray-400 mt-0.5">This action cannot be undone</p>
        </div>
        <button 
          onClick={handleClearHistory}
          className="px-4 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-100 transition-colors"
        >
          Clear History
        </button>
      </div>
    </SettingsSection>
  );
};
