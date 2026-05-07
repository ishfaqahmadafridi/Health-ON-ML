import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { 
  removePredictionFromHistory, 
  loadPredictionFromHistory, 
  setSearchQuery 
} from '../../store/slices';
import { filterHistoryItems } from '../../utils/history';
import { useNavigate } from 'react-router-dom';
import type { HistoryEntry } from '../../types';

interface HistoryContextType {
  history: HistoryEntry[];
  searchQuery: string;
  filteredHistory: HistoryEntry[];
  handleView: (entry: HistoryEntry) => void;
  handleDelete: (id: string) => void;
  handleSearchChange: (query: string) => void;
}

export const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { history } = useAppSelector(state => state.prediction);
  const { searchQuery } = useAppSelector(state => state.ui);

  const filteredHistory = useMemo(() => 
    filterHistoryItems(history, searchQuery), 
  [history, searchQuery]);

  const handleView = (entry: HistoryEntry) => {
    dispatch(loadPredictionFromHistory(entry.results));
    navigate('/analysis');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this clinical record?')) {
      dispatch(removePredictionFromHistory(id));
    }
  };

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const value = {
    history,
    searchQuery,
    filteredHistory,
    handleView,
    handleDelete,
    handleSearchChange
  };

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
};
