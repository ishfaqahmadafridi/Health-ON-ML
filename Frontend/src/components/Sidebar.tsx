import type { FC } from 'react';
import { BarChart3, Users, Stethoscope, History, Settings } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'profile', label: 'Patient Profile', icon: Users },
    { id: 'analysis', label: 'Analysis', icon: Stethoscope },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center p-4 sticky top-0 h-screen shadow-sm">
      <div className="mb-8">
        <div className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-2xl">🏥</span>
          <span className="text-xs font-semibold text-center max-w-[60px] leading-tight text-gray-700">
            Health-ON-ML
          </span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-6 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-md transition-all duration-200 ${
                isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-blue-500'
              }`}
              title={item.label}
            >
              <Icon size={20} />
              <span className="text-xs font-semibold text-center max-w-[60px] leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button className="text-2xl p-2 rounded-md hover:bg-gray-100 transition-colors">
          👨‍⚕️
        </button>
      </div>
    </aside>
  );
};
