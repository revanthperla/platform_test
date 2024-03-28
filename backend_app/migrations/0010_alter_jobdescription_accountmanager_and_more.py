# Generated by Django 5.0.2 on 2024-03-12 16:36

import django.db.models.deletion
import s3direct.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0009_alter_userdata_aadhaarnumber_alter_userdata_address_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobdescription',
            name='accountManager',
            field=models.ForeignKey(limit_choices_to={'role__role': 'Account Manager'}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='job_descriptions_as_account_manager', to='backend_app.userdata'),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='added_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='added_job_descriptions', to='backend_app.userdata'),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='assignedRecruiters',
            field=models.ForeignKey(limit_choices_to={'role__role': 'Recruiter'}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assigned_job_descriptions', to='backend_app.userdata'),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='client',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='backend_app.clientregistration'),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='clientName',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='closureDate',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='compensation',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='desirableSkills',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='done',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='eligibilityCriteria',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='industryNature',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='is_active',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='jobStatus',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='jobType',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='location',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='mandatorySkills',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='primaryResponsibilities',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='resume',
            field=s3direct.fields.S3DirectField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='startDate',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='titleDesignation',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='jobdescription',
            name='workExperience',
            field=models.CharField(max_length=255, null=True),
        ),
    ]