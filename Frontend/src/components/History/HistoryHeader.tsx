import type { FC } from 'react';
import { ClipboardList } from 'lucide-react';
import { useHistory } from '../../hooks/history/useHistory';

export const HistoryHeader: FC = () => {
  const { history } = useHistory();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
          <ClipboardList className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Assessment History</h2>
          <p className="text-sm text-gray-400 font-medium">Historical diagnostic records and analysis</p>
        </div>
      </div>
      
      <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">Total Records</span>
        <span className="text-sm font-black text-blue-600">{history.length}</span>
      </div>
    </div>
  );
};
