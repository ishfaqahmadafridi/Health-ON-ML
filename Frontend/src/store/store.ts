import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './slices/patientSlice';
import predictionReducer from './slices/predictionSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    patient: patientReducer,
    prediction: predictionReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
