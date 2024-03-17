import {Link} from 'react-router-dom'

const DetailsHeader = ({ artistId, artistData, songData}) => {
  const artist = artistData;

return (
  <div className="relative flex w-full sm:h-80 h-64">
      <div className="absolute inset-2 flex items-end">
        <img
          alt="art"
          src={artistId ? artist.picture_xl.replace('{w}','300').replace('{h}', '300')
          :song.album?.cover_xl}
          className="sm:w-full w-full sm:h-full h-full rounded-lg object-cover"
        />
        <div className="absolute w-full h-48 bg-gradient-to-t from-[#000000] rounded-lg">
          <p className="ml-5 mt-32 font-bold sm:tet-3xl text-xl text-white">{artistId ? artist?.name : songData?.title}</p>
          {!artistId && (
            <Link to={`/artists/${songData?.artist.id}`}>
              <p className="text-base text-gray-400 mt-2">{songData?.title}</p>
            </Link>
          )}
        </div>

      </div>
      <div className="w-full sm:h-44 h-24"/>
    </div>
)
}

export default DetailsHeader;
