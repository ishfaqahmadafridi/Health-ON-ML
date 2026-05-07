/**
 * Health API Layer
 * All backend communication for predictions and health data
 */

import apiClient from './client';
import type { PatientInput, PredictionResponse } from '../types';

/**
 * Submit patient data and get risk predictions
 */
export async function predictHealthRisks(
  patientData: PatientInput
): Promise<PredictionResponse> {
  const response = await apiClient.post<PredictionResponse>('/predict', patientData);
  return response.data;
}

/**
 * Health check endpoint to verify backend is running
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await apiClient.get('/health');
    return response.status === 200;
  } catch {
    return false;
  }
}

/**
 * Get patient prediction history
 */
export async function getPredictionHistory(
  patientId: string
): Promise<PredictionResponse[]> {
  const response = await apiClient.get<PredictionResponse[]>(`/history/${patientId}`);
  return response.data;
}

/**
 * Save prediction to history
 */
export async function savePrediction(
  patientData: PatientInput,
  prediction: PredictionResponse
): Promise<void> {
  try {
    await apiClient.post('/history', { patient: patientData, prediction });
  } catch (error) {
    console.warn('Could not save prediction to history:', error);
  }
}
