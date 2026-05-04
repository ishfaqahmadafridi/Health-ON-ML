/**
 * PatientForm Component
 * Collects patient health data for prediction
 */

import React, { useState } from 'react';
import { PatientInput, ValidationError } from '../types';
import { validatePatientInput, getFieldError } from '../utils/validation';

export interface PatientFormProps {
  onSubmit: (data: PatientInput) => void;
  isLoading?: boolean;
}

const defaultData: PatientInput = {
  age: 45,
  gender: 'male',
  weight: 75,
  height: 175,
  bloodPressureSystolic: 120,
  bloodPressureDiastolic: 80,
  glucoseLevel: 100,
  cholesterol: 200,
  heartRate: 70,
  smokingStatus: 'never',
  physicalActivityLevel: 'moderate',
  familyHistoryHeartDisease: false,
  familyHistoryDiabetes: false,
  familyHistoryKidneyDisease: false,
  previousHeartCondition: false,
  previousDiabetes: false,
  previousKidneyDisease: false,
};

export const PatientForm: React.FC<PatientFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<PatientInput>(defaultData);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
            ? parseFloat(value) || 0
            : value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => new Set([...prev, name]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validatePatientInput(formData);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    onSubmit(formData);
  };

  const inputClass = (fieldName: string) =>
    `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      getFieldError(errors, fieldName) && touched.has(fieldName)
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-300'
    }`;

  const labelClass = 'block text-sm font-medium text-gray-700 mb-1';
  const sectionClass = 'mb-8';
  const sectionTitleClass = 'text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200';
  const gridTwoColClass = 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4';
  const gridThreeColClass = 'grid grid-cols-1 md:grid-cols-3 gap-4 mb-4';

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Risk Assessment</h1>
      <p className="text-gray-600 mb-8">
        Please provide accurate health information for accurate risk prediction.
      </p>

      {/* Personal Information */}
      <div className={sectionClass}>
        <h2 className={sectionTitleClass}>Personal Information</h2>

        <div className={gridThreeColClass}>
          <div>
            <label className={labelClass}>Age *</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('age')}
              disabled={isLoading}
              min="0"
              max="150"
            />
            {getFieldError(errors, 'age') && touched.has('age') && (
              <p className="text-red-500 text-xs mt-1">{getFieldError(errors, 'age')}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('gender')}
              disabled={isLoading}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {getFieldError(errors, 'gender') && touched.has('gender') && (
              <p className="text-red-500 text-xs mt-1">{getFieldError(errors, 'gender')}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Height (cm) *</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('height')}
              disabled={isLoading}
              min="50"
              max="250"
            />
            {getFieldError(errors, 'height') && touched.has('height') && (
              <p className="text-red-500 text-xs mt-1">{getFieldError(errors, 'height')}</p>
            )}
          </div>
        </div>

        <div className={gridTwoColClass}>
          <div>
            <label className={labelClass}>Weight (kg) *</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('weight')}
              disabled={isLoading}
              min="20"
              max="500"
            />
            {getFieldError(errors, 'weight') && touched.has('weight') && (
              <p className="text-red-500 text-xs mt-1">{getFieldError(errors, 'weight')}</p>
            )}
          </div>
        </div>
      </div>

      {/* Medical Measurements */}
      <div className={sectionClass}>
        <h2 className={sectionTitleClass}>Medical Measurements</h2>

        <div className={gridTwoColClass}>
          <div>
            <label className={labelClass}>Systolic BP (mmHg) *</label>
            <input
              type="number"
              name="bloodPressureSystolic"
              value={formData.bloodPressureSystolic}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('bloodPressureSystolic')}
              disabled={isLoading}
              min="50"
              max="250"
            />
            {getFieldError(errors, 'bloodPressureSystolic') &&
              touched.has('bloodPressureSystolic') && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError(errors, 'bloodPressureSystolic')}
                </p>
              )}
          </div>

          <div>
            <label className={labelClass}>Diastolic BP (mmHg) *</label>
            <input
              type="number"
              name="bloodPressureDiastolic"
              value={formData.bloodPressureDiastolic}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('bloodPressureDiastolic')}
              disabled={isLoading}
              min="30"
              max="150"
            />
            {getFieldError(errors, 'bloodPressureDiastolic') &&
              touched.has('bloodPressureDiastolic') && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError(errors, 'bloodPressureDiastolic')}
                </p>
              )}
          </div>
        </div>

        <div className={gridThreeColClass}>
          <div>
            <label className={labelClass}>Glucose (mg/dL) *</label>
            <input
              type="number"
              name="glucoseLevel"
              value={formData.glucoseLevel}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('glucoseLevel')}
              disabled={isLoading}
              min="50"
              max="600"
            />
            {getFieldError(errors, 'glucoseLevel') && touched.has('glucoseLevel') && (
              <p className="text-red-500 text-xs mt-1">{getFieldError(errors, 'glucoseLevel')}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Cholesterol (mg/dL) *</label>
            <input
              type="number"
              name="cholesterol"
              value={formData.cholesterol}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('cholesterol')}
              disabled={isLoading}
              min="100"
              max="400"
            />
            {getFieldError(errors, 'cholesterol') && touched.has('cholesterol') && (
              <p className="text-red-500 text-xs mt-1">{getFieldError(errors, 'cholesterol')}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Heart Rate (bpm) *</label>
            <input
              type="number"
              name="heartRate"
              value={formData.heartRate}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('heartRate')}
              disabled={isLoading}
              min="30"
              max="200"
            />
            {getFieldError(errors, 'heartRate') && touched.has('heartRate') && (
              <p className="text-red-500 text-xs mt-1">{getFieldError(errors, 'heartRate')}</p>
            )}
          </div>
        </div>
      </div>

      {/* Lifestyle */}
      <div className={sectionClass}>
        <h2 className={sectionTitleClass}>Lifestyle</h2>

        <div className={gridTwoColClass}>
          <div>
            <label className={labelClass}>Smoking Status *</label>
            <select
              name="smokingStatus"
              value={formData.smokingStatus}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('smokingStatus')}
              disabled={isLoading}
            >
              <option value="">Select smoking status</option>
              <option value="never">Never Smoked</option>
              <option value="former">Former Smoker</option>
              <option value="current">Current Smoker</option>
            </select>
            {getFieldError(errors, 'smokingStatus') && touched.has('smokingStatus') && (
              <p className="text-red-500 text-xs mt-1">{getFieldError(errors, 'smokingStatus')}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Physical Activity Level *</label>
            <select
              name="physicalActivityLevel"
              value={formData.physicalActivityLevel}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('physicalActivityLevel')}
              disabled={isLoading}
            >
              <option value="">Select activity level</option>
              <option value="sedentary">Sedentary</option>
              <option value="light">Light Activity</option>
              <option value="moderate">Moderate Activity</option>
              <option value="vigorous">Vigorous Activity</option>
            </select>
            {getFieldError(errors, 'physicalActivityLevel') &&
              touched.has('physicalActivityLevel') && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError(errors, 'physicalActivityLevel')}
                </p>
              )}
          </div>
        </div>
      </div>

      {/* Medical History */}
      <div className={sectionClass}>
        <h2 className={sectionTitleClass}>Medical History</h2>

        <div className="space-y-3 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="familyHistoryHeartDisease"
              checked={formData.familyHistoryHeartDisease}
              onChange={handleChange}
              disabled={isLoading}
              className="w-4 h-4 text-blue-500 rounded"
            />
            <span className="text-sm text-gray-700">Family history of heart disease</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="familyHistoryDiabetes"
              checked={formData.familyHistoryDiabetes}
              onChange={handleChange}
              disabled={isLoading}
              className="w-4 h-4 text-blue-500 rounded"
            />
            <span className="text-sm text-gray-700">Family history of diabetes</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="familyHistoryKidneyDisease"
              checked={formData.familyHistoryKidneyDisease}
              onChange={handleChange}
              disabled={isLoading}
              className="w-4 h-4 text-blue-500 rounded"
            />
            <span className="text-sm text-gray-700">Family history of kidney disease</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="previousHeartCondition"
              checked={formData.previousHeartCondition}
              onChange={handleChange}
              disabled={isLoading}
              className="w-4 h-4 text-blue-500 rounded"
            />
            <span className="text-sm text-gray-700">Previous heart condition</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="previousDiabetes"
              checked={formData.previousDiabetes}
              onChange={handleChange}
              disabled={isLoading}
              className="w-4 h-4 text-blue-500 rounded"
            />
            <span className="text-sm text-gray-700">Previously diagnosed with diabetes</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="previousKidneyDisease"
              checked={formData.previousKidneyDisease}
              onChange={handleChange}
              disabled={isLoading}
              className="w-4 h-4 text-blue-500 rounded"
            />
            <span className="text-sm text-gray-700">Previously diagnosed with kidney disease</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
      >
        {isLoading ? 'Analyzing Health Data...' : 'Get Risk Prediction'}
      </button>
    </form>
  );
};
