import type { FC } from 'react';

interface EditableFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EditableField: FC<EditableFieldProps> = ({ 
  label, 
  name, 
  value, 
  placeholder, 
  type = 'text',
  onChange 
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
        {label}
      </label>
      <input 
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full bg-gray-50 border-2 border-transparent px-4 py-3 rounded-2xl text-sm font-bold text-gray-800 placeholder-gray-300 focus:bg-white focus:border-blue-500/20 focus:outline-none transition-all"
      />
    </div>
  );
};
