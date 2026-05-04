/**
 * Risk Calculation Utilities
 * Convert model scores to risk levels and calculate additional health metrics
 */

import { DiseaseRisk, BMIResult, BloodPressureClassification } from '../types';

/**
 * Convert risk score (0-100) to risk level
 */
export function getRiskLevel(score: number): 'Low' | 'Medium' | 'High' {
  if (score <= 30) return 'Low';
  if (score <= 70) return 'Medium';
  return 'High';
}

/**
 * Create a DiseaseRisk object from a probability (0-1)
 */
export function createDiseaseRisk(probability: number): DiseaseRisk {
  const riskScore = Math.round(probability * 100);
  return {
    riskScore,
    level: getRiskLevel(riskScore),
    probability,
  };
}

/**
 * Calculate BMI from height and weight
 */
export function calculateBMI(weightKg: number, heightCm: number): BMIResult {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category: 'underweight' | 'normal' | 'overweight' | 'obese';
  if (bmi < 18.5) category = 'underweight';
  else if (bmi < 25) category = 'normal';
  else if (bmi < 30) category = 'overweight';
  else category = 'obese';

  return { bmi: Math.round(bmi * 10) / 10, category };
}

/**
 * Classify blood pressure
 */
export function classifyBloodPressure(
  systolic: number,
  diastolic: number
): BloodPressureClassification {
  let classification:
    | 'normal'
    | 'elevated'
    | 'high_stage_1'
    | 'high_stage_2'
    | 'hypertensive_crisis';

  if (systolic < 120 && diastolic < 80) classification = 'normal';
  else if (systolic < 130 && diastolic < 80) classification = 'elevated';
  else if (systolic < 140 || diastolic < 90) classification = 'high_stage_1';
  else if (systolic < 180 || diastolic < 120) classification = 'high_stage_2';
  else classification = 'hypertensive_crisis';

  return { systolic, diastolic, classification };
}

/**
 * Get risk color for UI display
 */
export function getRiskColor(level: 'Low' | 'Medium' | 'High'): string {
  switch (level) {
    case 'Low':
      return '#50C878'; // Green
    case 'Medium':
      return '#FDB913'; // Yellow
    case 'High':
      return '#FF6B6B'; // Red
  }
}

/**
 * Get risk description text
 */
export function getRiskDescription(level: 'Low' | 'Medium' | 'High'): string {
  switch (level) {
    case 'Low':
      return 'Your risk is low. Continue maintaining healthy habits.';
    case 'Medium':
      return 'Your risk is moderate. Consider consulting a healthcare provider.';
    case 'High':
      return 'Your risk is high. Please consult a healthcare provider soon.';
  }
}

/**
 * Get guidance text based on disease and risk level
 */
export function getDiseaseGuidance(
  disease: 'heart' | 'diabetes' | 'kidney',
  level: 'Low' | 'Medium' | 'High'
): string {
  const baseGuidance = {
    heart: {
      Low: 'Keep up regular exercise and maintain a healthy diet.',
      Medium:
        'Reduce sodium intake, increase exercise, and monitor blood pressure regularly.',
      High: 'Seek immediate medical attention and follow doctor recommendations.',
    },
    diabetes: {
      Low: 'Maintain healthy weight and exercise regularly.',
      Medium:
        'Reduce sugar intake, monitor glucose levels, and exercise more.',
      High: 'Get tested for diabetes and consult an endocrinologist immediately.',
    },
    kidney: {
      Low: 'Drink plenty of water and maintain healthy blood pressure.',
      Medium:
        'Monitor blood pressure and kidney function, limit sodium intake.',
      High: 'Get kidney function tests and consult a nephrologist urgently.',
    },
  };

  return baseGuidance[disease][level];
}
