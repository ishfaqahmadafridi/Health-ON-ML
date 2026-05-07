import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { markAllAsRead, clearNotifications } from '../../store/slices';

export const NotificationHeader: FC = () => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector(state => state.notification);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
      <h3 className="text-sm font-bold text-gray-800">Notifications</h3>
      <div className="flex gap-3">
        {unreadCount > 0 && (
          <button 
            onClick={() => dispatch(markAllAsRead())}
            className="text-xs font-semibold text-blue-500 hover:text-blue-700 transition-colors"
          >
            Mark all read
          </button>
        )}
        <button 
          onClick={() => dispatch(clearNotifications())}
          className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors"
        >
          Clear all
        </button>
      </div>
    </div>
  );
};
