import type { FC, ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

export const FormField: FC<FormFieldProps> = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      {children}
    </div>
  );
};
