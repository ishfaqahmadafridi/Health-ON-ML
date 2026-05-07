import type { FC } from 'react';
import type { PatientInput } from '../../types';

interface SectionProps {
  formData: PatientInput;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export const MedicalHistorySection: FC<SectionProps> = ({
  formData,
  onChange,
  isLoading,
}) => {
  const historyFields = [
    { name: 'familyHistoryHeartDisease', label: 'Family history of heart disease' },
    { name: 'familyHistoryDiabetes', label: 'Family history of diabetes' },
    { name: 'familyHistoryKidneyDisease', label: 'Family history of kidney disease' },
    { name: 'previousHeartCondition', label: 'Previous heart condition' },
    { name: 'previousDiabetes', label: 'Previously diagnosed with diabetes' },
    { name: 'previousKidneyDisease', label: 'Previously diagnosed with kidney disease' },
  ] as const;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
        Medical History
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {historyFields.map((field) => (
          <label key={field.name} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name as keyof PatientInput] as boolean}
              onChange={onChange}
              disabled={isLoading}
              className="w-5 h-5 text-blue-500 rounded-lg border-gray-300 focus:ring-blue-500/20 transition-all"
            />
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
              {field.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
