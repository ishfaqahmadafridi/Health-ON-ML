import { useState } from 'react';

export interface DashboardState {
  currentView: 'empty' | 'form' | 'analysis';
  setView: (view: 'empty' | 'form' | 'analysis') => void;
}

export const useDashboardState = (
  initialHasData: boolean
): DashboardState => {
  const [currentView, setView] = useState<'empty' | 'form' | 'analysis'>(
    initialHasData ? 'analysis' : 'form'
  );

  return {
    currentView,
    setView,
  };
};
