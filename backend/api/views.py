import json
from datetime import datetime, UTC
from typing import Any

from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt

from .ml import load_models, run_predictions


PREDICTION_HISTORY: list[dict[str, Any]] = []


def _json_response(data: dict[str, Any], status: int = 200) -> JsonResponse:
    response = JsonResponse(data, status=status, safe=not isinstance(data, list))
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Headers"] = "Content-Type"
    response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


def health(request):
    try:
        load_models()
        model_status = "loaded"
    except Exception as exc:
        model_status = f"error: {exc}"

    return _json_response(
        {
            "status": "ok",
            "message": "Backend healthy",
            "models": model_status,
        }
    )


@csrf_exempt
def predict(request):
    if request.method == "OPTIONS":
        return _json_response({})

    if request.method != 'POST':
        return HttpResponseBadRequest('POST required')

    try:
        payload = json.loads(request.body.decode('utf-8') or '{}')
    except Exception:
        return HttpResponseBadRequest('Invalid JSON')

    try:
        result = run_predictions(payload)
    except Exception as exc:
        return _json_response(
            {
                "message": "Prediction failed",
                "details": str(exc),
            },
            status=500,
        )

    return _json_response(result)


@csrf_exempt
def history(request, patient_id: str | None = None):
    if request.method == "OPTIONS":
        return _json_response({})

    if request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8") or "{}")
        except Exception:
            return HttpResponseBadRequest("Invalid JSON")

        patient = payload.get("patient", {})
        prediction = payload.get("prediction", {})
        record = {
            "id": len(PREDICTION_HISTORY) + 1,
            "patientId": patient.get("id") or patient.get("patientId") or "P-10234",
            "timestamp": datetime.now(UTC).isoformat(),
            "patient": patient,
            "results": prediction,
        }
        PREDICTION_HISTORY.append(record)
        return _json_response(record, status=201)

    if request.method == "GET":
        if patient_id is None:
            return _json_response({"history": PREDICTION_HISTORY})

        patient_history = [item for item in PREDICTION_HISTORY if item["patientId"] == patient_id]
        response = JsonResponse(patient_history, safe=False)
        response["Access-Control-Allow-Origin"] = "*"
        return response

    return HttpResponseBadRequest("Unsupported method")
