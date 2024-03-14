import {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

import {Error, Loader, SongCard} from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/deezerCore';

const AroundYou = () => {
    const [countryCode, setCountry] = useState('');
    const [countryLabel, setLabel] = useState('');
    const [loading, setLoading] = useState(true);
    const {activeSong, isPlaying} = useSelector((state => state.player));
    const {data, isFetching, error} = useGetSongsByCountryQuery(countryCode);

    const countryMap = {
        "Algeria" : "1362501015",
        "Argentina" : "1279119721",
        "Australia" : "1313616925",
        "Austria" : "1313615765",
        "Belgium" : "1266968331",
        "Boliva" : "1362495515",
        "Brazil" : "1111141961",
        "Bulgaria" : "1362494565",
        "Canada" : "1652248171",
        "Chile" : "1279119121",
        "Colombia" : "1116188451",
        "Costa Rica" : "1313618455",
        "Croatia" : "1266971131",
        "Czechia" : "1266969571",
        "Denmark" : "1313618905",
        "Ecuador" : "1362501235",
        "Egypt" : "1362501615",
        "El Salvador" : "1362523615",
        "Estonia" : "1221037201",
        "Finland" : "1221034071",
        "France" : "1109890291",
        "Germany" : "1111143121",
        "Guatemala" : "1279118671",
        "Honduras" : "1116190301",
        "Hungary" : "1362506695",
        "Indonesia" : "1116188761",
        "Ireland" : "1313619455",
        "Isreal" : "1362507345",
        "Italy" : "1116187241",
        "Ivory Coast" : "1362497945",
        "Jamaica" : "1362508575",
        "Japan" : "1362508955",
        "Jordan" : "1362508765",
        "Kenya" : "1362509215",
        "Latvia" : "1221037511",
        "Lebanon" : "1362511155",
        "Lithuania" : "1221037371",
        "Malaysia" : "1362515675",
        "Mexico" : "1111142361",
        "Morocco" : "1362512715",
        "Netherlands" : "1266971851",
        "Nigeria" : "1362516565",
        "Norway" : "1313619885",
        "Paraguay" : "1362520135",
        "Peru" : "1362518525",
        "Philippines" : "1362518895",
        "Poland" : "1266972311",
        "Portugal" : "1362519755",
        "Romania" : "1279117071",
        "Russia" : "1116189381",
        "Saudi Arabia" : "1362521285",
        "Senegal" : "1362523075",
        "Serbia" : "1266972981",
        "Singapore" : "1313620765",
        "Slovakia" : "1266973701",
        "Slovenia" : "1362522355",
        "South Africa" : "1362528775",
        "South Korea" : "1362510315",
        "Spain" : "1116190041",
        "Sweden" : "1313620305",
        "Switzerland" : "1313617925",
        "Thailand" : "1362524475",
        "Tunisia" : "1362525375",
        "Turkey" : "1116189071",
        "UK" : "1111142221",
        "Ukraine" : "1362526495",
        "United Arab Emirates" : "1362491345",
        "United States" : "1313621735",
        "Venezuela" : "1362527605",
    };

    useEffect(() => {
        axios.get('https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/', {
            headers: {
              'X-RapidAPI-Key': 'bf5c78cbc9msh4415d574fa3a4a8p1d991ejsnafebabf153b9',
              'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com'
            }
        }
        
        )

        .then((response) => {setLabel(response?.data?.country); setCountry(countryMap[response?.data?.country])})
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }, [countryCode], [countryLabel]);

    
    

    if(isFetching && loading) return <Loader title="Loading songs around you" />;

    if(error && countryCode) return <Error />;
    
    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                Music Around
                <span className="font-black"> {countryLabel}</span>
            </h2>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.tracks?.data.map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>
    );

};

export default AroundYou;
