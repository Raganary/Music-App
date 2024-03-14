import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

/*
//removed once baseQuery and headers are set in createAPI
const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'bf5c78cbc9msh4415d574fa3a4a8p1d991ejsnafebabf153b9',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };
  
  fetch('https://deezerdevs-deezer.p.rapidapi.com/playlist/1313621735', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
*/

export const deezerCoreApi = createApi({
  reducerPath: 'deezerCoreApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://deezerdevs-deezer.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'bf5c78cbc9msh4415d574fa3a4a8p1d991ejsnafebabf153b9')

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({query: () => '/playlist/1313621735/'}),
    //need to find lyrics and fix detail header
    getSongsByGenre: builder.query({query: (genre) => `/playlist/${genre}/`}),

    getSongDetails: builder.query({query: (songid) => `/track/${songid}`}),
    
    getSongRelated: builder.query({query: (songid) => `${songid}`}),

    getArtistDetails: builder.query({query:(artistId) => `/artist/${artistId}`}),

    getSongsByCountry: builder.query({ query:(countryCode) => `/playlist/${countryCode}`}),
    //allows to use url and params when there are more than just url with a value
    getSongsBySearch: builder.query({query: (searchTerm) => ({ url: '/search', params: {q: searchTerm } })}),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
} = deezerCoreApi;