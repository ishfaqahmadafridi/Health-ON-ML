import type { FC } from 'react';
import { PatientFormProvider } from '../../context/form/PatientFormContext';
import { usePatientForm } from '../../hooks/form/usePatientForm';
import { FormLayout } from './FormLayout';
import { PersonalInfoSection } from './PersonalInfoSection';
import { MedicalMeasurementsSection } from './MedicalMeasurementsSection';
import { LifestyleSection } from './LifestyleSection';
import { FormActions } from './FormActions';
import type { PatientInput } from '../../types';

interface PatientFormProps {
  onSubmit: (data: PatientInput) => void;
  isLoading: boolean;
}

/**
 * Internal content component that consumes the PatientForm Context
 */
const PatientFormContent: FC<PatientFormProps> = ({ onSubmit, isLoading }) => {
  const { formData } = usePatientForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormLayout>
        <PersonalInfoSection />
        <MedicalMeasurementsSection />
        <LifestyleSection />
        <FormActions isLoading={isLoading} />
      </FormLayout>
    </form>
  );
};

/**
 * PatientForm Component
 * Main entry point for patient data entry.
 * Wraps all sections in the PatientFormProvider.
 */
export const PatientForm: FC<PatientFormProps> = (props) => {
  return (
    <PatientFormProvider>
      <PatientFormContent {...props} />
    </PatientFormProvider>
  );
};
