import { FaPauseCircle, FaPlayCircle} from 'react-icons/fa';
const PlayPause = ({isPlaying, activeSong, song, handlePause, handlePlay}) => 
(isPlaying && activeSong?.id === song.id ? (
  <FaPauseCircle
    size={30}
    className='text-gray-300'
    onClick={handlePause}
  />
):(
  <FaPlayCircle
    size={30}
    className='text-gray-300'
    onClick={handlePlay}
  />
  
));
export default PlayPause;
