import type { FC, ReactNode } from 'react';

interface DashboardLayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ leftPanel, rightPanel }) => {
  return (
    <div className="flex gap-8 items-start w-full max-w-[1600px] mx-auto">
      {/* Left Panel - Patient Profile */}
      <div className="w-80 shrink-0">
        {leftPanel}
      </div>

      {/* Right Panel - Analysis Results */}
      <div className="flex-1 min-w-0">
        {rightPanel}
      </div>
    </div>
  );
};
