from django.db import models
class UserData(models.Model):
    fullName = models.CharField(max_length=255, blank=True)
    gender = models.CharField(max_length=10, blank=True)
    aadhaarNumber = models.CharField(max_length=12, blank=True)
    dateOfBirth = models.DateField(null=True, blank=True)
    maritalStatus = models.CharField(max_length=20, blank=True)
    emergencyContact = models.CharField(max_length=255, blank=True)
    address = models.TextField(blank=True)
    phoneNumber = models.CharField(max_length=20, blank=True)
    emailID = models.EmailField(blank=True)
    emergencyContactNumber = models.CharField(max_length=20, blank=True)
    jobTitle = models.CharField(max_length=100, blank=True)
    departmentName = models.CharField(max_length=100, blank=True)
    joiningDate = models.DateField(blank=True)
    employmentType = models.CharField(max_length=100, blank=True)
    prevCompany = models.CharField(max_length=255, blank=True)
    prevDesignation = models.CharField(max_length=100, blank=True)
    relevantSkills = models.TextField(blank=True)
    documentAcknowledged = models.BooleanField(default=False)

    def __str__(self):
        return self.fullName if self.fullName else "Unnamed User"


class Education(models.Model):
    user = models.ForeignKey(UserData, related_name='education', on_delete=models.CASCADE)
    degree = models.CharField(max_length=255)
    graduationYear = models.CharField(max_length=4)
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