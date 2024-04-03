import pprint
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
import boto3
from botocore.exceptions import ClientError
import os
import logging
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
from django.core import serializers
from django.views.generic import View

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
    

class LoginDetailsViewSet(viewsets.ModelViewSet):
    queryset = LoginDetails.objects.all()
    serializer_class = LoginDetailsSerializer

    def retrieve(self, request, pk=None):
        queryset = LoginDetails.objects.filter(username=request.data['username'])
        login = get_object_or_404(queryset, username= username)
        serializer = LoginDetailsSerializer(user)
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginDetailsSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.validated_data)
            stored_login = LoginDetails.objects.get(username__iexact=serializer.validated_data['username'])
            if serializer.validated_data['password'] == stored_login.password:
                return JsonResponse({'message': 'Login successful'})
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@csrf_exempt
def compare_data(request):
    if request.method == 'POST':
        data = request.POST  # Access data from form submission
        # Extract relevant fields for comparison
        print(data)
        user_name = data.get('username')
        pass_word = data.get('password')
        print(user_name)
        print(pass_word)

        # Access your Django model to retrieve data from the database
        # (Replace 'MyModel' with your actual model name)
        try:
            db_data = LoginDetails.objects.get(username=user_name)
            print(db_data)  
        except LoginDetails.DoesNotExist:
            db_data = None

        # Perform comparison logic
        is_match = pass_word == db_data.password  # Modify this based on your comparison criteria

        # Return a JSON response indicating the comparison result
        return JsonResponse({'is_match': is_match})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

class JobDescriptionViewSet(viewsets.ModelViewSet):
    queryset = JobDescription.objects.all()
    serializer_class = JobDescriptionSerializer

class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class UserDataDetailView(DetailView):
    model = UserData

    def GET(self, queryset=None):
        return UserData.objects.latest('id')

    def render_to_response(self, context, **response_kwargs):
        latest_object = context['object']
        data = {'latest_object_id': latest_object.id}
        return JsonResponse(data)

def index(request):
    return render(request, 'index.html')

def get_clients(request):
    clients = ClientRegistration.objects.all().values('id', 'entityName')  # Serialize relevant fields
    return JsonResponse({'clients': list(clients)})

def get_recruiters(request):
    recruiters = UserData.objects.filter(role='Recruiter').values('id', 'fullName')  # Assuming 'Recruiter' is the role name
    return JsonResponse({'recruiters': list(recruiters)})

def get_accoutmanagers(request):
    accountManagers = UserData.objects.filter(role='Account Manager').values('id', 'fullName')  # Assuming 'Account Manager' is the role name
    return JsonResponse({'accountManagers': list(accountManagers)})

def get_bdp(request):
    bdp = UserData.objects.filter(role='Business Development Partner').values('id', 'fullName')  # Assuming 'Recruiter' is the role name
    return JsonResponse({'recruiters': list(bdp)})

def get_bdpm(request):
    bdpm = UserData.objects.filter(role='Business Development Partner').values('id', 'fullName')  # Assuming 'Recruiter' is the role name
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

def get_latest_user(request):
    if request.method == 'GET':
        latest_object_id = UserData.objects.latest('id').id
        user_data = UserData.objects.get(id=latest_object_id)
        serialized_data = serializers.serialize('json', [user_data])
        return JsonResponse({'user_data': latest_object_id})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

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
    
#def get_interviews(request, assessment_id):
 #   if request.method == 'GET':
  #      try:
   #         interviews = Appointment.objects.filter(assessment=assessment_id)
    #        data = [{'id': assessment.id, 'candidateName': assessment.candidateName} for assessment in assessments]
     #       return JsonResponse(data, safe=False)
      #  except JobDescription.DoesNotExist:
       #     return JsonResponse({'error': 'Job not found'}, status=404)
    #else:
     #   return JsonResponse({'error': 'Method not allowed'}, status=405)
    
def get_user_details(request, user_id):
    User = get_user_model()
    try:
        user_data = get_object_or_404(User, pk=user_id)
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

def upload_file(file_name, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = os.path.basename(file_name)

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_file(file_name, 'hrinputs', object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True

@csrf_exempt
def user_data_list(request):
    if request.method == 'GET':
        users = UserData.objects.all()
        data = [{'id': user.id, 'fullName': user.fullName, 'emailID': user.emailID, 'phoneNumber': user.phoneNumber, 'selectedRole': user.role_id} for user in users]
        return JsonResponse(data, safe=False)

@csrf_exempt
def role_choices(request):
    roles = [{'id': key, 'role': role} for key, role in Role.ROLE_CHOICES]
    return JsonResponse(roles, safe=False)
    
@csrf_exempt
def update_user_role(request, user_id):
    if request.method == 'PATCH':
        try:
            user = UserData.objects.get(id=user_id)
            role_id = int(request.POST.get('role'))
            user.role_id = role_id
            user.save()
            return JsonResponse({'success': True})
        except UserData.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'User not found'})
        
