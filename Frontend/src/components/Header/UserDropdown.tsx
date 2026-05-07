import type { FC } from 'react';
import { DropdownUserInfo } from './DropdownUserInfo';
import { DropdownMenu } from './DropdownMenu';

interface UserDropdownProps {
  onNavigate?: (view: string) => void;
  onClose: () => void;
}

export const UserDropdown: FC<UserDropdownProps> = ({ onNavigate, onClose }) => {
  return (
    <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <DropdownUserInfo />
      <DropdownMenu onNavigate={onNavigate} onClose={onClose} />
    </div>
  );
};
