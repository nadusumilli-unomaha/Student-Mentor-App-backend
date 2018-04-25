# @Author: Matthew Hale <matthale>
# @Date:   2018-04-25T11:03:35-05:00
# @Email:  mlhale@unomaha.edu
# @Filename: models.py
# @Last modified by:   matthale
# @Last modified time: 2018-04-25T13:00:11-05:00
# @Copyright: Copyright (C) 2018 Matthew L. Hale



# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from django.contrib.auth.models import User, Group, Permission
from django.contrib import admin
from django.db.models.signals import m2m_changed
from django.core.exceptions import ValidationError
from django.contrib.postgres.fields import ArrayField

class Mentor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    video = models.URLField(max_length=200)
    cv = models.URLField(max_length=200)
    bio = models.CharField(max_length=400)
    researchinterest = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    job = models.CharField(max_length=200)
    fieldofstudy = models.CharField(max_length=200)
    webpage = models.URLField(max_length=200)
    experience = models.CharField(max_length=200)
    studentsmaxedout = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

    class JSONAPIMeta:
        resource_name = "mentors"

class MentorAdmin(admin.ModelAdmin):
    #This inner class indicates to the admin interface how to display a post
    #See the Django documentation for more information
    list_display = ( 'user',)


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mentors = models.ManyToManyField(Mentor, blank=True, related_name='students')
    mentorsclicked = ArrayField(models.CharField(max_length=10, blank=True),size=None,null=True)
    noofmentors = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username

    class JSONAPIMeta:
        resource_name = "students"

class StudentAdmin(admin.ModelAdmin):
    #This inner class indicates to the admin interface how to display a post
    #See the Django documentation for more information
    list_display = ( 'user',)

def mentors_changed(sender, **kwargs):
    if kwargs['instance'].mentors.count() > 5 or kwargs['instance'].mentors.count() < 0:
        kwargs['instance'].mentorsmaxedout = True
        raise ValidationError("You cannot have more than five mentors")
    for mentor in kwargs['instance'].mentors.all():
        if mentor.students.count() > 3 or mentor.students.count() < 0:
            raise ValidationError("Students Maxed out for Mentor")

m2m_changed.connect(mentors_changed, sender=Student.mentors.through)
