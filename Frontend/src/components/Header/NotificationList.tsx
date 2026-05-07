import type { FC } from 'react';
import { useAppSelector } from '../../store';
import { NotificationItem } from './NotificationItem';

export const NotificationList: FC = () => {
  const { notifications } = useAppSelector(state => state.notification);

  if (notifications.length === 0) {
    return (
      <div className="px-5 py-8 text-center">
        <p className="text-sm text-gray-400">No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="max-h-80 overflow-y-auto">
      {notifications.map(notif => (
        <NotificationItem key={notif.id} {...notif} />
      ))}
    </div>
  );
};
