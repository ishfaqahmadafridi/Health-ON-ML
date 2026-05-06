/**
 * Health API Layer
 * All backend communication for predictions and health data
 */

import type { PatientInput, PredictionResponse, ApiError } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Submit patient data and get risk predictions
 */
export async function predictHealthRisks(
  patientData: PatientInput
): Promise<PredictionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as ApiError;
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    const data: PredictionResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get predictions: ${error.message}`);
    }
    throw new Error('Failed to get predictions: Unknown error');
  }
}

/**
 * Health check endpoint to verify backend is running
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get patient prediction history (optional)
 */
export async function getPredictionHistory(
  patientId: string
): Promise<PredictionResponse[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/history/${patientId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch history: ${response.status}`);
    }

    const data: PredictionResponse[] = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get history: ${error.message}`);
    }
    throw new Error('Failed to get history: Unknown error');
  }
}

/**
 * Save prediction to history
 */
export async function savePrediction(
  patientData: PatientInput,
  prediction: PredictionResponse
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patient: patientData, prediction }),
    });

    if (!response.ok) {
      throw new Error(`Failed to save prediction: ${response.status}`);
    }
  } catch (error) {
    console.warn('Could not save prediction to history:', error);
    // Non-critical error, don't throw
  }
}
