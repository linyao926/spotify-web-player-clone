import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import positionReducer from './slices/positionSlice';
// import nowPlayingReducer from './slices/nowPlayingSlice';
import { checkTokenExpirationMiddleware } from '~/services/auth';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
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
export const getState = store.getState;