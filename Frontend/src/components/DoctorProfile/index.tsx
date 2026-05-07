import type { FC } from 'react';
import { DoctorProfileProvider } from '../../context/doctor/DoctorProfileContext';
import { useDoctorProfile } from '../../hooks/doctor/useDoctorProfile';

// Sub-components
import { ProfileHeader } from './ProfileHeader';
import { ProfileForm } from './ProfileForm';
import { DoctorList } from './DoctorList';
import { ProfileStats } from './ProfileStats';
import { ProfileBio } from './ProfileBio';
import { DeleteDoctorButton } from './DeleteDoctorButton';

/**
 * Internal view component that consumes the Doctor Profile Context
 */
const DoctorProfileContent: FC = () => {
  const {
    doctors,
    activeDoctor,
    isEditing,
    handleDelete
  } = useDoctorProfile();

  return (
    <div className="max-w-5xl mx-auto w-full p-6 animate-in fade-in duration-500">
      <ProfileHeader />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Form or Stats */}
        <div className="lg:col-span-7">
          {isEditing ? (
            <ProfileForm />
          ) : (
            <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-blue-500/5 border border-gray-100">
              <ProfileStats />
              <ProfileBio />
              <DoctorList />
            </div>
          )}
        </div>

        {/* Right Column: Info & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 text-center">
            <div className="w-24 h-24 rounded-3xl mx-auto mb-4 overflow-hidden border-4 border-blue-50 shadow-inner">
              {activeDoctor?.image ? (
                <img src={activeDoctor.image} alt={activeDoctor.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-300">
                   <span className="text-2xl font-black">?</span>
                </div>
              )}
            </div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">{activeDoctor?.name}</h3>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mt-1">Active Practitioner</p>
            
            <div className="mt-8 space-y-3 text-left">
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID Reference</span>
                <span className="text-xs font-bold text-gray-700">{activeDoctor?.id}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</span>
                <span className="text-xs font-bold text-gray-700">{activeDoctor?.email}</span>
              </div>
            </div>

            {!isEditing && doctors.length > 1 && (
              <DeleteDoctorButton onDelete={() => handleDelete(activeDoctor.id)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Main DoctorProfile entry point wrapped in the DoctorProfileProvider
 */
export const DoctorProfile: FC = () => {
  return (
    <DoctorProfileProvider>
      <DoctorProfileContent />
    </DoctorProfileProvider>
  );
};
