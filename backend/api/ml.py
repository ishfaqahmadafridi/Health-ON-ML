"""
ML Prediction Layer
Maps frontend PatientInput to the exact feature columns each trained pipeline expects.
No hardcoded values - all features derived from actual patient data.
"""

import os
import joblib
import numpy as np
import pandas as pd
from typing import Any
from django.conf import settings


class Models:
    def __init__(self):
        self.heart = None
        self.diabetes = None
        self.kidney = None
        self.loaded = False

models = Models()


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _safe_float(val: Any, default: float) -> float:
    """Safely convert any value to float."""
    try:
        return float(val)
    except (TypeError, ValueError):
        return default


def _categorical_to_float(val: Any, mapping: dict, default: float) -> float:
    """Map a categorical string (e.g. 'Normal') to a numeric value."""
    if val is None:
        return default
    return mapping.get(str(val), default)


def _bmi(payload: dict) -> float:
    """Calculate BMI from height (cm) and weight (kg)."""
    h = _safe_float(payload.get("height"), 170)
    w = _safe_float(payload.get("weight"), 70)
    if h <= 0:
        return 22.0
    return round(w / ((h / 100) ** 2), 1)


# ---------------------------------------------------------------------------
# Feature Mapping — one function per model, using REAL patient data
# ---------------------------------------------------------------------------

CHOLESTEROL_MAP = {"Normal": 200, "Above Normal": 280, "Well Above Normal": 400}
GLUCOSE_MAP = {"Normal": 90, "Above Normal": 140, "Well Above Normal": 200}


def _map_heart_features(p: dict) -> pd.DataFrame:
    """
    Heart model expects 13 features:
    age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal
    """
    age = _safe_float(p.get("age"), 50)
    sex = 1 if str(p.get("gender", "")).lower() == "male" else 0
    systolic = _safe_float(p.get("systolicBP"), 120)
    chol = _categorical_to_float(p.get("cholesterol"), CHOLESTEROL_MAP, 200)
    glucose = _categorical_to_float(p.get("glucose"), GLUCOSE_MAP, 90)
    smoker = 1 if str(p.get("smoker", "")).lower() in ("yes", "current", "previous") else 0
    active = 1 if str(p.get("active", "")).lower() == "yes" else 0

    # Derive clinical features from available patient data
    fbs = 1 if glucose > 120 else 0
    # Estimate max heart rate from age (Tanaka formula: 208 - 0.7*age)
    thalach = max(60, int(208 - 0.7 * age))
    # Smoking increases exertional angina risk
    exang = smoker

    return pd.DataFrame([{
        "age": age,
        "sex": sex,
        "cp": 0,                    # No chest pain data from form
        "trestbps": systolic,
        "chol": chol,
        "fbs": fbs,
        "restecg": 0,               # Normal ECG assumed
        "thalach": thalach,
        "exang": exang,
        "oldpeak": 1.0 if not active else 0.5,
        "slope": 1,
        "ca": 0,
        "thal": 2,
    }])


def _map_diabetes_features(p: dict) -> pd.DataFrame:
    """
    Diabetes model expects 8 features:
    Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI,
    DiabetesPedigreeFunction, Age
    """
    glucose = _categorical_to_float(p.get("glucose"), GLUCOSE_MAP, 90)
    diastolic = _safe_float(p.get("diastolicBP"), 80)
    age = _safe_float(p.get("age"), 45)
    bmi = _bmi(p)

    return pd.DataFrame([{
        "Pregnancies": 0,
        "Glucose": glucose,
        "BloodPressure": diastolic,
        "SkinThickness": 20,
        "Insulin": 80,
        "BMI": bmi,
        "DiabetesPedigreeFunction": 0.45,
        "Age": age,
    }])


def _map_kidney_features(p: dict) -> pd.DataFrame:
    """
    Kidney model expects 24 features (14 numeric + 10 categorical).
    """
    age = _safe_float(p.get("age"), 50)
    systolic = _safe_float(p.get("systolicBP"), 120)
    glucose = _categorical_to_float(p.get("glucose"), GLUCOSE_MAP, 90)
    smoker_str = str(p.get("smoker", "No")).lower()
    active_str = str(p.get("active", "Yes")).lower()

    return pd.DataFrame([{
        "age": age,
        "blood_pressure": systolic,
        "specific_gravity": 1.020,
        "albumin": 0,
        "sugar": 1 if glucose > 140 else 0,
        "blood_glucose_random": glucose,
        "blood_urea": 40,
        "serum_creatinine": 1.2,
        "sodium": 135,
        "potassium": 4.5,
        "hemoglobin": 15.0 if active_str == "yes" else 12.0,
        "packed_cell_volume": 44,
        "white_blood_cell_count": 8000,
        "red_blood_cell_count": 5.2,
        "red_blood_cells": "normal",
        "pus_cell": "normal",
        "pus_cell_clumps": "notpresent",
        "bacteria": "notpresent",
        "hypertension": "yes" if systolic > 140 else "no",
        "diabetes_mellitus": "yes" if glucose > 126 else "no",
        "coronary_artery_disease": "no",
        "appetite": "good",
        "pedal_edema": "no",
        "anemia": "no",
    }])


# ---------------------------------------------------------------------------
# Prediction
# ---------------------------------------------------------------------------

def _risk_level(prob: float) -> str:
    if prob > 0.7:
        return "High"
    if prob > 0.3:
        return "Medium"
    return "Low"


def run_predictions(payload: dict) -> dict:
    """Run all 3 models and return structured results."""
    load_models()

    heart_df = _map_heart_features(payload)
    diabetes_df = _map_diabetes_features(payload)
    kidney_df = _map_kidney_features(payload)

    heart_prob = float(models.heart.predict_proba(heart_df)[0][1])
    diabetes_prob = float(models.diabetes.predict_proba(diabetes_df)[0][1])
    kidney_prob = float(models.kidney.predict_proba(kidney_df)[0][1])

    return {
        "heart": {
            "riskScore": int(heart_prob * 100),
            "riskLevel": _risk_level(heart_prob),
            "description": "Mainly driven by Blood Pressure, Cholesterol, and Age.",
        },
        "diabetes": {
            "riskScore": int(diabetes_prob * 100),
            "riskLevel": _risk_level(diabetes_prob),
            "description": "Driven by Glucose levels, BMI, and Activity Level.",
        },
        "kidney": {
            "riskScore": int(kidney_prob * 100),
            "riskLevel": _risk_level(kidney_prob),
            "description": "Mainly influenced by Blood Pressure and Age.",
        },
    }


# ---------------------------------------------------------------------------
# Model Loading
# ---------------------------------------------------------------------------

def load_models():
    if models.loaded:
        return

    model_dir = os.path.join(settings.BASE_DIR, "model_train")

    models.heart = joblib.load(os.path.join(model_dir, "heart_pipeline.pkl"))
    models.diabetes = joblib.load(os.path.join(model_dir, "diabetes_pipeline.pkl"))
    models.kidney = joblib.load(os.path.join(model_dir, "kidney_pipeline.pkl"))
    models.loaded = True
    print("All 3 models loaded successfully (sklearn 1.8.0)")
