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
    path('api/submit_assessment/', AssessmentViewSet.as_view({'post': 'create'}), name='submit_assessment'),
    path('api/amanager/', get_accoutmanagers, name='get_accountmanagers'),
    path('api/bdp/', get_bdp, name='get_bdp'),
    path('api/bdpm/', get_bdpm, name='get_bdpm'),
    path('api/clientlist/', ClientRegistrationViewSet.as_view({'get': 'list'}), name='clientlist'),
    path('api/joblist/', JobDescriptionViewSet.as_view({'get': 'list'}), name='clientlist'),
    path('api/assessments/', AssessmentViewSet.as_view({'get': 'list'}), name='get_assessments'),
    path('api/assessments/<int:pk>/', get_assessment_for_job, name='get_assessments_for_job'), 
    path('clientregistration/', ClientRegistrationViewSet.as_view({'post': 'create'}), name='clientregistration'),
    path('api/update_assessment_status/<int:pk>/', update_assessment_status, name='update_assessment_status'),
    path('api/assessment_rejection/<int:pk>/', assessment_rejection, name='assessment_rejection'),
    path('api/update_assessment/<int:pk>/', update_assessment, name='update_assessment'),
    path('api/report/', generate_report, name='generate_report'),
    path('api/get_user_details/', get_user_details, name='get_user_details'),
    path('submit_user_data/', UserDataViewSet.as_view({'post': 'create'}), name='submit_user_data'),
    path('api/submit_appointment/', AppointmentViewSet.as_view({'post': 'create'}), name='submit_appointment'),
    
    path('upload_file/', upload_file, name='upload_file'),
    path('userlist/', user_data_list, name='user_data_list'),
    path('userlist/<int:user_id>/', update_user_role, name='update_user_role'),
    path('api/submit_job_description/', JobDescriptionViewSet.as_view({'post': 'create'}), name='submit_job_description'),
    path('user-details/<int:user_id>/', get_user_details, name='user_details'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='user-login'),
    path('latest-object/', get_latest_user, name='latest_object_detail'),
]
