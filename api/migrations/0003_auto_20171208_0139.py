# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-12-08 01:39
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20171207_2345'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='mentors',
            field=models.ManyToManyField(blank=True, related_name='students', to='api.Mentor'),
        ),
        migrations.AlterField(
            model_name='mentor',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='mentor', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='student',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='student', to=settings.AUTH_USER_MODEL),
        ),
    ]
