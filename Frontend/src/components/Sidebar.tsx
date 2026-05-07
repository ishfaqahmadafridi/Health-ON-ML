import type { FC } from 'react';
import { 
  Activity, 
  LayoutGrid, 
  User, 
  Heart, 
  ClipboardList, 
  Settings 
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'patient-profile', label: 'Patient Profile', icon: User },
    { id: 'analysis', label: 'Analysis', icon: Heart },
    { id: 'history', label: 'History', icon: ClipboardList },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-20 bg-[#002B5B] flex flex-col items-center py-8 my-4 ml-4 rounded-3xl sticky top-4 h-[calc(100vh-32px)] shadow-xl">
      {/* Logo Section */}
      <div className="mb-12 text-[#00A3FF]">
        <Activity size={32} strokeWidth={2.5} />
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`p-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-white/20 text-white shadow-lg ring-1 ring-white/30'
                  : 'text-white/50 hover:text-white hover:bg-white/10'
              }`}
              title={item.label}
            >
              <Icon size={24} strokeWidth={1.5} />
            </button>
          );
        })}
      </nav>

      {/* Bottom Spacer/Extra Item */}
      <div className="mt-auto">
        {/* Optional: Add user profile or logout here if needed */}
      </div>
    </aside>
  );
};
