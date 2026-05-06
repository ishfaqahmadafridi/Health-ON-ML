from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from typing import Any

import joblib
import pandas as pd
import sklearn.compose._column_transformer as column_transformer
from sklearn.impute import SimpleImputer


BACKEND_ROOT = Path(__file__).resolve().parents[1]
MODEL_TRAIN_DIR = BACKEND_ROOT / "model_train"


def _patch_sklearn_pickle_compatibility() -> None:
    # Models were serialized with sklearn 1.6.x where this helper existed.
    if not hasattr(column_transformer, "_RemainderColsList"):
        class _RemainderColsList(list):
            pass

        column_transformer._RemainderColsList = _RemainderColsList


@dataclass(frozen=True)
class LoadedModels:
    heart: Any
    diabetes: Any
    kidney: Any


def _patch_loaded_estimator(estimator: Any) -> None:
    if isinstance(estimator, SimpleImputer) and not hasattr(estimator, "_fill_dtype"):
        estimator._fill_dtype = getattr(estimator, "_fit_dtype", None)

    if hasattr(estimator, "named_steps"):
        for step in estimator.named_steps.values():
            _patch_loaded_estimator(step)

    transformers = getattr(estimator, "transformers_", None)
    if transformers:
        for _, transformer, _ in transformers:
            if transformer not in ("drop", "passthrough"):
                _patch_loaded_estimator(transformer)


def _find_model_path(preferred_name: str, fallback_glob: str) -> Path:
    preferred = MODEL_TRAIN_DIR / preferred_name
    if preferred.exists():
        return preferred

    matches = sorted(MODEL_TRAIN_DIR.glob(fallback_glob))
    if not matches:
        raise FileNotFoundError(f"Could not find model file for {preferred_name}")
    return matches[0]


@lru_cache(maxsize=1)
def load_models() -> LoadedModels:
    _patch_sklearn_pickle_compatibility()

    heart_path = _find_model_path("heart_pipeline.pkl", "heart_pipeline*.pkl")
    diabetes_path = _find_model_path("diabetes_pipeline.pkl", "diabetes_pipeline*.pkl")
    kidney_path = _find_model_path("kidney_pipeline.pkl", "kidney_pipeline*.pkl")

    heart_model = joblib.load(heart_path)
    diabetes_model = joblib.load(diabetes_path)
    kidney_model = joblib.load(kidney_path)

    _patch_loaded_estimator(heart_model)
    _patch_loaded_estimator(diabetes_model)
    _patch_loaded_estimator(kidney_model)

    return LoadedModels(
        heart=heart_model,
        diabetes=diabetes_model,
        kidney=kidney_model,
    )


def _to_binary(value: bool) -> int:
    return 1 if value else 0


def _bmi(payload: dict[str, Any]) -> float:
    height_cm = float(payload.get("height", 0) or 0)
    weight_kg = float(payload.get("weight", 0) or 0)
    if height_cm <= 0:
        return 0.0
    height_m = height_cm / 100
    return weight_kg / (height_m * height_m)


def _map_heart_features(payload: dict[str, Any]) -> pd.DataFrame:
    return pd.DataFrame(
        [
            {
                "age": float(payload.get("age", 50) or 50),
                "sex": 1 if payload.get("gender") == "male" else 0,
                "cp": 2 if payload.get("previousHeartCondition") else 0,
                "trestbps": float(payload.get("bloodPressureSystolic", 120) or 120),
                "chol": float(payload.get("cholesterol", 200) or 200),
                "fbs": 1 if float(payload.get("glucoseLevel", 100) or 100) > 120 else 0,
                "restecg": 0,
                "thalach": float(payload.get("heartRate", 75) or 75),
                "exang": _to_binary(bool(payload.get("previousHeartCondition"))),
                "oldpeak": 1.0 if payload.get("smokingStatus") == "current" else 0.0,
                "slope": 1,
                "ca": 0,
                "thal": 2,
            }
        ]
    )


def _map_diabetes_features(payload: dict[str, Any]) -> pd.DataFrame:
    family_history = bool(payload.get("familyHistoryDiabetes"))
    return pd.DataFrame(
        [
            {
                "Pregnancies": 0,
                "Glucose": float(payload.get("glucoseLevel", 100) or 100),
                "BloodPressure": float(payload.get("bloodPressureDiastolic", 80) or 80),
                "SkinThickness": 20,
                "Insulin": 79,
                "BMI": _bmi(payload),
                "DiabetesPedigreeFunction": 0.65 if family_history else 0.2,
                "Age": float(payload.get("age", 50) or 50),
            }
        ]
    )


