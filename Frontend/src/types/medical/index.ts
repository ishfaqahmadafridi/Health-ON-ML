export interface BMIResult {
  bmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
}

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
