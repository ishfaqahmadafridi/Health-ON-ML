import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  loading: boolean;
  error: string | null;
  currentView: 'empty' | 'form' | 'analysis';
  showModal: boolean;
  modalType: 'pdf' | 'save' | 'history' | null;
  backendAvailable: boolean;
  initializing: boolean;
  searchQuery: string;
  preferences: {
    emailAlerts: boolean;
    weeklySummaries: boolean;
    systemUpdates: boolean;
    darkMode: boolean;
    compactView: boolean;
    autoSave: boolean;
  };
}

const initialState: UIState = {
  loading: false,
  error: null,
  currentView: 'form',
  showModal: false,
  modalType: null,
  backendAvailable: true,
  initializing: true,
  searchQuery: '',
  preferences: {
    emailAlerts: true,
    weeklySummaries: true,
    systemUpdates: false,
    darkMode: false,
    compactView: false,
    autoSave: true,
  },
};

// Check localStorage for saved preferences
try {
  const savedPrefs = localStorage.getItem('health_on_ml_preferences');
  if (savedPrefs) {
    initialState.preferences = JSON.parse(savedPrefs);
  }
} catch (e) {
  console.error('Failed to parse preferences from localStorage');
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload as boolean;
    },
    setError: (state, action) => {
      state.error = action.payload as string | null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload as 'empty' | 'form' | 'analysis';
    },
    openModal: (state, action) => {
      state.showModal = true;
      state.modalType = action.payload as 'pdf' | 'save' | 'history';
    },
    closeModal: (state) => {
      state.showModal = false;
      state.modalType = null;
    },
    setBackendAvailable: (state, action) => {
      state.backendAvailable = action.payload as boolean;
    },
    setInitializing: (state, action) => {
      state.initializing = action.payload as boolean;
    },
    finishInitializing: (state) => {
      state.initializing = false;
    },
    togglePreference: (state, action) => {
      const key = action.payload as keyof typeof state.preferences;
      state.preferences[key] = !state.preferences[key];
      try {
        localStorage.setItem('health_on_ml_preferences', JSON.stringify(state.preferences));
      } catch (e) {
        console.error('Failed to save preferences to localStorage');
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setCurrentView,
  openModal,
  closeModal,
  setBackendAvailable,
  setInitializing,
  finishInitializing,
  togglePreference,
  setSearchQuery,
} = uiSlice.actions;

export default uiSlice.reducer;
