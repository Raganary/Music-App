import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import userReducer from './features/userSlice';
import { deezerCoreApi } from './services/deezerCore';
import { useReducer } from 'react';

export const store = configureStore({
  reducer: {
    [deezerCoreApi.reducerPath]: deezerCoreApi.reducer,
    player: playerReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(deezerCoreApi.middleware)
});
