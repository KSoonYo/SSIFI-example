from django.urls import path
from . import views

app_name = 'channel'
urlpatterns = [
    path('stt/', views.stt),
    path('tts/', views.tts),
]