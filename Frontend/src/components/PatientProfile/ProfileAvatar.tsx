import type { FC } from 'react';
import { User } from 'lucide-react';
import { usePatientProfile } from '../../hooks/patient/usePatientProfile';

export const ProfileAvatar: FC = () => {
  const { patientData } = usePatientProfile();

  return (
    <div className="flex items-center gap-6 mb-8">
      <div className="w-20 h-20 rounded-2xl bg-blue-50 border-2 border-blue-100 flex items-center justify-center">
        <User className="w-10 h-10 text-blue-500" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900">
          {patientData?.name || 'Unregistered Patient'}
        </h3>
        <p className="text-sm text-gray-500">Patient ID: P-{Math.floor(Math.random() * 90000) + 10000}</p>
        <span className="inline-block mt-1 px-3 py-0.5 bg-green-50 text-green-700 text-xs font-bold rounded-full">Active</span>
      </div>
    </div>
  );
};
