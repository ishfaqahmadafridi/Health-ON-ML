import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../Sidebar/index';
import { Header } from '../Header/index';
import { useAppSelector } from '../../store';

export const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, compactView } = useAppSelector(state => state.ui.preferences);

  // Extract the current view from the pathname (e.g., '/settings' -> 'settings')
  // Default to 'dashboard' if the path is '/'
  const activeView = location.pathname === '/' ? 'dashboard' : location.pathname.substring(1);

  return (
    <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <Sidebar activeView={activeView} onViewChange={(view) => navigate(view === 'dashboard' ? '/' : `/${view}`)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header onNavigate={(view) => navigate(view === 'dashboard' ? '/' : `/${view}`)} />

        {/* Scrollable Content Container */}
        <main className={`flex-1 overflow-y-auto relative z-10 transition-all duration-300 ${compactView ? 'px-4 py-2' : 'px-8 py-6'}`}>
          <div className="max-w-7xl mx-auto w-full pb-20">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
