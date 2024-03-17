import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';

const SongBar = ({ song, i, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className={`w-full flex flex-row items-center hover:bg-[#3B0D11] ${activeSong?.title === song?.title ? 'bg-[#3B0D11]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={artistId ? song?.album?.cover_xl.replace('{w}', '125').replace('{h}', '125') : song?.artist?.picture_xl}
        alt={song?.title}
      />
      
      <div className="flex-1 flex flex-col justify-center mx-3">
        {artistId ? (
          <Link to={`/songs/${song.id}`}>
            <p className="text-xl font-bold text-white">
              {song?.title}
            </p>
          </Link>
        ) : (
          <p className="text-xl font-bold text-white">
            {song?.title}
          </p>
        )}
        <p className="text-base text-gray-300 mt-1">
          {artistId ? song?.album?.title : song?.title}
        </p>
      </div>
    </div>
    {artistId
      ? (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)}
        />
      )
      : null}
  </div>
);

export default SongBar;