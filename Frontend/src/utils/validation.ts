/**
 * Clinical Data Validation Utilities
 */
import type { PatientInput, ValidationError } from '../types';

/**
 * Validates the PatientInput data based on clinical thresholds and categorical requirements.
 */
export function validatePatientInput(data: Partial<PatientInput>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Age validation (Clinical range)
  if (data.age === undefined || data.age < 0 || data.age > 120) {
    errors.push({ field: 'age', message: 'Enter a valid age (0-120)' });
  }

  // Weight validation
  if (!data.weight || data.weight < 20 || data.weight > 400) {
    errors.push({ field: 'weight', message: 'Enter a valid weight (20-400 kg)' });
  }

  // Height validation
  if (!data.height || data.height < 50 || data.height > 250) {
    errors.push({ field: 'height', message: 'Enter a valid height (50-250 cm)' });
  }

  // Blood Pressure validation
  if (!data.systolicBP || data.systolicBP < 50 || data.systolicBP > 250) {
    errors.push({ field: 'systolicBP', message: 'Enter systolic BP (50-250)' });
  }
  if (!data.diastolicBP || data.diastolicBP < 30 || data.diastolicBP > 150) {
    errors.push({ field: 'diastolicBP', message: 'Enter diastolic BP (30-150)' });
  }

  // Categorical validations (Glucose, Cholesterol, etc.)
  const categoricalFields: (keyof PatientInput)[] = [
    'gender', 'cholesterol', 'glucose', 'smoker', 'alcohol', 'active'
  ];

  categoricalFields.forEach(field => {
    if (!data[field]) {
      errors.push({ field, message: `Please select ${field}` });
    }
  });

  return errors;
}

/**
 * Retrieves the error message for a specific field if it exists.
 */
export function getFieldError(errors: ValidationError[], field: string): string | null {
  const error = errors.find((e) => e.field === field);
  return error ? error.message : null;
}

/**
 * Helper to determine if the clinical form is ready for submission.
 */
export function isFormValid(errors: ValidationError[]): boolean {
  return errors.length === 0;
}
