import { useContext } from 'react';
import { DashboardContext } from '../../context/dashboard/DashboardContext';

/**
 * Global hook to consume the Dashboard Context.
 * Allows any sub-component in the dashboard (Gauges, Panels, Actions) 
 * to access results and navigation logic directly.
 */
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
