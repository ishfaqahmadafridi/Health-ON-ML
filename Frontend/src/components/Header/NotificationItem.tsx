import type { FC } from 'react';
import { useAppDispatch } from '../../store';
import { markAsRead } from '../../store/slices';

interface NotificationItemProps {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: string;
  isRead: boolean;
}

export const NotificationItem: FC<NotificationItemProps> = ({ id, title, message, timestamp, type, isRead }) => {
  const dispatch = useAppDispatch();

  const getNotifColor = (t: string) => {
    switch (t) {
      case 'alert': return 'bg-red-500';
      case 'success': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const formatTime = (ts: string) => {
    const date = new Date(ts);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      onClick={() => dispatch(markAsRead(id))}
      className={`px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
        !isRead ? 'bg-blue-50/30' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${getNotifColor(type)}`} />
        <div className="flex-1 min-w-0">
          <p className={`text-sm ${!isRead ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
            {title}
          </p>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{message}</p>
          <p className="text-[10px] text-gray-400 mt-1 font-medium">{formatTime(timestamp)}</p>
        </div>
      </div>
    </div>
  );
};
