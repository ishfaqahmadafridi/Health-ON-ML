import { useState } from 'react';

/**
 * Hook to manage the switching between form, analysis, and empty views in the dashboard
 */
export const useDashboardState = (hasData: boolean) => {
  const [view, setView] = useState<'empty' | 'form' | 'analysis'>(
    hasData ? 'analysis' : 'empty'
  );

  return {
    currentView: view,
    setView,
  };
};
