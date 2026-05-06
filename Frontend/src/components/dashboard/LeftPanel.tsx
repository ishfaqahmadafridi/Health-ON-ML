import type { FC, ReactNode } from 'react';

interface LeftPanelProps {
  children: ReactNode;
}

export const LeftPanel: FC<LeftPanelProps> = ({ children }) => {
  return (
    <div className="w-80 overflow-y-auto sticky top-0 h-screen">
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