@csrf_exempt
def submit_job_description(request):
    if request.method == 'POST':
        data = request.POST

        # Create JobDescription object
        job_description = JobDescription.objects.create(
            titleDesignation=data.get('titleDesignation'),
            clientName=data.get('clientName'),
            accountManager=data.get('accountManager'),
            assignedRecruiters=data.get('assignedRecruiters'),
            startDate=data.get('startDate'),
            closureDate=data.get('closureDate'),
            jobType=data.get('jobType'),
            jobStatus=data.get('jobStatus'),
            workExperience=data.get('workExperience'),
            industryNature=data.get('industryNature'),
            compensation=data.get('compensation'),
            location=data.get('location'),
            eligibilityCriteria=data.get('eligibilityCriteria'),
            primaryResponsibilities=data.get('primaryResponsibilities'),
            mandatorySkills=data.get('mandatorySkills'),
            desirableSkills=data.get('desirableSkills'),
        )

        return JsonResponse({'id': job_description.pk})

    return JsonResponse({'error': 'Invalid request method'}, status=405)

def get_client_details(request, client_id):
    Client = ClientRegistration
    try:
        client_data = get_object_or_404(Client, pk=client_id, user = request.user)
        data = {
            'entityName': client_data.entityName,
            'organizationStatus': client_data.organizationStatus,
            'estYear': client_data.estYear,
            'proprieterName': client_data.proprieterName,
            'officeAddress': client_data.officeAddress,
            'branchAddress': client_data.branchAddress,
            'companyPerson': client_data.companyPerson,
            'companyDesignation': client_data.companyDesignation,
            'companyNumber': client_data.companyNumber,
            'companyFax': client_data.companyFax,
            'companyEmail': client_data.companyEmail,
            'industryNature': client_data.industryNature,
            'companyCIN': client_data.companyCIN,
            'companyPAN': client_data.companyPAN,
            'companyGST': client_data.companyGST,
            'bdpName': client_data.bdpName,
            'bdpmName': client_data.bdpmName,
            'accountManager': client_data.accountManager,
            'billingCity': client_data.billingCity,
            'billingCountry': client_data.billingCountry,
        }
        return JsonResponse(data)
    except Client.DoesNotExist:
        return JsonResponse({'error': 'Client data not found'}, status=404)
    
def get_assessment_details(request, assessment_id):
    Assess = Assessment
    try:
        assessment_data = get_object_or_404(Assess, pk=assessment_id)
        
        data = {
            'job_description': assessment_data.job_description.id if assessment_data.job_description else None,
            'candidateName': assessment_data.candidateName,
            'position': assessment_data.position,
            'location': assessment_data.location,
            'currentEmployer': assessment_data.currentEmployer,
            'totalExperience': assessment_data.totalExperience,
            'ctc': assessment_data.ctc,
            'ectc': assessment_data.ectc,
            'noticePeriod': assessment_data.noticePeriod,
            'relocate': assessment_data.relocate,
            'comments': assessment_data.comments,
            'remarks': assessment_data.remarks,
            'is_active': assessment_data.is_active,
            'done': assessment_data.done,
            'interview': assessment_data.interview,
        }
        return JsonResponse(data)
    except Assessment.DoesNotExist:
        return JsonResponse({'error': 'Assessment data not found'}, status=404)
    
@csrf_exempt
def submit_login(request):
    if request.method == 'POST':
        data = request.POST
        pprint.pprint(LoginDetails.objects.filter(pk=11))
        for key, value in request.POST.items():
            print(f"Parameter: {key}, Value: {value}")
        print("Register Password",data.get('password'))
        # Create LoginDetails object
        login = LoginDetails.objects.create(
            username=data.get('username'),
            password=data.get('password'),
        )

        return JsonResponse({'id': login.pk})

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def verify_login(request):
    if request.method == 'POST':
        data = request.POST
        print(data)
        # Retrieve stored login details
        stored_login = LoginDetails.objects.get(username__iexact=data.get('username'))
        print(stored_login.username)

        if stored_login:
            # Compare the passwords directly
            if data.get('password') == stored_login.password:
                # Authentication successful
                user_role = stored_login.user_data.role if stored_login.user_data and stored_login.user_data.role else None
                print(user_role)
                return JsonResponse({'message': 'Login successful', 'role': user_role})
            else:
                # Password does not match
                return JsonResponse({'error': 'Invalid password'}, status=401)
        else:
            # Username not found
            return JsonResponse({'error': 'Invalid username'}, status=401)

    return JsonResponse({'error': 'Invalid request method'}, status=405)