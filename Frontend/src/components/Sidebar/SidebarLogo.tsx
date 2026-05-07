import type { FC } from 'react';
import { Activity } from 'lucide-react';

export const SidebarLogo: FC = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
        <Activity className="w-7 h-7 text-white" />
      </div>
    </div>
  );
};
