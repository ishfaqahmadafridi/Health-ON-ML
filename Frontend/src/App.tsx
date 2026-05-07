import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/home/DashboardLayout';
import { DashboardView } from './components/home/DashboardView';
import { PatientProfileView } from './components/home/PatientProfileView';
import { DoctorProfileView } from './components/home/DoctorProfileView';
import { HistoryView } from './components/home/HistoryView';
import { SettingsView } from './components/home/SettingsView';
import { useAppInit } from './hooks/useAppInit';

const App = () => {
  // Handle global initialization and theme
  useAppInit();

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* Main Dashboard Routes */}
        <Route path="/" element={<DashboardView />} />
        <Route path="/analysis" element={<DashboardView />} />
        
        {/* Feature Views */}
        <Route path="/patient-profile" element={<PatientProfileView />} />
        <Route path="/doctor-profile" element={<DoctorProfileView />} />
        <Route path="/history" element={<HistoryView />} />
        <Route path="/settings" element={<SettingsView />} />
      </Route>
    </Routes>
  );
};

export default App;

