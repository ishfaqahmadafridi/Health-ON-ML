import type { FC } from 'react';

interface ActionButtonsProps {
  onNewAssessment: () => void;
}

export const ActionButtons: FC<ActionButtonsProps> = ({ onNewAssessment }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
      <button
        onClick={onNewAssessment}
        className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-600/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
        New Assessment
      </button>
      <button className="flex-1 bg-white hover:bg-gray-50 active:scale-[0.98] text-gray-900 font-bold py-4 px-6 rounded-2xl border border-gray-200 shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2">
        <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download PDF
      </button>
    </div>
  );
};
