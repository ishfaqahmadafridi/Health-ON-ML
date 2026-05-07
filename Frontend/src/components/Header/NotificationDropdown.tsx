import type { FC } from 'react';
import { NotificationHeader } from './NotificationHeader';
import { NotificationList } from './NotificationList';
import { NotificationFooter } from './NotificationFooter';

export const NotificationDropdown: FC = () => {
  return (
    <div className="absolute right-0 top-12 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <NotificationHeader />
      <NotificationList />
      <NotificationFooter />
    </div>
  );
};
