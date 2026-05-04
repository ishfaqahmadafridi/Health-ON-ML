/**
 * Types for Health-ON-ML Frontend
 * Complete type definitions for patient data, API responses, and UI state
 */

/**
 * Patient input data from the form
 */
export interface PatientInput {
  // Personal Information
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number; // kg
  height: number; // cm

  // Medical Measurements
  bloodPressureSystolic: number; // mmHg
  bloodPressureDiastolic: number; // mmHg
  glucoseLevel: number; // mg/dL
  cholesterol: number; // mg/dL
  heartRate: number; // bpm

  // Lifestyle
  smokingStatus: 'never' | 'former' | 'current';
  physicalActivityLevel: 'sedentary' | 'light' | 'moderate' | 'vigorous';

  // Medical History
  familyHistoryHeartDisease: boolean;
  familyHistoryDiabetes: boolean;
  familyHistoryKidneyDisease: boolean;
  previousHeartCondition: boolean;
  previousDiabetes: boolean;
  previousKidneyDisease: boolean;
}

/**
 * Single disease risk prediction
 */
export interface DiseaseRisk {
  riskScore: number; // 0-100
  level: 'Low' | 'Medium' | 'High';
  probability?: number; // 0-1 raw model output
}

/**
 * Complete API response from backend prediction endpoint
 */
export interface PredictionResponse {
  heartDisease: DiseaseRisk;
  diabetes: DiseaseRisk;
  kidneyDisease: DiseaseRisk;
  timestamp?: string;
  patientId?: string;
}

/**
 * UI state for loading and error handling
 */
export interface PredictionState {
  data: PredictionResponse | null;
  loading: boolean;
  error: string | null;
  submitted: boolean;
}

/**
 * Calculation helper for BMI
 */
export interface BMIResult {
  bmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
}

/**
 * Blood pressure classification
 */
export interface BloodPressureClassification {
  systolic: number;
  diastolic: number;
  classification:
    | 'normal'
    | 'elevated'
    | 'high_stage_1'
    | 'high_stage_2'
    | 'hypertensive_crisis';
}

/**
 * Form validation result
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * API Error response
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
