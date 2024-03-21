from rest_framework import serializers
from .models import *
from django.contrib.auth.password_validation import validate_password

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


class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'confirm_password', 'gender']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")

        for field_name, value in data.items():
            if value in [None, '']:
                raise serializers.ValidationError(f"{field_name} cannot be empty")
        
        password = data.get('password')
        if len(password) < 7:
            raise serializers.ValidationError("Password must be at least 7 characters long")

        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = CustomUser.objects.create_user(**validated_data)
        return user