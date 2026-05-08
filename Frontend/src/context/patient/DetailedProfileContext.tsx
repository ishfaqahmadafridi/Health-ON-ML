import React, { createContext, useContext, ReactNode } from 'react';
import type { PatientInput } from '../../types';

interface SHAPFeature {
  label: string;
  val: number;
  color: string;
}

interface DetailedProfileContextType {
  data: PatientInput | null;
  shapFeatures: SHAPFeature[];
}

export const DetailedProfileContext = createContext<DetailedProfileContextType | undefined>(undefined);

export const DetailedProfileProvider: React.FC<{ 
  children: ReactNode; 
  initialData?: PatientInput | null 
}> = ({ children, initialData }) => {
  
  const shapFeatures: SHAPFeature[] = [
    { label: 'Glucose', val: 95, color: 'bg-pink-500' },
    { label: 'BP', val: 75, color: 'bg-blue-600' },
    { label: 'Cholesterol', val: 45, color: 'bg-indigo-700' },
    { label: 'Age', val: 30, color: 'bg-blue-900' },
  ];

  const value = {
    data: initialData || null,
    shapFeatures
  };

  return (
    <DetailedProfileContext.Provider value={value}>
      {children}
    </DetailedProfileContext.Provider>
  );
};


