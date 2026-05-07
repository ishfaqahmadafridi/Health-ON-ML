import type { FC } from 'react';

export const ProfileBio: FC = () => {
  return (
    <div className="mb-8">
      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">
        Professional Summary
      </h3>
      <p className="text-sm font-medium text-gray-600 leading-relaxed bg-gray-50 p-5 rounded-2xl border border-gray-100">
        Clinical professional dedicated to data-driven risk assessment and patient care. 
        Expertise in multi-variate diagnostic interpretation and health technology integration.
      </p>
    </div>
  );
};
