import type { FC } from 'react';
import { PatientForm } from '../PatientForm';
import type { PatientInput } from '../../types';

interface FormViewProps {
  onSubmit: (data: PatientInput) => void;
  isLoading: boolean;
}

export const FormView: FC<FormViewProps> = ({ onSubmit, isLoading }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <PatientForm onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};
