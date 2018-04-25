# @Author: Matthew Hale <matthale>
# @Date:   2017-12-11T09:59:08-06:00
# @Email:  mlhale@unomaha.edu
# @Filename: serializers.py
# @Last modified by:   matthale
# @Last modified time: 2018-04-25T12:59:23-05:00
# @Copyright: Copyright (C) 2018 Matthew L. Hale



from django.contrib.auth.models import User, Group
from rest_framework import serializers
# from rest_framework_json_api.relations import *


#load django and webapp models
#from django.contrib.auth.models import *
from api.models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email')
        #fields = ('url', 'username', 'email', 'groups', 'experiments')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class PermissionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Permission
        fields = ('name', 'codename')

class MentorSerializer(serializers.HyperlinkedModelSerializer):
    #fields = '__all__'
    user = UserSerializer(read_only=True)
    class Meta:
        model = Mentor
        fields = ('user', 'video', 'cv', 'bio', 'researchinterest', 'institution','job','fieldofstudy', 'webpage', 'experience', 'studentsmaxedout', 'students')

class StudentSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Student
        fields = ('user', 'mentors', 'mentorsclicked','noofmentors')

# class EventSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Event
#         fields = ('title', 'description')

# class DegreeSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Degree
#         fields = ('title', 'description')
