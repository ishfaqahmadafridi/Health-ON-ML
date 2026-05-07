import type { FC } from 'react';
import { PatientForm } from '../PatientForm/index';
import { useDashboard } from '../../hooks/dashboard/useDashboard';

/**
 * FormView Component
 * Renders the clinical data entry form.
 * Now consumes submission logic and loading states from DashboardContext.
 */
export const FormView: FC = () => {
  const { onFormSubmit, isLoading } = useDashboard();

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <PatientForm onSubmit={onFormSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};
