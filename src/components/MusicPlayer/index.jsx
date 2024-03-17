import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const data = currentSongs;
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSongs?.nb_tracks) dispatch(playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    //debugging issues what currentSongs was not being saved after transition from state to state
    //state, action
    //formating is action i.e. (activeSong, currentSongs, index)
    dispatch(playPause(false));
    if (!shuffle) {
      //calculate next index and if the index has reached the end, the playlist index loops back
      //round robin
      //currentSongs variable is a playlist with number tracks as endpoint variable
      const i = (currentIndex + 1) % currentSongs?.nb_tracks;
      dispatch(nextSong({activeSong, currentSongs, i}));
    } else {
      const i = Math.floor(Math.random() *  currentSongs?.nb_tracks);
      dispatch(nextSong({activeSong, currentSongs, i}));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      const i = currentSongs?.nb_tracks - 1;
      dispatch(prevSong({activeSong, currentSongs, i}));
    } else if (shuffle) {
      const i = Math.floor(Math.random() * currentSongs?.nb_tracks);
      dispatch(prevSong({activeSong, currentSongs, i}));
    } else {
      const i = currentIndex - 1;
      dispatch(prevSong({activeSong, currentSongs, i}));
    }
  };

  return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />
    </div>
  );
};

export default MusicPlayer;
