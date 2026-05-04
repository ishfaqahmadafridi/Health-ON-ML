/**
 * RiskCard Component
 * Displays a single disease risk with score, level, and guidance
 */

import React from 'react';
import { DiseaseRisk } from '../types';
import { getRiskColor, getRiskDescription, getDiseaseGuidance } from '../utils/riskCalculator';

export interface RiskCardProps {
  disease: 'heart' | 'diabetes' | 'kidney';
  title: string;
  icon: React.ReactNode;
  risk: DiseaseRisk;
}

export const RiskCard: React.FC<RiskCardProps> = ({ disease, title, icon, risk }) => {
  const color = getRiskColor(risk.level);
  const description = getRiskDescription(risk.level);
  const guidance = getDiseaseGuidance(disease, risk.level);

  return (
    <div
      className="rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      {/* Header with icon and title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      </div>

      {/* Risk Score and Level */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold" style={{ color }}>
            {risk.riskScore}%
          </span>
          <span className="text-sm text-gray-600">risk score</span>
        </div>

        {/* Risk Level Badge */}
        <div className="inline-block">
          <span
            className="px-3 py-1 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: color }}
          >
            {risk.level} Risk
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4">{description}</p>

      {/* Guidance */}
      <div className="bg-gray-50 rounded p-3 mb-4">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
          Guidance
        </p>
        <p className="text-sm text-gray-700">{guidance}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{
            width: `${risk.riskScore}%`,
            backgroundColor: color,
          }}
        ></div>
      </div>
    </div>
  );
};
