import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause  } from '../redux/features/playerSlice';

import { useGetArtistDetailsQuery, useGetSongsBySearchQuery } from '../redux/services/deezerCore';


const ArtistDetails = () => {
    const dispatch = useDispatch();
    const { id:artistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const {data: artistData, isFetching:isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);
    const {data, isFetching:isFetchingSearchingDetails, error:searchError} = useGetSongsBySearchQuery(artistData?.name);

    const handlePauseClick = () => {
        dispatch(playPause(false));
      };
      const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({song, data, i}));
        dispatch(playPause(true));
      };

    if(isFetchingArtistDetails) return <Loader title="Loading artist details" />

    if(error) return <Error />;

    if(isFetchingSearchingDetails) return <Loader title="Loading related songs" />

    if(searchError) return <Error />;

    return (
        <div className='flex flex-col'>
            <DetailsHeader artistId={artistId} artistData={artistData}></DetailsHeader>
            <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
                artistId={artistId}
            />
        </div>
    );
}

export default ArtistDetails;
