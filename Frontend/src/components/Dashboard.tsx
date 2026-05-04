import { useState } from 'react';
import type { PatientInput, PredictionResponse } from '../types';
import { PatientProfile } from './PatientProfile';
import { DiseaseGauge } from './DiseaseGauge';
import { KeyFactorsChart } from './KeyFactorsChart';
import { PatientForm } from './PatientForm';

interface DashboardProps {
  onFormSubmit: (data: PatientInput) => Promise<void>;
  patientData: PatientInput | null;
  results: PredictionResponse | null;
  isLoading: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onFormSubmit,
  patientData,
  results,
  isLoading,
}) => {
  const [showForm, setShowForm] = useState(!patientData);

  const handleFormSubmit = async (data: PatientInput) => {
    await onFormSubmit(data);
    setShowForm(false);
  };

  if (showForm && !patientData) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-form-wrapper">
          <PatientForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Left Panel - Patient Profile */}
        <div className="dashboard-left">
          <PatientProfile data={patientData} />
        </div>

        {/* Right Panel - Analysis Results */}
        <div className="dashboard-right">
          <div className="analysis-header">
            <h2>Multivariate Disease Risk Analysis</h2>
            <button className="btn-new-assessment" onClick={() => setShowForm(true)}>
              🔄 New Assessment
            </button>
          </div>

          {/* Disease Gauges */}
          <div className="gauges-container">
            {results && (
              <>
                <DiseaseGauge
                  disease="heart"
                  title="HEART DISEASE RISK"
                  riskScore={results.heartDisease.riskScore}
                  riskLevel={results.heartDisease.level}
                  description="Mainly driven by Blood Pressure, Cholesterol, and Age."
                />
                <DiseaseGauge
                  disease="diabetes"
                  title="DIABETES RISK"
                  riskScore={results.diabetes.riskScore}
                  riskLevel={results.diabetes.level}
                  description="Driven by Glucose levels, BMI, and Activity Level."
                />
                <DiseaseGauge
                  disease="kidney"
                  title="KIDNEY DISEASE RISK"
                  riskScore={results.kidneyDisease.riskScore}
                  riskLevel={results.kidneyDisease.level}
                  description="Mainly influenced by Blood Pressure and Age."
                />
              </>
            )}
          </div>

          {/* Explanation Section */}
          <div className="explanation-section">
            <h3>🔍 AI Explanation & Summary</h3>
            <p>
              AI Explanation & Summary need the visualize of disease risk input features and
              diabetes level to call more driven now conditions. Summarized may compared,
              which input features are levels are driving the specific risk.
            </p>
          </div>

          {/* Key Contributing Factors */}
          <div className="factors-container">
            <KeyFactorsChart
              disease="heart"
              factors={[
                { name: 'BP', value: 85 },
                { name: 'Cholesterol', value: 72 },
                { name: 'Age', value: 65 },
              ]}
            />
            <KeyFactorsChart
              disease="diabetes"
              factors={[
                { name: 'Glucose', value: 95 },
                { name: 'BMI', value: 78 },
                { name: 'Activity Level', value: 62 },
              ]}
            />
            <KeyFactorsChart
              disease="kidney"
              factors={[
                { name: 'BP', value: 88 },
                { name: 'Cholesterol', value: 72 },
                { name: 'Age', value: 75 },
              ]}
            />
          </div>

          {/* Action Buttons */}
          <div className="dashboard-actions">
            <button className="btn-primary">📥 Generate Full Report (PDF)</button>
            <button className="btn-secondary">💾 Save Assessment</button>
            <button className="btn-secondary" onClick={() => setShowForm(true)}>
              ➕ New Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
