import type { FC } from 'react';
import { FileText } from 'lucide-react';
import type { HistoryEntry } from '../../types';
import { formatAssessmentDate } from '../../utils/history';
import { RiskSummaryBadge } from './RiskSummaryBadge';
import { HistoryItemActions } from './HistoryItemActions';

interface HistoryListItemProps {
  entry: HistoryEntry;
  onView: () => void;
  onDelete: () => void;
}

export const HistoryListItem: FC<HistoryListItemProps> = ({ entry, onView, onDelete }) => {
  const { results } = entry;
  const formattedDate = formatAssessmentDate(entry.timestamp);

  return (
    <div 
      onClick={onView}
      className="group bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer mb-4"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            <FileText className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h4 className="text-sm font-black text-gray-900 tracking-tight">{formattedDate}</h4>
              <span className="text-[9px] font-black px-2 py-0.5 bg-green-50 text-green-600 rounded-lg uppercase tracking-wider">
                Completed
              </span>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              Ref ID: <span className="text-gray-600">{entry.id}</span>
            </p>
          </div>
        </div>

        <HistoryItemActions onView={onView} onDelete={onDelete} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RiskSummaryBadge type="heart" label="Heart" score={results.heartDisease.riskScore} />
        <RiskSummaryBadge type="diabetes" label="Diabetes" score={results.diabetes.riskScore} />
        <RiskSummaryBadge type="kidney" label="Kidney" score={results.kidneyDisease.riskScore} />
      </div>
    </div>
  );
};
