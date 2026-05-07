import type { FC } from 'react';

export const ResultsHeader: FC = () => {
  return (
    <div className="mb-12 text-center">
      <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
        Clinical Risk Results
      </h1>
      <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">
        Your personalized AI-driven health assessment based on the multivariate diagnostic model.
      </p>
    </div>
  );
};
