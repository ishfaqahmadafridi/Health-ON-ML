import type { FC } from 'react';

export const SidebarLogo: FC = () => {
  return (
    <div className="p-2 mb-4">
      <div className="w-10 h-10 flex items-center justify-center text-[#4A90E2]">
        <svg 
          viewBox="0 0 24 24" 
          className="w-8 h-8 fill-current drop-shadow-[0_0_8px_rgba(74,144,226,0.5)]"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          <path d="M7 8h2l1 2 2-4 1 2h2" fill="none" stroke="#0B3B6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};
