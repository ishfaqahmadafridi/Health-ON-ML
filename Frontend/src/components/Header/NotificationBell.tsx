import type { FC } from 'react';
import { Bell } from 'lucide-react';
import { useAppSelector } from '../../store';

interface NotificationBellProps {
  active: boolean;
  onClick: () => void;
}

export const NotificationBell: FC<NotificationBellProps> = ({ active, onClick }) => {
  const { notifications } = useAppSelector(state => state.notification);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <button
      onClick={onClick}
      className={`relative p-2.5 rounded-xl transition-all ${
        active ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
      }`}
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-5 w-5 bg-red-500 text-[10px] font-bold text-white rounded-full border-2 border-white">
          {unreadCount}
        </span>
      )}
    </button>
  );
};
