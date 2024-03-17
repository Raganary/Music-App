import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '1963962142',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (action.payload?.data) {
        state.currentSongs = (action.payload.data);
      } else {
        state.currentSongs = (action.payload);
      }
      console.log(action)
      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      //debugging requires the index.jsx file this is for main playlists
      if (action.payload?.currentSongs.tracks.data[action.payload.i]) {
        state.activeSong = action.payload?.currentSongs.tracks.data[action.payload.i];
      } else {
        state.activeSong = action?.payload?.currentSongs?.tracks?.data;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      //similar to the nextSong reducer this one needs to check endpoint values to be able to grab data
      //action values depend on the input
      if (action.payload?.currentSongs?.tracks?.data[action.payload.i]) {
        state.activeSong = action.payload?.currentSongs.tracks.data[action.payload.i];
      } else {
        state.activeSong = action?.payload?.currentSongs?.tracks?.data;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;
