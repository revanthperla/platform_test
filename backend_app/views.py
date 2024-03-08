from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import get_user_model

class UserDataViewSet(viewsets.ModelViewSet):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

class WorkExperienceViewSet(viewsets.ModelViewSet):
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer

class ClientRegistrationViewSet(viewsets.ModelViewSet):
    queryset = ClientRegistration.objects.all()
    serializer_class = ClientRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Check if the client registration is pending
            if 'pending_registration_id' in serializer.validated_data:
                pending_registration_id = serializer.validated_data.pop('pending_registration_id')
                try:
                    pending_registration = PendingClientRegistration.objects.get(id=pending_registration_id)
                except PendingClientRegistration.DoesNotExist:
                    return Response({'error': 'Pending registration not found.'}, status=status.HTTP_400_BAD_REQUEST)
                
                # Create a new ClientRegistration object with details from PendingClientRegistration
                client_registration_data = {
                    'entityName': pending_registration.client_registration.entityName,
                    'organizationStatus': pending_registration.client_registration.organizationStatus,
                    'estYear': pending_registration.client_registration.estYear,
                    # Add other fields as needed
                }
                client_registration_serializer = ClientRegistrationSerializer(data=client_registration_data)
                if client_registration_serializer.is_valid():
                    client_registration_serializer.save()
                    
                    # Update the pending registration to mark it as approved
                    pending_registration.approved = True
                    pending_registration.save()
                    
                    return Response(client_registration_serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(client_registration_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                # Save the client registration if it's not pending
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class JobDescriptionViewSet(viewsets.ModelViewSet):
    queryset = JobDescription.objects.all()
    serializer_class = JobDescriptionSerializer

class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

def index(request):
    return render(request, 'index.html')

def get_clients(request):
    clients = ClientRegistration.objects.all().values('id', 'entityName')  # Serialize relevant fields
    return JsonResponse({'clients': list(clients)})

def get_recruiters(request):
    recruiters = UserData.objects.filter(role__role='Recruiter').values('id', 'fullName')  # Assuming 'Recruiter' is the role name
    return JsonResponse({'recruiters': list(recruiters)})

def get_accoutmanagers(request):
    accountManagers = UserData.objects.filter(role__role='Account Manager').values('id', 'fullName')  # Assuming 'Account Manager' is the role name
    return JsonResponse({'Account Managers': list(accountManagers)})

def get_bdp(request):
    bdp = UserData.objects.filter(role__role='Business Development Partner').values('id', 'fullName')  # Assuming 'Recruiter' is the role name
    return JsonResponse({'recruiters': list(bdp)})

def get_bdpm(request):
    bdpm = UserData.objects.filter(role__role='Business Development Partner').values('id', 'fullName')  # Assuming 'Recruiter' is the role name
    return JsonResponse({'recruiters': list(bdpm)})

@csrf_exempt  # Use this decorator to bypass CSRF protection for this view (only for demonstration, ensure to handle CSRF properly in production)
@require_POST  # Ensure that this view only accepts POST requests
def submit_assessment(request, job_id):
    # Parse the JSON data from the request body
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    # Validate the required fields
    required_fields = ['candidateName', 'position', 'location', 'currentEmployer', 'totalExperience', 'ctc', 'ectc', 'noticePeriod', 'relocate', 'comments', 'remarks']
    for field in required_fields:
        if field not in data:
            return JsonResponse({'error': f'Missing required field: {field}'}, status=400)

    # Create a new Assessment instance and save it to the database
    try:
        assessment = Assessment.objects.create(
            candidateName=data['candidateName'],
            position=data['position'],
            location=data['location'],
            currentEmployer=data['currentEmployer'],
            totalExperience=data['totalExperience'],
            ctc=data['ctc'],
            ectc=data['ectc'],
            noticePeriod=data['noticePeriod'],
            relocate=data['relocate'],
            comments=data['comments'],
            remarks=data['remarks']
        )
        assessment.save()
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

    # Return a success response
    return JsonResponse({'success': True})

def get_job_descriptions(request):
    if request.method == 'GET':
        logged_in_user = request.user
        job_descriptions = JobDescription.objects.filter(assigned_to=logged_in_user)
        data = [{'id': job.id, 'titleDesignation': job.titleDesignation} for job in job_descriptions]
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

def get_assessments_for_job(request, job_id):
    if request.method == 'GET':
        try:
            assessments = Assessment.objects.filter(job_description=job_id)
            data = [{'id': assessment.id, 'candidateName': assessment.candidateName} for assessment in assessments]
            return JsonResponse(data, safe=False)
        except JobDescription.DoesNotExist:
            return JsonResponse({'error': 'Job not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
def get_assessment_details(request, assessment_id):
    if request.method == 'GET':
        try:
            assessment = Assessment.objects.get(id=assessment_id)
            data = {
                'id': assessment.id,
                'candidateName': assessment.candidateName,
                'position': assessment.position,
                'location': assessment.location,
                'currentEmployer': assessment.currentEmployer,
                'totalExperience': assessment.totalExperience,
                'ctc': assessment.ctc,
                'ectc': assessment.ectc,
                'noticePeriod': assessment.noticePeriod,
                'relocate': assessment.relocate,
                'comments': assessment.comments,
                'remarks': assessment.remarks
                # Add more fields as needed
            }
            return JsonResponse(data)
        except Assessment.DoesNotExist:
            return JsonResponse({'error': 'Assessment not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
def get_interviews(request, assessment_id):
    if request.method == 'GET':
        try:
            interview = Appointment.objects.filter(assessment=assessment_id)
            data = [{'id': assessment.id, 'candidateName': assessment.candidateName} for assessment in assessments]
            return JsonResponse(data, safe=False)
        except JobDescription.DoesNotExist:
            return JsonResponse({'error': 'Job not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
def get_user_details(request):
    User = get_user_model()
    user = request.user
    try:
        user_data = User.objects.get(pk=user.pk)
        education_data = Education.objects.filter(user=user_data)
        work_experience_data = WorkExperience.objects.filter(user=user_data)
        
        education_list = []
        for education in education_data:
            education_list.append({
                'degree': education.degree,
                'graduationYear': education.graduationYear,
                'grade': education.grade
            })
        
        work_experience_list = []
        for work_experience in work_experience_data:
            work_experience_list.append({
                'companyName': work_experience.companyName,
                'designation': work_experience.designation,
                'duration': work_experience.duration
            })
        
        data = {
            'fullName': user_data.fullName,
            'gender': user_data.gender,
            'aadhaarNumber': user_data.aadhaarNumber,
            'dateOfBirth': user_data.dateOfBirth,
            'maritalStatus': user_data.maritalStatus,
            'emergencyContact': user_data.emergencyContact,
            'address': user_data.address,
            'phoneNumber': user_data.phoneNumber,
            'emailID': user_data.emailID,
            'emergencyContactNumber': user_data.emergencyContactNumber,
            'jobTitle': user_data.jobTitle,
            'departmentName': user_data.departmentName,
            'joiningDate': user_data.joiningDate,
            'employmentType': user_data.employmentType,
            'prevCompany': user_data.prevCompany,
            'prevDesignation': user_data.prevDesignation,
            'relevantSkills': user_data.relevantSkills,
        }
        return JsonResponse(data)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User data not found'}, status=404)