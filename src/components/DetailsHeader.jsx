import {Link} from 'react-router-dom'

const DetailsHeader = ({ artistId, artistData, songData}) => {

return (
  <div className="relative flex w-full sm:h-80 h-64">
      <div className="absolute inset-2 flex items-end">
        <img
          alt="art"
          src={artistId ? artistData?.picture_xl
          :songData?.album?.cover_xl}
          className="sm:w-full w-full sm:h-full h-full rounded-lg object-cover"
        />
        <div className="absolute w-full h-48 bg-gradient-to-t from-[#000000] rounded-lg">
          <p className="ml-5 mt-32 font-bold sm:tet-3xl text-xl text-white">{artistId ? artistData?.name : songData?.title}</p>
          {!artistId && (
            <Link to={`/artists/${songData?.artist.id}`}>
              <p className="ml-5 text-base text-gray-400">{songData?.artist?.name}</p>
            </Link>
          )}
        </div>

      </div>
      <div className="w-full sm:h-44 h-24"/>
    </div>
)
}

export default DetailsHeader;
