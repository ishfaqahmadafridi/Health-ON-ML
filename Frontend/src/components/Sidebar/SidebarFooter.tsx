import type { FC } from 'react';
import { Power } from 'lucide-react';

export const SidebarFooter: FC = () => {
  return (
    <button
      className="p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-2xl transition-all"
      title="Logout"
    >
      <Power className="w-6 h-6" />
    </button>
  );
};
