import { useNavigate } from 'react-router-dom';
import { useGetArtistDetailsQuery } from '../redux/services/deezerCore';

const ArtistCard = ({track}) => {
  const navigate = useNavigate();
  const {data: artistData, isFetching:isFetchingArtistDetails } = useGetArtistDetailsQuery(track?.artist?.id);

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-ocacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    onClick={() => navigate(`/artist/${track?.artist?.id}`)}>
      <img alt="artist" src={artistData?.picture_medium}
      className="w-full h-56 rounded-lg"/>
      <p className="mt-4 font-semibold text-lg text-white truncate">{track?.artist?.name}</p>
    </div>
  );
};

export default ArtistCard;
