# Health-ON-ML

Health-ON-ML is a full-stack General Health Risk Prediction System that accepts one patient profile and returns risk estimates for multiple diseases in a single response. The current scope covers heart disease, diabetes, and kidney disease, with an architecture designed to scale into a broader clinical decision-support platform.

## What This Project Does

Instead of building a single yes/no classifier, this repository is structured around a unified patient workflow:

1. A user enters one standardized health profile.
2. The backend preprocesses the data and routes it to multiple disease models.
3. Each model produces a probability-based risk score.
4. The system converts those probabilities into readable risk levels.
5. The frontend displays the result as a clean health summary.

This makes the project more realistic, easier to demo, and much closer to a production-style ML product.

## Why This Repo Exists

This project is meant to show:

- multi-model machine learning design
- backend API engineering
- frontend-to-backend integration
- healthcare-style risk reporting
- clean system architecture instead of a notebook-only prototype

## Core Features

- Predict multiple diseases from one patient form
- Return risk scores from 0 to 100
- Map scores into Low, Medium, and High categories
- Keep the frontend and backend aligned through one shared data contract
- Support future explainability, report generation, and prediction history

## System Design

### Frontend

- React + TypeScript
- Patient intake form
- Result cards for each disease
- Loading, success, and error states
- Optional chart-based risk visualization

### Backend

- Django API layer
- Request validation and response formatting
- ML inference orchestration
- Optional history storage for previous predictions

### ML Layer

- Separate models for heart, diabetes, and kidney risk
- Shared preprocessing and feature handling
- Probability outputs converted into score bands
- Optional explanation layer for model transparency

## Planned API Shape

### Prediction Response

```json
{
  "heart_disease": {
    "risk_score": 78,
    "level": "High"
  },
  "diabetes": {
    "risk_score": 45,
    "level": "Medium"
  },
  "kidney_disease": {
    "risk_score": 20,
    "level": "Low"
  }
}
```

### Risk Bands

- 0 to 30: Low risk
- 31 to 70: Medium risk
- 71 to 100: High risk

## Repository Layout

```text
ML/
├── backend/
│   ├── manage.py
│   └── backend/
│       ├── settings.py
│       ├── urls.py
│       ├── asgi.py
│       └── wsgi.py
├── Frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
├── PROJECT_PLAN.md
└── README.md
```

## Build Plan

### Backend Milestones

1. Add Django REST Framework and CORS support.
2. Create a dedicated API app for prediction.
3. Define the shared patient schema.
4. Add ML inference helpers and disease-specific predictors.
5. Return a unified JSON response for all risks.

### Frontend Milestones

1. Replace the starter Vite screen with a health dashboard.
2. Build the patient data entry form.
3. Render disease risk cards from the API response.
4. Add loading and error handling.
5. Add charts, history, and report actions later.

## Suggested Tech Stack

- Frontend: React, TypeScript, Vite
- Backend: Django, Django REST Framework
- ML: scikit-learn, pandas, numpy
- Visualization: Recharts or Chart.js
- Reporting: ReportLab or WeasyPrint

## How Development Should Flow

1. Start the backend API.
2. Start the frontend app.
3. Submit a patient profile.
4. Receive predicted disease risk results.
5. Optionally save or export the result.

## Roadmap

- Phase 1: Backend API skeleton
- Phase 2: ML data pipeline and model training
- Phase 3: Frontend dashboard and form flow
- Phase 4: Explainability and history tracking
- Phase 5: PDF report generation and polish

## Current Status

This repository is in the foundation stage. The structure is in place, and the next step is to convert the plan into a working backend API and frontend interface.
