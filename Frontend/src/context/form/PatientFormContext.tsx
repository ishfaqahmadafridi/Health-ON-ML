import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { PatientInput } from '../../types';

interface PatientFormContextType {
  formData: PatientInput;
  setFormData: React.Dispatch<React.SetStateAction<PatientInput>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  resetForm: () => void;
}

export const PatientFormContext = createContext<PatientFormContextType | undefined>(undefined);

const initialFormState: PatientInput = {
  name: '',
  fatherName: '',
  contactNumber: '',
  heartRate: 76,
  age: 45,
  gender: 'Male',
  height: 175,
  weight: 75,
  systolicBP: 120,
  diastolicBP: 80,
  cholesterol: 'Normal',
  glucose: 'Normal',
  smoker: 'No',
  alcohol: 'No',
  active: 'Yes',
};

export const PatientFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<PatientInput>(initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
  };

  const value = {
    formData,
    setFormData,
    handleChange,
    handleSelectChange,
    resetForm
  };

  return <PatientFormContext.Provider value={value}>{children}</PatientFormContext.Provider>;
};
