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
    path('api/get_user_details/', get_user_details, name='get_user_details'),
    path('submit_user_data/', UserDataViewSet.as_view({'post': 'create'}), name='submit_user_data'),
    path('upload_file/', upload_file, name='upload_file'),
    path('userlist/', user_data_list, name='user_data_list'),
    path('roles/', role_choices, name='roles_list'),
    path('userlist/<int:user_id>/', update_user_role, name='update_user_role'),
    path('api/submit_job_description/', submit_job_description, name='submit_job_description'),
    path('user-details/<int:user_id>/', get_user_details, name='user_details'),
    path('client-details/<int:client_id>/', get_client_details, name='client_details'),
    path('assessment-details/<int:assessment_id>/', get_assessment_details, name='assessment_details'),
    path('api/register/', LoginDetailsViewSet.as_view({'post': 'create'}), name='register'),
    path('api/login/', verify_login, name='user-login'),
]
