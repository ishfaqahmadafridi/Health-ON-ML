import { useState } from 'react';
import type { FC } from 'react';
import { Search, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setSearchQuery } from '../../store/slices';

interface SearchInputProps {
  onNavigate?: (view: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ onNavigate }) => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector(state => state.ui);
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim() && onNavigate) {
      onNavigate('history');
      setFocused(false);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
        <Search className={`h-4 w-4 transition-colors ${focused ? 'text-blue-500' : 'text-gray-400'}`} />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="block w-64 pl-10 pr-8 py-2 bg-gray-100/50 border-none rounded-xl text-sm placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
        placeholder="Search patients, reports..."
      />
      {searchQuery && (
        <button
          onClick={() => dispatch(setSearchQuery(''))}
          className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};
