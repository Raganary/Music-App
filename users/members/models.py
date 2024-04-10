from django.db import models
from django.contrib.auth.models import User


class Member(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    liked_songs = models.ManyToManyField('Song', related_name='members', blank=True)

class Song(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.title} - {self.artist}'
    
class LikedSong(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username}'s liked song: {self.title} by {self.artist}"