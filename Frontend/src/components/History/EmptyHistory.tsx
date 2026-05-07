import type { FC } from 'react';
import { FileSearch } from 'lucide-react';
import { useHistory } from '../../hooks/history/useHistory';

export const EmptyHistory: FC = () => {
  const { searchQuery } = useHistory();
  const hasSearchQuery = !!searchQuery;

  return (
    <div className="bg-white rounded-[40px] p-16 text-center border-2 border-dashed border-gray-100 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-inner">
        <FileSearch className="w-10 h-10 text-gray-300" />
      </div>
      <h3 className="text-xl font-black text-gray-900 tracking-tight mb-2">
        {hasSearchQuery ? 'No Results Found' : 'No Assessment History'}
      </h3>
      <p className="text-sm font-medium text-gray-400 max-w-sm mx-auto leading-relaxed">
        {hasSearchQuery 
          ? `We couldn't find any records matching "${searchQuery}". Please try a different ID or date.` 
          : 'Historical assessment data will appear here once you perform your first clinical analysis.'}
      </p>
      
      {!hasSearchQuery && (
        <button className="mt-8 px-8 py-3 bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all">
          Start New Assessment
        </button>
      )}
    </div>
  );
};
