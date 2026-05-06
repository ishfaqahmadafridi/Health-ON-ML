import type { FC, ReactNode } from 'react';

interface DashboardLayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ leftPanel, rightPanel }) => {
  return (
    <div className="flex-1 flex gap-6 overflow-hidden">
      {/* Left Panel - Patient Profile */}
      <div className="w-80 overflow-y-auto sticky top-0 h-screen">
        <div className="p-6">
          {leftPanel}
        </div>
      </div>

      {/* Right Panel - Analysis Results */}
      <div className="flex-1 overflow-y-auto p-6">
        {rightPanel}
      </div>
    </div>
  );
};
