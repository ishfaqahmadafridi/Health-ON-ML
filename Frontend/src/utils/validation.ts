/**
 * Form Validation Utilities
 */

import type { PatientInput, ValidationError } from '../types';

/**
 * Validate patient input form data
 */
export function validatePatientInput(data: Partial<PatientInput>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Age validation
  if (!data.age || data.age < 0 || data.age > 150) {
    errors.push({ field: 'age', message: 'Please enter a valid age (0-150)' });
  }

  // Gender validation
  if (!data.gender || !['male', 'female', 'other'].includes(data.gender)) {
    errors.push({ field: 'gender', message: 'Please select a gender' });
  }

  // Weight validation
  if (!data.weight || data.weight < 20 || data.weight > 500) {
    errors.push({
      field: 'weight',
      message: 'Please enter a valid weight (20-500 kg)',
    });
  }

  // Height validation
  if (!data.height || data.height < 50 || data.height > 250) {
    errors.push({
      field: 'height',
      message: 'Please enter a valid height (50-250 cm)',
    });
  }

  // Blood pressure
  if (
    !data.bloodPressureSystolic ||
    data.bloodPressureSystolic < 50 ||
    data.bloodPressureSystolic > 250
  ) {
    errors.push({
      field: 'bloodPressureSystolic',
      message: 'Please enter valid systolic BP (50-250 mmHg)',
    });
  }

  if (
    !data.bloodPressureDiastolic ||
    data.bloodPressureDiastolic < 30 ||
    data.bloodPressureDiastolic > 150
  ) {
    errors.push({
      field: 'bloodPressureDiastolic',
      message: 'Please enter valid diastolic BP (30-150 mmHg)',
    });
  }

  // Glucose validation
  if (!data.glucoseLevel || data.glucoseLevel < 50 || data.glucoseLevel > 600) {
    errors.push({
      field: 'glucoseLevel',
      message: 'Please enter valid glucose level (50-600 mg/dL)',
    });
  }

  // Cholesterol validation
  if (!data.cholesterol || data.cholesterol < 100 || data.cholesterol > 400) {
    errors.push({
      field: 'cholesterol',
      message: 'Please enter valid cholesterol (100-400 mg/dL)',
    });
  }

  // Heart rate validation
  if (!data.heartRate || data.heartRate < 30 || data.heartRate > 200) {
    errors.push({
      field: 'heartRate',
      message: 'Please enter valid heart rate (30-200 bpm)',
    });
  }

  // Smoking status
  if (
    !data.smokingStatus ||
    !['never', 'former', 'current'].includes(data.smokingStatus)
  ) {
    errors.push({
      field: 'smokingStatus',
      message: 'Please select a smoking status',
    });
  }

  // Physical activity
  if (
    !data.physicalActivityLevel ||
    !['sedentary', 'light', 'moderate', 'vigorous'].includes(data.physicalActivityLevel)
  ) {
    errors.push({
      field: 'physicalActivityLevel',
      message: 'Please select an activity level',
    });
  }

  return errors;
}

/**
 * Check if a field has an error
 */
export function getFieldError(
  errors: ValidationError[],
  field: string
): string | null {
  const error = errors.find((e) => e.field === field);
  return error ? error.message : null;
}

/**
 * Check if form is valid
 */
export function isFormValid(errors: ValidationError[]): boolean {
  return errors.length === 0;
}
