import { configureStore } from '@reduxjs/toolkit';

import homeReducer from './slices/homeDataSlice';
import browseReducer from './slices/browseDataSlice';
import albumReducer from './slices/albumSlice';
import artistReducer from './slices/artistSlice';
import playlistDataReducer from './slices/playlistDataSlice';
import trackSliceReducer from './slices/trackSlice';

import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import positionReducer from './slices/positionSlice';
import episodesReducer from './slices/episodesSlice';
// import trackReducer from './slices/trackSlice';
// import nowPlayingReducer from './slices/nowPlayingSlice';
import { checkTokenExpirationMiddleware } from '~/services/auth';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    browse: browseReducer,
    album: albumReducer,
    artist: artistReducer,
    playlistData: playlistDataReducer,
    track: trackSliceReducer,
    user: userReducer,
    auth: authReducer,
    ui: uiReducer,
    position: positionReducer,
    // episodes: episodesReducer,
    // track: trackReducer,
    // nowPlaying: nowPlayingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(checkTokenExpirationMiddleware),
});

export default store;