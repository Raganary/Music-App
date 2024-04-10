from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Member, Song
from .serializers import MemberSerializer, SongSerializer
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404


from django.contrib.auth.models import User
from django.shortcuts import render

class UserList(APIView):
    def get(self, request, format=None):
        users = User.objects.all()
        user_data = [{'username': user.username} for user in users]
        return Response(user_data, status=status.HTTP_200_OK)
    
class RegisterView(APIView):
    def post(self, request):
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return Response({'success': True, 'message': 'User logged in successfully'})
        return Response({'success': False, 'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'success': True, 'message': 'User logged out successfully'})

class LikedSongsListView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            liked_songs = request.user.liked_songs.all()
            serializer = SongSerializer(liked_songs, many=True)
            return Response({'liked_songs': serializer.data})
        return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

class LikedSongAddView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            serializer = SongSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'success': True, 'message': 'Song added to liked songs'}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

class LikedSongDeleteView(APIView):
    def delete(self, request, song_id):
        if request.user.is_authenticated:
            song = get_object_or_404(Song, id=song_id)
            if song in request.user.liked_songs.all():
                request.user.liked_songs.remove(song)
                return Response({'success': True, 'message': 'Song removed from liked songs'})
            return Response({'success': False, 'message': 'Liked song not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
