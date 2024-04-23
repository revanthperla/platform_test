from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
import boto3
from botocore.exceptions import ClientError
import os
import logging
from rest_framework.views import APIView
import jwt
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from django.views.decorators.http import require_http_methods
import json

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

class RegisterView(APIView):
    def post(self, request):
        serializer = LoginDetailsSerializer(data=request.data)
        if serializer.is_valid():
            # Hash the password before saving the user
            validated_data = serializer.validated_data
            validated_data['password'] = make_password(validated_data['password'])
            user = serializer.save()
            return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Validate that both username and password are provided
        if not username or not password:
            return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user
        user = authenticate(username=username, password=password)

        if user is None:
            return Response({'error': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Generate JWT token
        token = jwt.encode({'user_id': user.id}, 'your_secret_key', algorithm='HS256')
        response_data = {'token': token, 'Role': user.user_data.role}
        response = Response(response_data, status=status.HTTP_200_OK)
        response.set_cookie('jwt', token)

        return response
    
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
    recruiters = UserData.objects.filter(role='Recruiter').values('id', 'fullName')  # Assuming 'Recruiter' is the role name
    return JsonResponse({'recruiters': list(recruiters)})

def get_accoutmanagers(request):
    accountManagers = UserData.objects.filter(role='Account Manager').values('id', 'fullName')  # Assuming 'Account Manager' is the role name
    return JsonResponse({'accountManagers': list(accountManagers)})

def get_bdp(request):
    bdp = UserData.objects.filter(role='Business Development Partner').values('id', 'fullName')  # Assuming 'Recruiter' is the role name
    return JsonResponse({'bdp': list(bdp)})

def get_bdpm(request):
    bdpm = UserData.objects.filter(role='Business Development Partner Manager').values('id', 'fullName')  # Assuming 'Recruiter' is the role name
    return JsonResponse({'bdpm': list(bdpm)})

def get_latest_user(request):
    if request.method == 'GET':
        latest_object_id = UserData.objects.latest('id').id
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
    
class GetUserDetails(APIView):
    def get(self, request):
        print(request.COOKIES)
        token = request.headers.get('Authorization')
        
        if token:
            try:
                # Decode the JWT token to extract user ID
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                user_id = payload.get('id')
                user = LoginDetails.objects.get(pk=user_id)

                user_data = user.user_data

                # Fetch and format user details
                education_data = list(Education.objects.filter(user=user_data).values())
                work_experience_data = list(WorkExperience.objects.filter(user=user_data).values())

                data = {
                    'user': {
                        'fullName': user_data.fullName,
                        'gender': user_data.gender,
                        'aadhaarNumber': user_data.aadhaarNumber,
                        'dateOfBirth': user_data.dateOfBirth,
                        'maritalStatus': user_data.maritalStatus,
                        'emergencyContactName': user_data.emergencyContactName,
                        'address': user_data.address,
                        'phoneNumber': user_data.phoneNumber,
                        'emailID': user_data.emailID,
                        'emergencyContactNumber': user_data.emergencyContactNumber,
                        'jobTitle': user_data.jobTitle,
                        'departmentName': user_data.departmentName,
                        'joiningDate': user_data.joiningDate,
                        'employmentType': user_data.employmentType,
                        'relevantSkills': user_data.relevantSkills,
                    },
                    'education': education_data,
                    'workExperience': work_experience_data
                }
                return JsonResponse(data)
            except jwt.ExpiredSignatureError:
                return JsonResponse({'error': 'Token expired'}, status=401)
            except jwt.InvalidTokenError:
                return JsonResponse({'error': 'Invalid token'}, status=401)
            except LoginDetails.DoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)
        else:
            return JsonResponse({'error': 'You are not logged in'}, status=401)

def get_user_details(request):
    User = get_user_model()
    try:
        user=request.user
        user_data = user.user_data
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
def update_assessment_status(request, pk):
    try:
        instance = Assessment.objects.get(pk=pk)
        instance.is_active = True
        instance.save()
        return JsonResponse({'message': 'Field updated successfully'})
    except Assessment.DoesNotExist:
        return JsonResponse({'error': 'Object does not exist'}, status=404)
    
from django.http import JsonResponse

@csrf_exempt
@require_http_methods(["PATCH"])
def update_assessment(request, pk):
    try:
        assessment = Assessment.objects.get(pk=pk)
        # Load JSON data from request body
        data = json.loads(request.body)
        # Update the assessment object with the data from the request
        for key, value in data.items():
            setattr(assessment, key, value)
        assessment.save()
        return JsonResponse({'message': 'Assessment updated successfully'})
    except Assessment.DoesNotExist:
        return JsonResponse({'error': 'Assessment not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def assessment_rejection(request, pk):
    try:
        assessment = Assessment.objects.get(pk=pk)
    except Assessment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PATCH':
        serializer = AssessmentSerializer(assessment, data=request.data, partial=True)
        if serializer.is_valid():
            # Update the assessment object with the rejection reason
            serializer.save(rejection_reason=request.data.get('rejection_reason'))
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)