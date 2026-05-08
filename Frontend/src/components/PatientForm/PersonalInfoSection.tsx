import type { FC } from 'react';
import { User } from 'lucide-react';
import { FormSection } from './FormSection';
import { FormField } from './FormField';
import { usePatientForm } from '../../hooks/form/usePatientForm';

export const PersonalInfoSection: FC = () => {
  const { formData, handleChange, handleSelectChange } = usePatientForm();

  return (
    <FormSection title="Personal Information" icon={User} color="blue">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Full Name">
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          />
        </FormField>

        <FormField label="Father's Name">
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName || ''}
            onChange={handleChange}
            placeholder="Richard Doe"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          />
        </FormField>

        <FormField label="Contact Number">
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber || ''}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            required
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          />
        </FormField>

        <FormField label="Age (years)">
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="1"
            max="120"
            required
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          />
        </FormField>

        <FormField label="Gender">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </FormField>
      </div>
    </FormSection>
  );
};
