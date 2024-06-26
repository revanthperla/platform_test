from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, EmailValidator
from django.core.exceptions import ValidationError
from django.utils import timezone
from s3direct.fields import S3DirectField
from django.contrib.auth.models import AbstractUser

class UserData(models.Model):
    ROLE_CHOICES = (
        ('Recruiter', 'Recruiter'),
        ('Manager', 'Manager'),
        ('Business Development Partner', 'Business Development Partner'),
        ('Business Development Partner Manager', 'Business Development Partner Manager'),
        ('Account Manager', 'Account Manager'),
    )

    fullName = models.CharField(max_length=255)
    gender = models.CharField(max_length=10)
    aadhaarNumber = models.CharField(max_length=12)
    dateOfBirth = models.CharField(max_length=30)
    maritalStatus = models.CharField(max_length=20)
    emergencyContactName = models.CharField(max_length=255)
    address = models.TextField()
    phoneNumber = models.IntegerField(validators=[MinValueValidator(0000000000), MaxValueValidator(9999999999)])
    emailID = models.EmailField(validators=[EmailValidator()])
    emergencyContactNumber = models.IntegerField(validators=[MinValueValidator(0000000000), MaxValueValidator(9999999999)])
    jobTitle = models.CharField(max_length=100)
    departmentName = models.CharField(max_length=100)
    joiningDate = models.CharField(max_length=30)
    employmentType = models.CharField(max_length=100)
    relevantSkills = models.TextField()
    documentAcknowledged = models.BooleanField(default=False)
    pfUAN = models.CharField(max_length=100)
    esiNO = models.CharField(max_length=100)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)

    def __str__(self):
        return self.fullName if self.fullName else "Unnamed User"

class LoginDetails(AbstractUser):
    user_data = models.OneToOneField(UserData, on_delete=models.CASCADE)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)  # Note: It's recommended to use hashed passwords in production

    USERNAME_FIELD = 'username'
    def __str__(self):
        return self.username


def current_year_validator(value):
    current_year = timezone.now().year
    if value > current_year:
        raise ValidationError(
            f'Year cannot be greater than the current year ({current_year}).'
        )

class Education(models.Model):
    user = models.ForeignKey(UserData, related_name='education', on_delete=models.CASCADE)
    degree = models.CharField(max_length=255)
    graduationYear = models.IntegerField(validators=[MinValueValidator(1960), current_year_validator])
    grade = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.user.fullName}'s Education"


class WorkExperience(models.Model):
    user = models.ForeignKey(UserData, related_name='work_experience', on_delete=models.CASCADE)
    companyName = models.CharField(max_length=255)
    designation = models.CharField(max_length=100)
    duration = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.fullName}'s Work Experience"
    
class ClientRegistration(models.Model):
    entityName = models.CharField(max_length=255)
    organizationStatus = models.CharField(max_length=255)
    estYear = models.CharField(max_length=4)  # Assuming year is a string field
    proprieterName = models.CharField(max_length=255)
    officeAddress = models.CharField(max_length=255)
    branchAddress = models.CharField(max_length=255)
    companyPerson = models.CharField(max_length=255)
    companyDesignation = models.CharField(max_length=255)
    companyNumber = models.CharField(max_length=255, default=0000000000)  # Assuming company number is a string field
    companyFax = models.IntegerField(validators=[MinValueValidator(0000000000), MaxValueValidator(9999999999)])  # Assuming fax is a string field
    companyEmail = models.EmailField(validators=[EmailValidator()])
    industryNature = models.CharField(max_length=255)
    companyCIN = models.CharField(max_length=255)
    companyPAN = models.CharField(max_length=10)  # Assuming PAN is a string field
    companyGST = models.CharField(max_length=15)  # Assuming GST is a string field
    bdpName =  models.CharField(max_length=255)
    bdpmName =  models.CharField(max_length=255)
    accountManager = models.CharField(max_length=255)
    billingCity = models.CharField(max_length=255)
    billingCountry = models.CharField(max_length=255)

    def __str__(self):
        return self.entityName  # Change this based on what you want to display for each instance
    
class PendingClientRegistration(models.Model):
    client_registration = models.OneToOneField(ClientRegistration, on_delete=models.CASCADE)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return f"Pending: {self.client_registration.entityName}"
    
class RejectionReason(models.Model):
    client = models.ForeignKey(PendingClientRegistration, on_delete=models.CASCADE)
    reason = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Rejection Reason for {self.client.entityName}"
    
class Notification(models.Model):
    user = models.ForeignKey(UserData, on_delete=models.CASCADE)  # Reference UserData model for user information
    client_registration = models.OneToOneField(ClientRegistration, on_delete=models.CASCADE)
    approved = models.BooleanField(default=False)
    rejection_reason = models.OneToOneField(RejectionReason, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
class JobDescription(models.Model):
    titleDesignation = models.CharField(max_length=255)
    accountManager = models.CharField(max_length=255)
    assignedRecruiters = models.CharField(max_length=255)
    startDate = models.CharField(max_length=30)
    closureDate = models.CharField(max_length=30)
    jobType = models.CharField(max_length=255)
    jobStatus = models.CharField(max_length=255)
    workExperience = models.CharField(max_length=255)
    industryNature = models.CharField(max_length=255)
    compensation = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    eligibilityCriteria = models.TextField()
    primaryResponsibilities = models.TextField()
    mandatorySkills = models.TextField()
    desirableSkills = models.TextField()
    clientName = models.CharField(max_length=255)
    is_active = models.BooleanField(default=False)
    done = models.BooleanField(default=False)
    resume = S3DirectField(dest='primary_destination', blank=True, null=True)

    def __str__(self):
        return self.titleDesignation

    
class Assessment(models.Model):
    job_description = models.CharField(max_length=255)
    candidateName = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    currentEmployer = models.CharField(max_length=255)
    totalExperience = models.CharField(max_length=255)
    ctc = models.CharField(max_length=255)
    ectc = models.CharField(max_length=255)
    noticePeriod = models.CharField(max_length=255)
    relocate = models.CharField(max_length=255)
    comments = models.TextField()
    remarks = models.TextField()
    is_active = models.BooleanField(default=False)
    done = models.BooleanField(default=False)
    interview = models.BooleanField(default=False)
    rejection_reason = models.TextField(null=True, default='')

    def __str__(self):
        return self.candidateName  # Change this based on what you want to display for each instance
    
class Appointment(models.Model):
    assessment = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    description = models.TextField()
    done = done = models.BooleanField(default=False)

    def __str__(self):
        return f"Appointment for {self.assessment} on {self.date} at {self.time}"

