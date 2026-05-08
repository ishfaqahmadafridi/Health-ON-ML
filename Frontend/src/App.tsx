import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/home/DashboardLayout';
import { DashboardView } from './components/home/DashboardView';
import { PatientProfile as PatientProfileView } from './components/PatientProfile/index';
import { DoctorProfile as DoctorProfileView } from './components/DoctorProfile/index';
import { HistoryView } from './components/History/index';
import { Settings as SettingsView } from './components/Settings/index';
import { useAppInit } from './hooks/app/useAppInit';

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
        <Route path="/support" element={<SupportView />} />
      </Route>
    </Routes>
  );
};

export default App;

