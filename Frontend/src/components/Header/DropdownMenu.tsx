import type { FC } from 'react';
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { DropdownMenuItem } from './DropdownMenuItem';

interface DropdownMenuProps {
  onNavigate?: (view: string) => void;
  onClose: () => void;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ onNavigate, onClose }) => {
  const handleItemClick = (view: string) => {
    if (view && onNavigate) {
      onNavigate(view);
    }
    onClose();
  };

  const handleLogout = () => {
    onClose();
    alert('Signed out successfully!');
  };

  return (
    <div className="py-2">
      <DropdownMenuItem 
        icon={User} 
        label="My Profile" 
        onClick={() => handleItemClick('doctor-profile')} 
      />
      <DropdownMenuItem 
        icon={Settings} 
        label="Settings" 
        onClick={() => handleItemClick('settings')} 
      />
      <DropdownMenuItem 
        icon={HelpCircle} 
        label="Help & Support" 
        onClick={() => handleItemClick('')} 
      />
      <div className="border-t border-gray-100 my-1" />
      <DropdownMenuItem 
        icon={LogOut} 
        label="Sign Out" 
        variant="danger" 
        onClick={handleLogout} 
      />
    </div>
  );
};
