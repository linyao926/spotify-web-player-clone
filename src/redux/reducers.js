import { combineReducers } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import positionReducer from './slices/positionSlice';
import libraryReducer from './slices/librarySlice';
import myPlaylistReducer from './slices/myPlaylistSlice';

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    ui: uiReducer,
    position: positionReducer,
    library: libraryReducer,
    'my_playlist': myPlaylistReducer,
});

export default rootReducer;