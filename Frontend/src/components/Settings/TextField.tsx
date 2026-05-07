import type { FC } from 'react';

interface TextFieldProps {
  label: string;
  value: string;
}

export const TextField: FC<TextFieldProps> = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium text-gray-800">{value}</span>
    </div>
  );
};
