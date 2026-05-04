/**
 * ResultsView Component
 * Displays the complete risk prediction results
 */

import type { PredictionResponse } from '../types';
import { RiskCard } from './RiskCard';

export interface ResultsViewProps {
  results: PredictionResponse;
  onNewAssessment: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ results, onNewAssessment }) => {
  const riskLevels = [
    results.heartDisease.level,
    results.diabetes.level,
    results.kidneyDisease.level,
  ];
  const hasHighRisk = riskLevels.includes('High');
  const hasMediumRisk = riskLevels.includes('Medium');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Health Risk Assessment Results
          </h1>
          <p className="text-gray-600 text-lg">
            Your personalized disease risk prediction based on your health profile
          </p>
        </div>

        {/* Alert if high risk */}
        {hasHighRisk && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <p className="text-red-800 font-semibold">
              ⚠️ High Risk Detected: Please consult with a healthcare provider as soon as possible.
            </p>
          </div>
        )}

        {/* Alert if medium risk */}
        {!hasHighRisk && hasMediumRisk && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <p className="text-yellow-800 font-semibold">
              📋 Medium Risk Identified: Consider scheduling a consultation with your doctor.
            </p>
          </div>
        )}

        {/* Risk Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <RiskCard
            disease="heart"
            title="Heart Disease"
            icon="❤️"
            risk={results.heartDisease}
          />
          <RiskCard
            disease="diabetes"
            title="Diabetes"
            icon="🩸"
            risk={results.diabetes}
          />
          <RiskCard
            disease="kidney"
            title="Kidney Disease"
            icon="🧬"
            risk={results.kidneyDisease}
          />
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Assessment Summary</h2>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-2">What These Results Mean</h3>
              <p className="text-gray-700 text-sm">
                This assessment is based on machine learning models trained on medical data. The risk
                scores represent the probability of having or developing each condition based on your
                health profile. These results are for informational purposes and should not replace
                professional medical advice.
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h3 className="font-semibold text-gray-900 mb-2">Next Steps</h3>
              <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
                <li>Consult your primary care physician to discuss these results</li>
                <li>Consider preventive measures based on your risk profile</li>
                <li>Maintain regular health check-ups and monitoring</li>
                <li>Follow the guidance provided for each disease risk category</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-2">Important Disclaimer</h3>
              <p className="text-gray-700 text-sm">
                This tool is for educational purposes only and is not a substitute for professional
                medical diagnosis or treatment. Always consult a healthcare professional for medical
                advice, diagnosis, or treatment.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
          <button
            onClick={onNewAssessment}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Start New Assessment
          </button>
          <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer">
            Download Report (Coming Soon)
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>Results generated on {new Date().toLocaleDateString()}</p>
          <p>Health-ON-ML © 2024 General Health Risk Prediction System</p>
        </div>
      </div>
    </div>
  );
};
