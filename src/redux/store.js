import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import uiReducer from './slices/uiSlice';
import positionReducer from './slices/positionSlice';
// import playlistReducer from './slices/playlistSlice';
// import trackReducer from './slices/trackSlice';
// import nowPlayingReducer from './slices/nowPlayingSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    position: positionReducer,
    // playlist: playlistReducer,
    // track: trackReducer,
    // nowPlaying: nowPlayingReducer,
  },
});

export default store;