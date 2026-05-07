import React, { createContext, useContext, ReactNode } from 'react';
import { useAppSelector } from '../../store';
import type { PatientInput } from '../../types';

interface PatientProfileContextType {
  patientData: PatientInput | null;
  hasData: boolean;
  historyItems: Array<{
    condition: string;
    since: string;
    status: 'Ongoing' | 'Managed' | 'Resolved';
    color: string;
  }>;
}

export const PatientProfileContext = createContext<PatientProfileContextType | undefined>(undefined);

export const PatientProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: patientData } = useAppSelector(state => state.prediction);
  const hasData = !!patientData;

  // Mock clinical history (could be moved to Redux later)
  const historyItems: PatientProfileContextType['historyItems'] = [
    { condition: 'Mild Hypertension', since: '2022', status: 'Managed', color: 'bg-yellow-500' },
    { condition: 'Seasonal Allergies', since: '2019', status: 'Ongoing', color: 'bg-orange-500' },
    { condition: 'Appendectomy', since: '2015', status: 'Resolved', color: 'bg-green-500' },
  ];

  const value = {
    patientData,
    hasData,
    historyItems
  };

  return <PatientProfileContext.Provider value={value}>{children}</PatientProfileContext.Provider>;
};
