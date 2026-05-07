import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Doctor, DoctorState } from '../../../types';

// Check localStorage for initial state
const loadInitialState = (): DoctorState => {
  try {
    const saved = localStorage.getItem('health_on_ml_doctors');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load doctors from localStorage', e);
  }
  
  // Default fallback if no data
  return {
    doctors: [
      {
        id: 'default-1',
        name: 'Dr. Ahmad Khan',
        email: 'ahmad.khan@hospital.org',
        role: 'Physician',
        specialty: 'General Medicine',
        image: null
      }
    ],
    currentDoctorId: 'default-1'
  };
};

const initialState: DoctorState = loadInitialState();

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    addDoctor: (state, action: PayloadAction<Doctor>) => {
      state.doctors.push(action.payload);
      state.currentDoctorId = action.payload.id;
      try { localStorage.setItem('health_on_ml_doctors', JSON.stringify(state)); } catch (e) { console.error('Storage full', e); }
    },
    updateDoctor: (state, action: PayloadAction<Doctor>) => {
      const index = state.doctors.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.doctors[index] = action.payload;
        try { localStorage.setItem('health_on_ml_doctors', JSON.stringify(state)); } catch (e) { console.error('Storage full', e); }
      }
    },
    setCurrentDoctor: (state, action: PayloadAction<string>) => {
      state.currentDoctorId = action.payload;
      try { localStorage.setItem('health_on_ml_doctors', JSON.stringify(state)); } catch (e) { console.error('Storage full', e); }
    },
    deleteDoctor: (state, action: PayloadAction<string>) => {
      state.doctors = state.doctors.filter(d => d.id !== action.payload);
      if (state.currentDoctorId === action.payload) {
        state.currentDoctorId = state.doctors.length > 0 ? state.doctors[0].id : null;
      }
      try { localStorage.setItem('health_on_ml_doctors', JSON.stringify(state)); } catch (e) { console.error('Storage full', e); }
    }
  },
});

export const { addDoctor, updateDoctor, setCurrentDoctor, deleteDoctor } = doctorSlice.actions;

export default doctorSlice.reducer;
