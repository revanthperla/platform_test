# Generated by Django 5.0.2 on 2024-02-16 05:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullName', models.CharField(blank=True, max_length=255)),
                ('gender', models.CharField(blank=True, max_length=10)),
                ('aadhaarNumber', models.CharField(blank=True, max_length=12)),
                ('dateOfBirth', models.DateField(blank=True, null=True)),
                ('maritalStatus', models.CharField(blank=True, max_length=20)),
                ('emergencyContact', models.CharField(blank=True, max_length=255)),
                ('address', models.TextField(blank=True)),
                ('phoneNumber', models.CharField(blank=True, max_length=20)),
                ('emailID', models.EmailField(blank=True, max_length=254)),
                ('emergencyContactNumber', models.CharField(blank=True, max_length=20)),
                ('jobTitle', models.CharField(blank=True, max_length=100)),
                ('departmentName', models.CharField(blank=True, max_length=100)),
                ('joiningDate', models.DateField(blank=True)),
                ('employmentType', models.CharField(blank=True, max_length=100)),
                ('prevCompany', models.CharField(blank=True, max_length=255)),
                ('prevDesignation', models.CharField(blank=True, max_length=100)),
                ('relevantSkills', models.TextField(blank=True)),
                ('documentAcknowledged', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('degree', models.CharField(max_length=255)),
                ('graduationYear', models.CharField(max_length=4)),
                ('grade', models.CharField(max_length=10)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='education', to='backend_app.userdata')),
            ],
        ),
        migrations.CreateModel(
            name='WorkExperience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('companyName', models.CharField(max_length=255)),
                ('designation', models.CharField(max_length=100)),
                ('duration', models.CharField(max_length=100)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='work_experience', to='backend_app.userdata')),
            ],
        ),
    ]
