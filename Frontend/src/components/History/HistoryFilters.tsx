import type { FC } from 'react';
import { Search, Filter } from 'lucide-react';
import { useHistory } from '../../hooks/history/useHistory';

export const HistoryFilters: FC = () => {
  const { searchQuery, handleSearchChange } = useHistory();

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search by assessment ID or date..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all shadow-sm"
        />
      </div>
      
      <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
        <Filter className="h-4 w-4" />
        Filter Records
      </button>
    </div>
  );
};
