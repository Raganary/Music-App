import { useParams } from 'react-router-dom';
import {ArtistCard, Error, Loader} from '../components';
import { useGetTopChartsQuery } from '../redux/services/deezerCore';

const TopArtists = () => {
    const {data, isFetching, error} = useGetTopChartsQuery();

    if(isFetching) return <Loader title="Loading top charts" />;

    if(error) return <Error />;
    console.log(data)
    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                Top Artists
            </h2>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.tracks?.data.map((track) => (
                    <ArtistCard
                        key={track.key} track={track}
                    />
                ))}
            </div>
        </div>
    );

};

export default TopArtists;
