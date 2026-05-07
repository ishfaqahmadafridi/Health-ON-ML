import type { FC } from 'react';
import { Activity } from 'lucide-react';
import { FormSection } from './FormSection';
import { FormField } from './FormField';
import { usePatientForm } from '../../hooks/form/usePatientForm';

export const MedicalMeasurementsSection: FC = () => {
  const { formData, handleChange } = usePatientForm();

  return (
    <FormSection title="Medical Measurements" icon={Activity} color="rose">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormField label="Height (cm)">
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
          />
        </FormField>
        <FormField label="Weight (kg)">
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
          />
        </FormField>
        <FormField label="Systolic BP">
          <input
            type="number"
            name="systolicBP"
            value={formData.systolicBP}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
          />
        </FormField>
        <FormField label="Diastolic BP">
          <input
            type="number"
            name="diastolicBP"
            value={formData.diastolicBP}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
          />
        </FormField>
      </div>
    </FormSection>
  );
};
