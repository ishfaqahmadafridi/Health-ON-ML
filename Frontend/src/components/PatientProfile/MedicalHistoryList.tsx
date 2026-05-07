import type { FC } from 'react';
import { usePatientProfile } from '../../hooks/patient/usePatientProfile';

export const MedicalHistoryList: FC = () => {
  const { historyItems } = usePatientProfile();

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Medical History</h3>
      <div className="space-y-3">
        {historyItems.map(item => (
          <div key={item.condition} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
              <span className="text-sm font-medium text-gray-800">{item.condition}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400">Since {item.since}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                item.status === 'Ongoing' ? 'bg-orange-50 text-orange-600' :
                item.status === 'Managed' ? 'bg-yellow-50 text-yellow-600' :
                'bg-green-50 text-green-600'
              }`}>{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
