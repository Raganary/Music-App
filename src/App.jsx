import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { FiUser, FiLogIn  } from 'react-icons/fi';

import { Searchbar, Sidebar, MusicPlayer, TopPlay, Login, ProfileCard, Registration } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './pages';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  const { activeUser } = useSelector((state) => state.user);

  const [openProfile, setOpenProfile] = useState(false);
  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-[#000000]">
        <div className='flex'>
          <Searchbar />
          <div className='absolute top-6 right-14 xl:right-6 xl:top-5'>

            {activeUser?.name ? (
              <div> 
                <FiUser className='text-white absolutecursor-pointer w-6 h-6' onClick={() => setOpenProfile((prev)=>!prev)}/>
                {openProfile && <ProfileCard />}
              </div>
            ) : (
              <div> 
                <FiLogIn className='text-white absolutecursor-pointer w-6 h-6' onClick={() => setOpenProfile((prev)=>!prev)}/> 
                {openProfile && <Login/>}
              </div>
            )}

          </div>

        </div>

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artist/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
          
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute h-20 bottom-0 left-0 right-0 flex animate-slideup bg-[#2d2d2d] backdrop-blur-lg bg-opacity-50
         z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
