import type { FC } from 'react';

export const ResultsFooter: FC = () => {
  return (
    <div className="mt-16 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        Assessment Verified • {new Date().toLocaleDateString()}
      </div>
      <p className="text-gray-400 text-xs font-medium">
        Health-ON-ML © 2024 • Clinical Prediction Protocol v2.4
      </p>
    </div>
  );
};
