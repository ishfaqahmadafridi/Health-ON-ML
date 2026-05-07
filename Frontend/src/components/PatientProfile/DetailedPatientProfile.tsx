import type { FC } from 'react';
import { ProfileSectionHeader } from './ProfileSectionHeader';
import { PatientIdField } from './PatientIdField';
import { NameField } from './NameField';
import { FamilyInfoRow } from './FamilyInfoRow';
import { DemographicsRow } from './DemographicsRow';
import { BiometricsHeader } from './BiometricsHeader';
import { MeasurementsRow } from './MeasurementsRow';
import { BMIDisplay } from './BMIDisplay';
import { VitalsHeader } from './VitalsHeader';
import { BPDisplay } from './BPDisplay';
import { GlucoseDisplay } from './GlucoseDisplay';
import { SHAPHeader } from './SHAPHeader';
import { SHAPChart } from './SHAPChart';
import { PredictionButton } from './PredictionButton';
import { useDetailedProfile } from '../../hooks/patient/useDetailedProfile';

export const DetailedPatientProfile: FC = () => {
  const { data } = useDetailedProfile();

  if (!data) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <ProfileSectionHeader title="Patient Profile & Input Data" />
        <p className="text-center text-gray-500 py-8">No patient data loaded</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-5 border border-gray-100">
      <ProfileSectionHeader title="Patient Profile & Input Data" />

      {/* Personal Info */}
      <div className="flex flex-col gap-3">
        <PatientIdField />
        <NameField />
        <FamilyInfoRow />
        <DemographicsRow />
      </div>

      {/* Biometrics */}
      <div className="flex flex-col gap-3">
        <BiometricsHeader />
        <MeasurementsRow />
        <BMIDisplay />
      </div>

      {/* Vitals */}
      <div className="flex flex-col gap-3">
        <VitalsHeader />
        <BPDisplay />
        <GlucoseDisplay />
      </div>

      {/* SHAP Insights */}
      <div>
        <SHAPHeader />
        <SHAPChart />
      </div>

      <PredictionButton />
    </div>
  );
};
