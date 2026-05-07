import type { FC } from 'react';

interface SpecialtySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const SpecialtySelector: FC<SpecialtySelectorProps> = ({ value, onChange }) => {
  const specialties = [
    'General Medicine',
    'Cardiology',
    'Endocrinology',
    'Nephrology',
    'Pediatrics',
    'Neurology',
    'Emergency Medicine'
  ];

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
        Clinical Specialty
      </label>
      <div className="flex flex-wrap gap-2">
        {specialties.map(spec => (
          <button
            key={spec}
            type="button"
            onClick={() => onChange(spec)}
            className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all border-2 ${
              value === spec 
                ? 'bg-blue-600 border-transparent text-white shadow-lg shadow-blue-600/20' 
                : 'bg-white border-gray-100 text-gray-500 hover:border-blue-200 hover:text-blue-600'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>
    </div>
  );
};
