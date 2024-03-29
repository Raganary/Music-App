import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} sm:block h-16 w-16 mr-4`}>
      <img src={activeSong?.album?.cover_big} alt="cover art" className="rounded-full" />
    </div>
    <div className="xl:w-64 sm:w-20">
      <p className="truncate text-white font-bold">
        {activeSong?.title ? activeSong?.title : 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.artist?.name ? activeSong?.artist?.name : 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