def _map_kidney_features(payload: dict[str, Any]) -> pd.DataFrame:
    glucose = float(payload.get("glucoseLevel", 100) or 100)
    systolic = float(payload.get("bloodPressureSystolic", 120) or 120)
    diastolic = float(payload.get("bloodPressureDiastolic", 80) or 80)
    cholesterol = float(payload.get("cholesterol", 200) or 200)
    age = float(payload.get("age", 50) or 50)
    diabetes_history = bool(payload.get("previousDiabetes") or payload.get("familyHistoryDiabetes"))
    heart_history = bool(payload.get("previousHeartCondition") or payload.get("familyHistoryHeartDisease"))
    smoking_status = payload.get("smokingStatus", "never")
    activity = payload.get("physicalActivityLevel", "moderate")
    bmi_value = _bmi(payload)

    return pd.DataFrame(
        [
            {
                "Age of the patient": age,
                "Blood pressure (mm/Hg)": systolic,
                "Specific gravity of urine": 1.02,
                "Albumin in urine": 1,
                "Sugar in urine": 1 if glucose > 140 else 0,
                "Red blood cells in urine": "normal",
                "Pus cells in urine": "normal",
                "Pus cell clumps in urine": "notpresent",
                "Bacteria in urine": "notpresent",
                "Random blood glucose level (mg/dl)": glucose,
                "Blood urea (mg/dl)": 36,
                "Serum creatinine (mg/dl)": 1.1,
                "Sodium level (mEq/L)": 138,
                "Potassium level (mEq/L)": 4.2,
                "Hemoglobin level (gms)": 14.0,
                "Packed cell volume (%)": 44,
                "White blood cell count (cells/cumm)": 7800,
                "Red blood cell count (millions/cumm)": 4.9,
                "Hypertension (yes/no)": "yes" if systolic >= 140 or diastolic >= 90 else "no",
                "Diabetes mellitus (yes/no)": "yes" if diabetes_history else "no",
                "Coronary artery disease (yes/no)": "yes" if heart_history else "no",
                "Appetite (good/poor)": "good",
                "Pedal edema (yes/no)": "no",
                "Anemia (yes/no)": "no",
                "Estimated Glomerular Filtration Rate (eGFR)": 92,
                "Urine protein-to-creatinine ratio": 0.18,
                "Urine output (ml/day)": 1600,
                "Serum albumin level": 4.2,
                "Cholesterol level": cholesterol,
                "Parathyroid hormone (PTH) level": 45,
                "Serum calcium level": 9.2,
                "Serum phosphate level": 3.6,
                "Family history of chronic kidney disease": "yes"
                if payload.get("familyHistoryKidneyDisease")
                else "no",
                "Smoking status": smoking_status,
                "Body Mass Index (BMI)": bmi_value,
                "Physical activity level": activity,
                "Duration of diabetes mellitus (years)": 6 if diabetes_history else 0,
                "Duration of hypertension (years)": 5 if systolic >= 140 or diastolic >= 90 else 0,
                "Cystatin C level": 0.9,
                "Urinary sediment microscopy results": "normal",
                "C-reactive protein (CRP) level": 3.0,
                "Interleukin-6 (IL-6) level": 4.0,
            }
        ]
    )


def probability_to_score(probability: float) -> int:
    return max(0, min(100, round(probability * 100)))


def score_to_level(score: int) -> str:
    if score <= 30:
        return "Low"
    if score <= 70:
        return "Medium"
    return "High"


def run_predictions(payload: dict[str, Any]) -> dict[str, Any]:
    models = load_models()

    heart_probability = float(models.heart.predict_proba(_map_heart_features(payload))[0][1])
    diabetes_probability = float(models.diabetes.predict_proba(_map_diabetes_features(payload))[0][1])
    kidney_probability = float(models.kidney.predict_proba(_map_kidney_features(payload))[0][1])

    heart_score = probability_to_score(heart_probability)
    diabetes_score = probability_to_score(diabetes_probability)
    kidney_score = probability_to_score(kidney_probability)

    return {
        "heartDisease": {
            "riskScore": heart_score,
            "level": score_to_level(heart_score),
            "probability": round(heart_probability, 4),
        },
        "diabetes": {
            "riskScore": diabetes_score,
            "level": score_to_level(diabetes_score),
            "probability": round(diabetes_probability, 4),
        },
        "kidneyDisease": {
            "riskScore": kidney_score,
            "level": score_to_level(kidney_score),
            "probability": round(kidney_probability, 4),
        },
    }
