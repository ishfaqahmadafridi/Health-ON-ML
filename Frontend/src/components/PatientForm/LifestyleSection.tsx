import type { FC } from 'react';
import { Heart } from 'lucide-react';
import { FormSection } from './FormSection';
import { FormField } from './FormField';
import { usePatientForm } from '../../hooks/form/usePatientForm';

export const LifestyleSection: FC = () => {
  const { formData, handleChange } = usePatientForm();

  return (
    <FormSection title="Lifestyle Factors" icon={Heart} color="emerald">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField label="Cholesterol">
          <select
            name="cholesterol"
            value={formData.cholesterol}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
          >
            <option value="Normal">Normal</option>
            <option value="Above Normal">Above Normal</option>
            <option value="Well Above Normal">Well Above Normal</option>
          </select>
        </FormField>

        <FormField label="Glucose">
          <select
            name="glucose"
            value={formData.glucose}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
          >
            <option value="Normal">Normal</option>
            <option value="Above Normal">Above Normal</option>
            <option value="Well Above Normal">Well Above Normal</option>
          </select>
        </FormField>

        <FormField label="Active Lifestyle">
          <select
            name="active"
            value={formData.active}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
          >
            <option value="Yes">Yes, Active</option>
            <option value="No">No, Sedentary</option>
          </select>
        </FormField>
      </div>
    </FormSection>
  );
};
