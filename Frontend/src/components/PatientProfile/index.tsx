import type { FC } from 'react';
import { PatientProfileProvider } from '../../context/patient/PatientProfileContext';
import { ProfileAvatar } from './ProfileAvatar';
import { PersonalInfoGrid } from './PersonalInfoGrid';
import { ClinicalMeasurementsCard } from './ClinicalMeasurementsCard';
import { MedicalHistoryList } from './MedicalHistoryList';
import { LifestyleSummary } from './LifestyleSummary';

/**
 * PatientProfile Module Entry Point
 * Orchestrates all clinical record and demographic sub-components.
 */
export const PatientProfile: FC = () => {
  return (
    <PatientProfileProvider>
      <div className="max-w-3xl mx-auto w-full space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Patient Profile</h2>
        
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          <ProfileAvatar />
          <PersonalInfoGrid />
        </div>

        <ClinicalMeasurementsCard />
        <MedicalHistoryList />
        <LifestyleSummary />
      </div>
    </PatientProfileProvider>
  );
};
