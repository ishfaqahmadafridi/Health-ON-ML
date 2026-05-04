# General Health Risk Prediction System Plan

## Project Goal
Build a unified healthcare risk prediction system that accepts one patient form and returns risk scores for multiple diseases, starting with heart disease, diabetes, and kidney disease.

## Backend Plan
### 1. API Structure
- Create a Django REST API inside the existing backend project.
- Expose a prediction endpoint that accepts patient data and returns disease risk scores.
- Add a health-check endpoint for basic service validation.
- Optionally add a history endpoint for saving past predictions.

### 2. Data Contract
- Define one shared patient input schema.
- Include age, gender, weight, height, blood pressure, glucose, cholesterol, heart rate, smoking status, physical activity, family history, and previous illness.
- Normalize the request format so the frontend and backend use the same field names.

### 3. ML Pipeline
- Build a shared preprocessing layer for cleaning, encoding, scaling, and missing-value handling.
- Train separate models for heart disease, diabetes, and kidney disease.
- Return probability-based outputs instead of only binary labels.
- Convert probabilities into risk scores from 0 to 100.

### 4. Risk Logic
- 0 to 30: Low risk
- 31 to 70: Medium risk
- 71 to 100: High risk
- Return both score and level for each disease.

### 5. Output Format
- Return a single JSON response with all disease predictions.
- Include risk score, risk level, and optional explanation text.

### 6. Senior-Level Features
- Add explainability for each prediction.
- Store prediction history for review.
- Generate downloadable PDF reports.
- Suggest doctor or care guidance based on risk level.

## Frontend Plan
### 1. Application Structure
- Replace the default Vite starter UI with a healthcare dashboard.
- Keep the interface simple, clean, and patient-friendly.

### 2. Main Screens
- Dashboard for overall health summary.
- Patient form for entering medical data.
- Results view for displaying disease risk cards.
- Optional history page for past reports.

### 3. Form Design
- Build one shared form for all disease inputs.
- Group inputs into personal details, medical measurements, and history.
- Validate required fields before submission.

### 4. Result Design
- Show one card each for heart disease, diabetes, and kidney disease.
- Display risk score, risk level, and short explanation.
- Use visual elements such as progress bars, badges, or charts.

### 5. API Integration
- Submit the form to the backend prediction endpoint.
- Show loading, success, and error states.
- Render backend JSON directly into the result cards.

### 6. Senior-Level Features
- Add charts for risk visualization.
- Add a history view for previous predictions.
- Add a report download action.
- Add explainable summaries for non-technical users.

## Execution Order
1. Define the request and response schema.
2. Build the backend API endpoints.
3. Build the preprocessing and prediction logic.
4. Replace the frontend starter page with the real UI.
5. Connect the frontend to the backend.
6. Add history, explanations, and report export.

## Final Deliverable
A full-stack general health risk prediction system with one patient form, multiple disease predictions, and a unified risk report.
