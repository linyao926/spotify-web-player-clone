import { configureStore } from '@reduxjs/toolkit';

import homeReducer from './slices/homeDataSlice';

import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import positionReducer from './slices/positionSlice';
import trackSliceReducer from './slices/trackSlice';
import episodesReducer from './slices/episodesSlice';
// import playlistReducer from './slices/playlistSlice';
// import trackReducer from './slices/trackSlice';
// import nowPlayingReducer from './slices/nowPlayingSlice';
import { checkTokenExpirationMiddleware } from '~/services/auth';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    user: userReducer,
    auth: authReducer,
    ui: uiReducer,
    position: positionReducer,
    track: trackSliceReducer,
    episodes: episodesReducer,
    // playlist: playlistReducer,
    // track: trackReducer,
    // nowPlaying: nowPlayingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(checkTokenExpirationMiddleware),
});

export default store;