import { createSlice } from '@reduxjs/toolkit';
import type { PatientInput } from '../../types';

interface PatientState {
  data: PatientInput | null;
  history: PatientInput[];
}

const initialState: PatientState = {
  data: null,
  history: [],
};

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatientData: (state, action) => {
      state.data = action.payload as PatientInput;
      // Add to history if not already there
      if (state.data && !state.history.find(h => JSON.stringify(h) === JSON.stringify(state.data))) {
        state.history.unshift(state.data);
      }
    },
    clearPatientData: (state) => {
      state.data = null;
    },
    loadPatientFromHistory: (state, action) => {
      state.data = action.payload as PatientInput;
    },
    clearHistory: (state) => {
      state.history = [];
    },
    removeFromHistory: (state, action) => {
      state.history = state.history.filter((_, index) => index !== action.payload);
    },
  },
});

export const {
  setPatientData,
  clearPatientData,
  loadPatientFromHistory,
  clearHistory,
  removeFromHistory,
} = patientSlice.actions;

export default patientSlice.reducer;
