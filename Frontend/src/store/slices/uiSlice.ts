import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  loading: boolean;
  error: string | null;
  currentView: 'empty' | 'form' | 'analysis';
  showModal: boolean;
  modalType: 'pdf' | 'save' | 'history' | null;
  backendAvailable: boolean;
  initializing: boolean;
}

const initialState: UIState = {
  loading: false,
  error: null,
  currentView: 'form',
  showModal: false,
  modalType: null,
  backendAvailable: true,
  initializing: true,
};

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
} = uiSlice.actions;

export default uiSlice.reducer;
