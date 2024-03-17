import { useNavigate } from 'react-router-dom';
import { useGetArtistDetailsQuery } from '../redux/services/deezerCore';

const ArtistCard = ({track}) => {
  const navigate = useNavigate();
  const {data: artistData, isFetching:isFetchingArtistDetails } = useGetArtistDetailsQuery(track?.artist?.id);

  return (
    <div className="flex flex-col w-[155px] p-3 bg-white/10 bg-ocacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    onClick={() => navigate(`/artist/${track?.artist?.id}`)}>
      <img alt="artist" src={artistData?.picture_medium}
      className="w-300 h-300 rounded-lg"/>
      <p className="mt-4 font-semibold text-white truncate">{track?.artist?.name}</p>
    </div>
  );
};

export default ArtistCard;
