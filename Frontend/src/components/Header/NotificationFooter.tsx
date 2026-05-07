import type { FC } from 'react';

export const NotificationFooter: FC = () => {
  return (
    <div className="px-5 py-3 border-t border-gray-100 text-center">
      <button className="text-xs font-semibold text-blue-500 hover:text-blue-700 transition-colors">
        View all notifications
      </button>
    </div>
  );
};
