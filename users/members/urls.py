from django.urls import path
from .views import UserList, RegisterView, LoginView, LogoutView, LikedSongsListView, LikedSongAddView, LikedSongDeleteView

urlpatterns = [
    path('users/', UserList.as_view(), name='user_list'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('liked-songs/', LikedSongsListView.as_view(), name='liked_songs_list'),
    path('liked-songs/add/', LikedSongAddView.as_view(), name='liked_song_add'),
    path('liked-songs/delete/<int:song_id>/', LikedSongDeleteView.as_view(), name='liked_song_delete'),
    
]
