import type { FC } from 'react';
import { useDoctorProfile } from '../../hooks/doctor/useDoctorProfile';

export const ProfileBio: FC = () => {
  const { activeDoctor } = useDoctorProfile();
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3 px-1">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Professional Summary
        </h3>
        {activeDoctor?.specialty && (
          <span className="text-[10px] font-bold text-blue-500 uppercase bg-blue-50 px-2 py-1 rounded-full">
            Specialty: {activeDoctor.specialty}
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-gray-600 leading-relaxed bg-gray-50 p-5 rounded-2xl border border-gray-100">
        Clinical professional dedicated to data-driven risk assessment and patient care. 
        Expertise in multi-variate diagnostic interpretation and health technology integration.
      </p>
    </div>
  );
};
