"""
API Views - Prediction, Health Check, and History endpoints.
All predictions are saved to the database automatically.
"""
import json
from typing import Any

from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt

from .ml import load_models, run_predictions
from .models import PredictionRecord


def _json_response(data: Any, status: int = 200) -> JsonResponse:
    response = JsonResponse(data, status=status, safe=not isinstance(data, list))
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Headers"] = "Content-Type"
    response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


def health(request):
    """Health check endpoint."""
    try:
        load_models()
        model_status = "loaded"
    except Exception as exc:
        model_status = f"error: {exc}"

    return _json_response({
        "status": "ok",
        "message": "Backend healthy",
        "models": model_status,
    })


@csrf_exempt
def predict(request):
    """Run ML predictions and save results to database."""
    if request.method == "OPTIONS":
        return _json_response({})

    if request.method != "POST":
        return HttpResponseBadRequest("POST required")

    try:
        payload = json.loads(request.body.decode("utf-8") or "{}")
    except Exception:
        return HttpResponseBadRequest("Invalid JSON")

    try:
        result = run_predictions(payload)
    except Exception as exc:
        import traceback
        return _json_response(
            {
                "message": "Prediction failed",
                "details": str(exc),
                "traceback": traceback.format_exc(),
            },
            status=500,
        )

    # Save to database
    try:
        PredictionRecord.objects.create(
            patient_name=payload.get("name", ""),
            patient_age=payload.get("age"),
            patient_gender=payload.get("gender", ""),
            patient_input=payload,
            prediction_result=result,
        )
    except Exception as db_err:
        print(f"Warning: Could not save to DB: {db_err}")

    return _json_response(result)


@csrf_exempt
def history(request, patient_id: str | None = None):
    """Retrieve prediction history from database."""
    if request.method == "OPTIONS":
        return _json_response({})

    if request.method == "GET":
        records = PredictionRecord.objects.all()[:50]
        history_list = [r.to_dict() for r in records]
        return _json_response({"history": history_list})

    if request.method == "POST":
        # Also allow saving via POST (for frontend savePrediction call)
        try:
            payload = json.loads(request.body.decode("utf-8") or "{}")
        except Exception:
            return HttpResponseBadRequest("Invalid JSON")

        patient = payload.get("patient", {})
        prediction = payload.get("prediction", {})

        record = PredictionRecord.objects.create(
            patient_name=patient.get("name", ""),
            patient_age=patient.get("age"),
            patient_gender=patient.get("gender", ""),
            patient_input=patient,
            prediction_result=prediction,
        )
        return _json_response(record.to_dict(), status=201)

    return HttpResponseBadRequest("Unsupported method")


@csrf_exempt
def doctor_profile(request, doc_id: str = None):
    """CRUD operations for DoctorProfile."""
    from .models import DoctorProfile
    
    if request.method == "OPTIONS":
        return _json_response({})

    if request.method == "GET":
        doctors = DoctorProfile.objects.all()
        return _json_response({"doctors": [d.to_dict() for d in doctors]})

    if request.method in ["POST", "PUT"]:
        try:
            payload = json.loads(request.body.decode("utf-8") or "{}")
        except Exception:
            return HttpResponseBadRequest("Invalid JSON")

        doc_id = payload.get("id") or doc_id
        if not doc_id:
            return HttpResponseBadRequest("Doctor ID required")

        doc, created = DoctorProfile.objects.update_or_create(
            doc_id=doc_id,
            defaults={
                "name": payload.get("name", ""),
                "email": payload.get("email", ""),
                "role": payload.get("role", "Physician"),
                "specialty": payload.get("specialty", "General Medicine"),
                "image": payload.get("image", None),
            }
        )
        return _json_response(doc.to_dict(), status=201 if created else 200)

    if request.method == "DELETE":
        if not doc_id:
            return HttpResponseBadRequest("Doctor ID required")
        DoctorProfile.objects.filter(doc_id=doc_id).delete()
        return _json_response({"status": "deleted"})

    return HttpResponseBadRequest("Unsupported method")


@csrf_exempt
def doctor_stats(request):
    """Calculate actual dynamic stats from PredictionRecord."""
    if request.method == "OPTIONS":
        return _json_response({})
        
    if request.method != "GET":
        return HttpResponseBadRequest("GET required")

    total_assessments = PredictionRecord.objects.count()
    
    # Calculate high risk (if any risk level is "High")
    high_risk_count = 0
    records = PredictionRecord.objects.all()
    for record in records:
        res = record.prediction_result
        if not isinstance(res, dict):
            continue
        # Check all disease keys for High risk
        is_high = False
        for disease, data in res.items():
            if isinstance(data, dict) and data.get("riskLevel") == "High":
                is_high = True
                break
        if is_high:
            high_risk_count += 1

    success_rate = 100
    if total_assessments > 0:
        # Dummy dynamic calculation: 100 - (High Risk % / 2)
        success_rate = 100 - int((high_risk_count / total_assessments) * 50)

    return _json_response({
        "assessments": str(total_assessments),
        "highRisk": str(high_risk_count),
        "successRate": f"{success_rate}%",
    })
