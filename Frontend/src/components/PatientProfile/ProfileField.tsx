import type { FC, ReactNode } from 'react';

interface ProfileFieldProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export const ProfileField: FC<ProfileFieldProps> = ({ label, children, className = '' }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
        {label}
      </label>
      <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700">
        {children}
      </div>
    </div>
  );
};
