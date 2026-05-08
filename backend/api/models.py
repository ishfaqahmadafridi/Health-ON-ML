"""
Django models for persisting patient data and prediction results.
"""
import json
from django.db import models


class PredictionRecord(models.Model):
    """Stores each prediction request + result in the database."""

    # Patient info
    patient_name = models.CharField(max_length=200, blank=True, default="")
    patient_age = models.IntegerField(null=True, blank=True)
    patient_gender = models.CharField(max_length=20, blank=True, default="")

    # Raw input (full JSON from frontend)
    patient_input = models.JSONField(default=dict)

    # Prediction results (full JSON from ML pipeline)
    prediction_result = models.JSONField(default=dict)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        name = self.patient_name or "Unknown"
        return f"Prediction #{self.pk} - {name} ({self.created_at:%Y-%m-%d %H:%M})"

    def to_dict(self):
        return {
            "id": self.pk,
            "patientName": self.patient_name,
            "patientAge": self.patient_age,
            "patientGender": self.patient_gender,
            "patientInput": self.patient_input,
            "predictionResult": self.prediction_result,
            "createdAt": self.created_at.isoformat() if self.created_at else None,
        }

class DoctorProfile(models.Model):
    """Stores doctor/practitioner profiles."""
    doc_id = models.CharField(max_length=100, unique=True, help_text="Frontend generated ID e.g., doc-12345")
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True, default="")
    role = models.CharField(max_length=100, blank=True, default="Physician")
    specialty = models.CharField(max_length=100, blank=True, default="General Medicine")
    image = models.TextField(blank=True, null=True, help_text="Base64 encoded image string")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.specialty})"

    def to_dict(self):
        return {
            "id": self.doc_id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
            "specialty": self.specialty,
            "image": self.image,
        }
