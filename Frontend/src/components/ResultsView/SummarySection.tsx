import type { FC } from 'react';

export const SummarySection: FC = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-blue-500/5 p-8 mb-8 max-w-4xl mx-auto border border-gray-100">
      <h2 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Assessment Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <span className="text-lg">💡</span>
            What This Means
          </h3>
          <p className="text-blue-800/80 text-sm leading-relaxed font-medium">
            This AI assessment calculates the probability of disease based on clinical correlations. 
            It is a diagnostic aid designed to highlight potential areas of concern for medical professionals.
          </p>
        </div>

        <div className="p-5 bg-green-50/50 rounded-2xl border border-green-100/50">
          <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
            <span className="text-lg">🚀</span>
            Next Steps
          </h3>
          <ul className="text-green-800/80 text-sm space-y-2 font-medium">
            <li className="flex items-center gap-2">• Review results with your Doctor</li>
            <li className="flex items-center gap-2">• Monitor vitals periodically</li>
            <li className="flex items-center gap-2">• Download full PDF report</li>
          </ul>
        </div>

        <div className="md:col-span-2 p-5 bg-gray-50/50 rounded-2xl border border-gray-100/50">
          <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-lg">⚖️</span>
            Clinical Disclaimer
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed">
            This tool provides risk estimates based on data-driven models. It is NOT a definitive diagnosis. 
            Always seek the advice of your physician or other qualified health provider with any questions 
            regarding a medical condition.
          </p>
        </div>
      </div>
    </div>
  );
};
