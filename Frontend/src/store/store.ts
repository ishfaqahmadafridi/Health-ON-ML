import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './slices/patient/index';
import predictionReducer from './slices/prediction/index';
import uiReducer from './slices/ui/index';
import doctorReducer from './slices/doctor/index';
import notificationReducer from './slices/notification/index';

export const store = configureStore({
  reducer: {
    patient: patientReducer,
    prediction: predictionReducer,
    ui: uiReducer,
    doctor: doctorReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
