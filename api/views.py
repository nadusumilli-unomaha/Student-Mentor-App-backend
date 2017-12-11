# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth import authenticate, login, logout


from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.permissions import (
        AllowAny,
        IsAuthenticated,
        IsAdminUser,
        IsAuthenticatedOrReadOnly
    )

from api.models import *
from api.serializers import *
from django.utils import six

import requests
import json

# Create your views here.
def Home(request):
   """
   Send requests to / to the ember.js clientside app
   """
   return render_to_response('index.html',
               {}, RequestContext(request))


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed.
    """
    resource_name = 'users'
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class MentorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed.
    """
    resource_name = 'mentors'
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer
    permission_classes = [IsAuthenticated]

class StudentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed.
    """
    resource_name = 'students'
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

class PermissionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = [IsAuthenticated]

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]

class AddMentor(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        if request.POST.get('mentor'):
            mentor = Mentor.objects.get(id=request.POST.get('mentor'))
        if request.POST.get('user'):
            user = User.objects.get(id=request.POST.get('user'))
            student = Student.objects.get(id=user.student.id)
        if student.noofmentors < 5:
            student.noofmentors += 1
            student.save(update_fields=['noofmentors'])
        try:
            student.mentors.add(mentor)
        except ValidationError as e:
            print(e)
            return Response({'success': False, 'status':status.HTTP_400_BAD_REQUEST}) 
        return Response({'success': True, 'status':status.HTTP_200_OK})

class RemoveMentor(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        if request.POST.get('mentor'):
            mentor = Mentor.objects.get(id=request.POST.get('mentor'))
        if request.POST.get('student'):
            student = Student.objects.get(id=request.POST.get('student'))
            if student.noofmentors > 0:
                student.noofmentors -= 1
                student.save(update_fields=['noofmentors'])
        try:
            student.mentors.remove(mentor)
        except ValidationError as e:
            print(e)
            return Response({'success': False, 'status':status.HTTP_400_BAD_REQUEST}) 
        return Response({'success': True, 'status':status.HTTP_200_OK})


class Session(APIView):
    permission_classes = (AllowAny,)
    def form_response(self, isauthenticated, userid, username, is_superuser=False, error=""):
        data = {
            'isauthenticated': isauthenticated,
            'userid': userid,
            'username': username,
            'issuperuser': is_superuser,
        }
        if error:
            data['message'] = error

        return Response(data)

    def get(self, request, *args, **kwargs):
        # Get the current user
        if request.user.is_authenticated():
            return self.form_response(True, request.user.id, request.user.username, request.user.is_superuser)
        return self.form_response(False, None, None)

    def post(self, request, *args, **kwargs):
        # Login
        if(request.POST.get('type') == 'googleapi'):
            print(request.POST.get('code'))
            print('\n')
            payload = {
                'code': request.POST.get('code'),
                'redirect_uri': request.POST.get('redirect_uri'),
                'client_id': request.POST.get('client_id'),
                'client_secret': 'GTh3XSznfL4tWbDajpYwYjrR',
                'scope': 'email',
                'grant_type': 'authorization_code'
            }
            headers = {
                'Content-Type': 'application/x-www-formurlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            }

            response = requests.post("https://www.googleapis.com/oauth2/v4/token", data=payload)
            # print(json.loads(response.text))
            return Response(json.loads(response.text))

        if(request.POST.get('type') == 'regular'):
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return self.form_response(True, user.id, user.username, user.is_superuser)
                return self.form_response(False, None, None, None, "Account is suspended")
            return self.form_response(False, None, None, None,"Invalid username or password")

    def delete(self, request, *args, **kwargs):
        # Logout
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)
        

class Register(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        # Login
        username = request.POST.get('username') #you need to apply validators to these
        print (username)
        password = request.POST.get('password') #you need to apply validators to these
        email = request.POST.get('email') #you need to apply validators to these

        print (request.POST.get('username'))
        if User.objects.filter(username=username).exists():
            return Response({'username': 'Username is taken.', 'status': 'error'})
        elif User.objects.filter(email=email).exists():
            return Response({'email': 'Email is taken.', 'status': 'error'})

        #especially before you pass them in here
        newuser = User.objects.create_user(email=email, username=username, password=password)
        newstudent = Student(user=newuser)
        newstudent.save()

        return Response({'status': 'success', 'userid': newuser.id, 'profile': newstudent.id})
