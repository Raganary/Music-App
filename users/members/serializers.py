from rest_framework import serializers
from .models import Member, Song, LikedSong

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['id', 'username', 'password']  # Update fields as needed

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'title', 'artist']  # Update fields as needed

class LikedSongsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedSong
        fields = ['id', 'user', 'title', 'artist']  # Update fields as needed
