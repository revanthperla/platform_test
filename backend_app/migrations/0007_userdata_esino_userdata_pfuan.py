# Generated by Django 5.0.2 on 2024-03-12 06:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0006_alter_clientregistration_companynumber'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdata',
            name='esiNO',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='userdata',
            name='pfUAN',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
