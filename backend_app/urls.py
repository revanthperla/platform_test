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
    path('api/recruiters/', get_recruiters, name='get_recruiters'),
    path('api/clients/', get_clients, name='get_clients'),
    path('submit-assessment/', submit_assessment, name='submit_assessment'),
    path('api/amanager/', get_accoutmanagers, name='get_accountmanagers'),
    path('api/job-descriptions/', get_job_descriptions, name='get_job_descriptions'),
    path('api/job-descriptions/<int:job_id>/assessments/', get_assessments_for_job, name='get_assessments_for_job'),
    path('clientregistration/', ClientRegistrationViewSet.as_view({'post': 'create'}), name='clientregistration'),
]
