export interface PatientInput {
  age: number;
  gender: string;
  weight: number;
  height: number;
  systolicBP: number;
  diastolicBP: number;
  cholesterol: string;
  glucose: string;
  smoker: string;
  alcohol: string;
  active: string;
  // Metadata
  name?: string;
  fatherName?: string;
  contactNumber?: string;
  heartRate?: number;
}

export interface ValidationError {
  field: string;
  message: string;
}
