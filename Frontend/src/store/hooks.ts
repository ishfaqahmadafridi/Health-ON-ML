import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Pre-typed useDispatch hook for Redux actions
 * Usage: const dispatch = useAppDispatch();
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Pre-typed useSelector hook for accessing Redux state
 * Usage: const state = useAppSelector(state => state.patient.data);
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
