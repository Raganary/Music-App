import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause,setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({song, isPlaying, activeSong, data, i}) => {
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
  };

  return (
  <div className='flex flex-col w-[155px] p-3 bg-white/10 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
    <div className='relative w-full group'>
      <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 rounded-lg group-hover:flex ${activeSong?.id === song.id ? 'flex bg-black bg-opacity-70' : 'hidden'} `}>
      <PlayPause 
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
      />
      </div>
      <img className='w-full h-full rounded-lg' alt="song_img" src={song.album?.cover_xl}/>
    </div>
    <div className='mt-4 flex flex-col'>
      <p className='font-semibold text-base text-white truncate'>
        <Link to={`/songs/${song?.id}`}>
          {song.title}
        </Link>
      </p>
      <p className='text-sm truncate text-gray-300 mt-1'>
        <Link to={song.artist ? `/artist/${song.artist?.id}` : '/top-artists'}>
          {song.artist.name}
        </Link>
      </p>
    </div>
  </div>
)
  }

export default SongCard;
