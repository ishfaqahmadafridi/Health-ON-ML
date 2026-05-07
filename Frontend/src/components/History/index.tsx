import type { FC } from 'react';
import { HistoryProvider } from '../../context/history/HistoryContext';
import { useHistory } from '../../hooks/history/useHistory';

// Sub-components
import { HistoryHeader } from './HistoryHeader';
import { HistoryStats } from './HistoryStats';
import { HistoryFilters } from './HistoryFilters';
import { HistoryListItem } from './HistoryListItem';
import { EmptyHistory } from './EmptyHistory';

/**
 * Internal view component that consumes the History Context
 */
const HistoryViewContent: FC = () => {
  const {
    history,
    searchQuery,
    filteredHistory,
    handleView,
    handleDelete,
    handleSearchChange
  } = useHistory();

  return (
    <div className="max-w-5xl mx-auto w-full p-6 animate-in fade-in duration-500">
      <HistoryHeader />
      <HistoryStats />
      
      <HistoryFilters />

      <div className="mt-8">
        {filteredHistory.length === 0 ? (
          <EmptyHistory />
        ) : (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            {filteredHistory.map((entry) => (
              <HistoryListItem 
                key={entry.id}
                entry={entry}
                onView={() => handleView(entry)}
                onDelete={() => handleDelete(entry.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Main HistoryView entry point wrapped in the HistoryProvider
 */
export const HistoryView: FC = () => {
  return (
    <HistoryProvider>
      <HistoryViewContent />
    </HistoryProvider>
  );
};
