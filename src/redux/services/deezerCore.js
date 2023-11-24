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
    baseUrl: 'https://deezerdevs-deezer.p.rapidapi.com/playlist',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'bf5c78cbc9msh4415d574fa3a4a8p1d991ejsnafebabf153b9')

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({query: () => '/1313621735'})
  }),
});

export const {
  useGetTopChartsQuery,
} = deezerCoreApi;