import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import localforage from 'localforage';
import rootReducer from './reducers';
// import myPlaylistReducer from './slices/myPlaylistSlice';
// import libraryReducer from './slices/librarySlice';
// import { updateLibrary } from './slices/librarySlice';
import { checkTokenExpirationMiddleware } from '~/services/auth';

const persistConfig = {
  key: 'root',
  storage: localforage,
  whitelist: ['auth', 'library', 'my_playlist'], // Chỉ lưu 'library' và 'myPlaylist'
  blacklist: ['someOtherReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const listenerMiddleware = createListenerMiddleware();

// listenerMiddleware.startListening({
//   actionCreator: myPlaylistReducer.actions.updatePlaylist,
//   effect: (action, listenerApi) => {
//     const state = listenerApi.getState(); 
//     listenerApi.dispatch(updateLibrary(state.myPlaylists)); 
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
  // .prepend(listenerMiddleware.middleware)
  .concat(checkTokenExpirationMiddleware),
});

export const persistor = persistStore(store);