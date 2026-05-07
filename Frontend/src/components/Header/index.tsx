import { useState, useRef, useEffect } from 'react';
import type { FC } from 'react';
import { ChevronDown } from 'lucide-react';
import { HeaderProvider } from '../../context/header/HeaderContext';
import { HeaderLogo } from './HeaderLogo';
import { SearchInput } from './SearchInput';
import { NotificationBell } from './NotificationBell';
import { NotificationDropdown } from './NotificationDropdown';
import { UserAvatar } from './UserAvatar';
import { UserProfileInfo } from './UserProfileInfo';
import { UserDropdown } from './UserDropdown';

interface HeaderProps {
  onNavigate?: (view: string) => void;
}

const HeaderContent: FC<HeaderProps> = ({ onNavigate }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border border-gray-100 flex items-center justify-between px-8 sticky top-4 z-30 shadow-sm rounded-2xl mt-4 ml-4 mb-2 transition-all">
      <HeaderLogo />

      <div className="flex items-center gap-6">
        <SearchInput onNavigate={onNavigate} />

        <div ref={notifRef} className="relative">
          <NotificationBell 
            active={showNotifications} 
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }} 
          />
          {showNotifications && <NotificationDropdown />}
        </div>

        <div ref={profileRef} className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className={`flex items-center gap-2 pl-4 border-l border-gray-100 cursor-pointer transition-all ${
              showProfile ? 'opacity-100' : 'hover:opacity-80'
            }`}
          >
            <UserAvatar />
            <UserProfileInfo />
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
          </button>
          {showProfile && <UserDropdown onNavigate={onNavigate} onClose={() => setShowProfile(false)} />}
        </div>
      </div>
    </header>
  );
};

export const Header: FC<HeaderProps> = (props) => {
  return (
    <HeaderProvider>
      <HeaderContent {...props} />
    </HeaderProvider>
  );
};
