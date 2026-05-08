/**
 * Health API Layer
 * All backend communication for predictions and health data
 */

import apiClient from './client';
import type { PatientInput, PredictionResponse, HistoryEntry } from '../types';

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
export async function getPredictionHistory(): Promise<HistoryEntry[]> {
  const response = await apiClient.get<{history: HistoryEntry[]}>('/history');
  return response.data.history;
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

/**
 * Get dynamic doctor statistics
 */
export async function getDoctorStats(): Promise<{ assessments: string, highRisk: string, successRate: string }> {
  try {
    const response = await apiClient.get('/doctor-stats');
    return response.data;
  } catch (error) {
    console.warn('Could not fetch doctor stats:', error);
    return { assessments: '0', highRisk: '0', successRate: '0%' };
  }
}

/**
 * Get all doctor profiles from DB
 */
export async function getDoctorsFromDB(): Promise<any[]> {
  try {
    const response = await apiClient.get('/doctor');
    return response.data.doctors || [];
  } catch (error) {
    console.warn('Could not fetch doctors from DB:', error);
    return [];
  }
}

/**
 * Save doctor profile to DB
 */
export async function saveDoctorToDB(doctorData: any): Promise<void> {
  try {
    await apiClient.post('/doctor', doctorData);
  } catch (error) {
    console.warn('Could not save doctor to DB:', error);
  }
}
