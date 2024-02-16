from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserDataViewSet, EducationViewSet, WorkExperienceViewSet

router = DefaultRouter()
router.register(r'userdata', UserDataViewSet)
router.register(r'education', EducationViewSet)
router.register(r'workexperience', WorkExperienceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
