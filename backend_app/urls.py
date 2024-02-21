from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'userdata', UserDataViewSet)
router.register(r'education', EducationViewSet)
router.register(r'workexperience', WorkExperienceViewSet)
router.register(r'clientregistration', ClientRegistrationViewSet)
router.register(r'jobdescription', JobDescriptionViewSet)
router.register(r'assessment', AssessmentViewSet)
router.register(r'appointment', AppointmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
