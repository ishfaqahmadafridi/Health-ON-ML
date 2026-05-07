import React, { createContext, useContext, ReactNode } from 'react';
import { useAppSelector } from '../../store';
import type { PatientInput, PredictionResponse } from '../../types';

interface DetailedProfileContextType {
  data: PatientInput | null;
  prediction: PredictionResponse | null;
  shapFeatures: Array<{ label: string; val: number; color: string }>;
}

export const DetailedProfileContext = createContext<DetailedProfileContextType | undefined>(undefined);

export const DetailedProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data } = useAppSelector(state => state.prediction);
  
  // Mock SHAP data (This would normally come from the prediction API response)
  const shapFeatures: DetailedProfileContextType['shapFeatures'] = [
    { label: 'Glucose', val: 95, color: 'bg-pink-500' },
    { label: 'Age', val: 78, color: 'bg-purple-500' },
    { label: 'Systolic BP', val: 65, color: 'bg-blue-500' },
    { label: 'Cholesterol', val: 42, color: 'bg-indigo-500' },
    { label: 'BMI', val: 30, color: 'bg-cyan-500' },
  ];

  const value = {
    data,
    prediction: null, // Link to actual prediction results if needed
    shapFeatures
  };

  return (
    <DetailedProfileContext.Provider value={value}>
      {children}
    </DetailedProfileContext.Provider>
  );
};
