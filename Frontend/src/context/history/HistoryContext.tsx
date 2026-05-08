/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo, ReactNode, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { 
  loadPredictionFromHistory, 
  setSearchQuery 
} from '../../store/slices';
import { filterHistoryItems } from '../../utils/history';
import { useNavigate } from 'react-router-dom';
import { getPredictionHistory } from '../../api/health';
import type { HistoryEntry } from '../../types';

interface HistoryContextType {
  history: HistoryEntry[];
  searchQuery: string;
  filteredHistory: HistoryEntry[];
  handleView: (entry: HistoryEntry) => void;
  handleDelete: (id: number) => void;
  handleSearchChange: (query: string) => void;
}

export const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchQuery } = useAppSelector(state => state.ui);
  
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    getPredictionHistory()
      .then(data => setHistory(data))
      .catch(err => console.error("Failed to load history:", err));
  }, []);

  const filteredHistory = useMemo(() => 
    filterHistoryItems(history, searchQuery), 
  [history, searchQuery]);

  const handleView = (entry: HistoryEntry) => {
    // For now, load into Redux for analysis view
    dispatch(loadPredictionFromHistory(entry.predictionResult));
    navigate('/analysis');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this clinical record?')) {
      // Optimistic delete from UI (Requires backend endpoint for full deletion)
      setHistory(prev => prev.filter(item => item.id !== id));
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
