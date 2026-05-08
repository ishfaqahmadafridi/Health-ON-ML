import { useState, useEffect } from 'react';

/**
 * Hook to manage the switching between form, analysis, and empty views in the dashboard
 */
export const useDashboardState = (hasData: boolean) => {
  const [view, setView] = useState<'empty' | 'form' | 'analysis'>(
    hasData ? 'analysis' : 'empty'
  );

  useEffect(() => {
    if (hasData && view === 'empty') {
      setView('analysis');
    }
  }, [hasData, view]);

  return {
    currentView: view,
    setView,
  };
};
