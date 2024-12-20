import { combineReducers } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import trackItemsDataReducer from './slices/trackItemsDataSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import positionReducer from './slices/positionSlice';
import libraryReducer from './slices/librarySlice';
import queueReducer from './slices/queueSlice';
import myPlaylistReducer from './slices/myPlaylistSlice';

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    ui: uiReducer,
    position: positionReducer,
    library: libraryReducer,
    queue: queueReducer,
    'my_playlist': myPlaylistReducer,
    'track-items': trackItemsDataReducer,
});

export default rootReducer;