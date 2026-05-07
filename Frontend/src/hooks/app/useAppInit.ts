import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { finishInitializing, setBackendAvailable } from '../../store/slices';

/**
 * Hook to handle global application initialization and theme management
 */
export const useAppInit = () => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector(state => state.ui.preferences);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Basic initialization check
    dispatch(setBackendAvailable(true));
    dispatch(finishInitializing());
  }, [dispatch]);
};
