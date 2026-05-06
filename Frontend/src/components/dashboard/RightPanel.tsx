import type { FC, ReactNode } from 'react';

interface RightPanelProps {
  children: ReactNode;
}

export const RightPanel: FC<RightPanelProps> = ({ children }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      {children}
    </div>
  );
};
