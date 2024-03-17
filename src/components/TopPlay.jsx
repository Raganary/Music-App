import {useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode} from 'swiper';

import PlayPause from './PlayPause';
import {playPause, setActiveSong} from '../redux/features/playerSlice';
import {useGetTopChartsQuery, useGetArtistDetailsQuery} from '../redux/services/deezerCore';

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({song, i, isPlaying, activeSong, handlePlayClick, handlePauseClick}) => (
  <div className='w-full flex flex-row items-center hover:bg-[#3B0D11] py-2 p-4 rounded-lg cursor-pointer'>
    <h3 className='font-bold text-white mr-3'>{i+1}.</h3>
    <div className='flex-1 flex flex-row justify-between items-center'>
      <img className='w-16 h-16 rounded-lg' src={song.album?.cover_xl} alt={song?.title}/>
      <div className='flex-1 flex flex-col justify-center mx-3'>
        <Link to={`/song/${song.id}`}>
          <p className='font-bold text-white'>{song?.title}</p>
        </Link>
        <Link to={`/artist/${song.artist?.id}`}>
          <p className='text-white'>{song?.artist.name}</p>
        </Link>
      </div>
    </div> 
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={ () => handlePlayClick(song, i)}
    />
  </div>
)

const ArtistImage = ({track}) => {
  const {data: artistData, isFetching:isFetchingArtistDetails } = useGetArtistDetailsQuery(track?.artist?.id);

  return (
      <img src={artistData?.picture_medium}className='w-[140px] rounded-full object-cover'/>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const {activeSong, isPlaying} = useSelector((state) => state.player);
  const {data} = useGetTopChartsQuery();
  const divRef = useRef(null);
  const topPlays = data?.tracks.data.slice(0,5);

  useEffect(() => {
    divRef.current.scrollIntoView({behavior: 'smooth'});
  });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
  };

  return(
    <div ref={divRef} className='xl:ml-6 ml-0 xl:mb-0 mb-4 flex-1 xl:max-w-[500px] max-w-full flex flex-col'>
      <div className='w-full flex flex-col'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-xl'>Top Charts</h2>
          <Link to='/top-charts'>
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>

        <div className='mt-4 flex flex-col gap-1'>
          {topPlays?.map((song, i) => (
            <TopChartCard 
              key={song.id}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePlayClick={handlePlayClick}
              handlePauseClick={handlePauseClick}
            />
          ))}
        </div>
      </div>

      <div className='w-full flex flex-col mt-4'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-xl'>Top Artists</h2>
          <Link to='/top-artists'>
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>     
      </div>
      
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className='mt-4'
        
      >
        {topPlays?.map((song, i) => (
            <SwiperSlide 
              key={song?.id}
              style={{width: '20%', height:'auto'}}
              className='shadow-lg rounded-full animate-slideright'
            >
              <Link to={`/artist/${song.artist?.id}`}>
                <ArtistImage key={song.key} track={song}/>
              </Link>
            </SwiperSlide>
        ))}
      </Swiper>

    </div>
  )
};

export default TopPlay;