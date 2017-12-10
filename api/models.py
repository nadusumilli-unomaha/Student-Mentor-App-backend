# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from django.contrib.auth.models import User, Group, Permission
from django.contrib import admin
from django.db.models.signals import m2m_changed
from django.core.exceptions import ValidationError

class Mentor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="mentor")
    video = models.URLField(max_length=200)
    cv = models.URLField(max_length=200)
    bio = models.CharField(max_length=400)
    researchinterest = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    job = models.CharField(max_length=200)
    fieldofstudy = models.CharField(max_length=200)
    webpage = models.URLField(max_length=200)
    experience = models.CharField(max_length=200)
    studentsmaxedOut = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

    class JSONAPIMeta:
        resource_name = "mentors"

class MentorAdmin(admin.ModelAdmin):
    #This inner class indicates to the admin interface how to display a post
    #See the Django documentation for more information
    list_display = ( 'user',)


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="student")
    mentors = models.ManyToManyField(Mentor, blank=True, related_name='students')

    def __str__(self):
        return self.user.username

    class JSONAPIMeta:
        resource_name = "students"

class StudentAdmin(admin.ModelAdmin):
    #This inner class indicates to the admin interface how to display a post
    #See the Django documentation for more information
    list_display = ( 'user',)

def mentors_changed(sender, **kwargs):
    if kwargs['instance'].mentors.count() > 5:
        raise ValidationError("You cannot have more than five mentors")
    for mentor in kwargs['instance'].mentors.all():
        if mentor.students.count() > 3:
            raise ValidationError("Students Maxed out for Mentor")

m2m_changed.connect(mentors_changed, sender=Student.mentors.through)
