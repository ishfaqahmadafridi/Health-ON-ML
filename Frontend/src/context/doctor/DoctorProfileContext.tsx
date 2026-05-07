import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { addDoctor, updateDoctor, setCurrentDoctor, deleteDoctor } from '../../store/slices';
import type { Doctor } from '../../types';

interface DoctorProfileContextType {
  doctors: Doctor[];
  currentDoctorId: string | null;
  activeDoctor: Doctor;
  isEditing: boolean;
  formData: Doctor;
  setFormData: React.Dispatch<React.SetStateAction<Doctor>>;
  handleEdit: (doctor: Doctor) => void;
  handleNew: () => void;
  handleSave: () => void;
  handleSwitch: (id: string) => void;
  handleDelete: (id: string) => void;
  handleCancel: () => void;
}

export const DoctorProfileContext = createContext<DoctorProfileContextType | undefined>(undefined);

export const DoctorProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { doctors, currentDoctorId } = useAppSelector(state => state.doctor);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Doctor>({
    id: '', name: '', email: '', role: '', specialty: '', image: null
  });

  const activeDoctor = doctors.find(d => d.id === currentDoctorId) || doctors[0];

  const handleEdit = (doctor: Doctor) => {
    setFormData(doctor);
    setIsEditing(true);
  };

  const handleNew = () => {
    setFormData({
      id: `doc-${Date.now()}`, 
      name: '', 
      email: '', 
      role: 'Physician', 
      specialty: 'General Medicine', 
      image: null
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.name) return alert('Practitioner name is mandatory');
    const existing = doctors.find(d => d.id === formData.id);
    
    if (existing) {
      dispatch(updateDoctor(formData));
    } else {
      dispatch(addDoctor(formData));
    }
    setIsEditing(false);
  };

  const handleSwitch = (id: string) => {
    dispatch(setCurrentDoctor(id));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Terminate this professional profile?')) {
      dispatch(deleteDoctor(id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const value = {
    doctors,
    currentDoctorId,
    activeDoctor,
    isEditing,
    formData,
    setFormData,
    handleEdit,
    handleNew,
    handleSave,
    handleSwitch,
    handleDelete,
    handleCancel
  };

  return <DoctorProfileContext.Provider value={value}>{children}</DoctorProfileContext.Provider>;
};
