import type { FC } from 'react';
import { getFieldError } from '../../utils/validation';
import type { ValidationError } from '../../types';

interface FormInputProps {
  label: string;
  name: string;
  value: string | number;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  placeholder?: string;
  min?: string;
  max?: string;
}

export const FormInput: FC<FormInputProps> = ({
  label,
  name,
  value,
  type = 'text',
  onChange,
  onBlur,
  error,
  touched,
  disabled,
  placeholder,
  min,
  max
}) => {
  const hasError = !!error && touched;
  
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        min={min}
        max={max}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          hasError ? 'border-red-500 focus:ring-red-500 bg-red-50/10' : 'border-gray-300'
        }`}
      />
      {hasError && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
