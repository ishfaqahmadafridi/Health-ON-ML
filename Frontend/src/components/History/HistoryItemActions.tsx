import type { FC } from 'react';
import { Eye, Download, Trash2 } from 'lucide-react';

interface HistoryItemActionsProps {
  onView: () => void;
  onDelete: () => void;
}

export const HistoryItemActions: FC<HistoryItemActionsProps> = ({ onView, onDelete }) => {
  return (
    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button 
        onClick={(e) => { e.stopPropagation(); onView(); }}
        className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all active:scale-90"
        title="View Full Report"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button 
        className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-all active:scale-90"
        title="Download PDF"
      >
        <Download className="w-4 h-4" />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all active:scale-90"
        title="Delete Record"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
