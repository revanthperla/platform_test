from rest_framework import serializers
from .models import *

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        fields = '__all__'

class PendingClientRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingClientRegistration
        fields = '__all__'

class ClientRegistrationSerializer(serializers.ModelSerializer):
    pending_registration = PendingClientRegistrationSerializer(required=False)

    class Meta:
        model = ClientRegistration
        fields = '__all__'

    def create(self, validated_data):
        pending_registration_data = validated_data.pop('pending_registration', None)
        client_registration = super().create(validated_data)
        if pending_registration_data:
            PendingClientRegistration.objects.create(client_registration=client_registration)
        return client_registration

class JobDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobDescription
        fields = '__all__'

class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class LoginDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginDetails
        fields = '__all__'