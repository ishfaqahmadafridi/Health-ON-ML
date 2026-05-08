import type { FC } from 'react';
import { DiseaseGaugesSection } from './DiseaseGaugesSection';
import { ExplanationSection } from './ExplanationSection';
import { useDashboard } from '../../hooks/dashboard/useDashboard';

/**
 * AnalysisView Component
 * Displays the clinical diagnostic results.
 * Now consumes data directly from DashboardContext.
 */
export const AnalysisView: FC = () => {
  const { patientData, error } = useDashboard();
  
  if (error) {
    return (
      <div className="bg-white rounded-[24px] shadow-2xl p-8 border border-red-100 flex flex-col items-center gap-4">
        <div className="text-red-500 text-4xl">⚠️</div>
        <h2 className="text-xl font-black text-gray-900 uppercase">Analysis Failed</h2>
        <p className="text-gray-600 text-center max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold uppercase text-[10px] tracking-widest"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!patientData) return null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">
          Multivariate Disease Risk Analysis
        </h2>
        <DiseaseGaugesSection />
      </div>
      
      <ExplanationSection />
    </div>
  );
};
