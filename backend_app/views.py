from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import *
from .serializers import *

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
