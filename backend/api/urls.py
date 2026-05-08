from django.urls import path
from . import views

urlpatterns = [
    path('health', views.health, name='health'),
    path('predict', views.predict, name='predict'),
    path('history', views.history, name='history'),
    path('history/<str:patient_id>', views.history, name='history-by-patient'),
    path('doctor', views.doctor_profile, name='doctor-profile'),
    path('doctor/<str:doc_id>', views.doctor_profile, name='doctor-profile-by-id'),
    path('doctor-stats', views.doctor_stats, name='doctor-stats'),
]
