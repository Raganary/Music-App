import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause  } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongsBySearchQuery } from '../redux/services/deezerCore';

const SongDetails = () => {
    const dispatch = useDispatch();
    const { songid } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const {data: songData, isFetching:isFetchingSongDetails } = useGetSongDetailsQuery(songid);
    const {data, isFetching:isFetchingSearchingDetails, error:searchError} = useGetSongsBySearchQuery(songData?.artist?.name);

    const handlePauseClick = () => {
        dispatch(playPause(false));
      };
      const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({song, data, i}));
        dispatch(playPause(true));
      };

    if(isFetchingSongDetails || isFetchingSearchingDetails) return <Loader title="Searching song details" />

    if(searchError) return <Error />;

    return (
        <div className='flex flex-col'>
            <DetailsHeader songData={songData}></DetailsHeader>
            <div className="mb-5">
                <h2 className="text-white text-xl font-bold">Album Title:</h2>
                <p className="text-base text-gray-400 mb-2">{songData?.album?.title}</p>
                <h2 className="text-white text-xl font-bold">Release Date:</h2>
                <p className="text-base text-gray-400 mb-2">{songData?.album?.release_date}</p>
                <h2 className="text-white text-xl font-bold">Gain:</h2>
                <p className="text-base text-gray-400 ">{songData?.gain}</p>
            </div>
            <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
                artistId={songData?.artist?.id}
            />
        </div>
    );
}

export default SongDetails;
