import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import localforage from 'localforage';
import rootReducer from './reducers';
import { checkTokenExpirationMiddleware } from '~/services/auth';

const persistConfig = {
  key: 'root',
  storage: localforage,
  whitelist: ['auth', 'library', 'my_playlist'],
  blacklist: ['someOtherReducer'],
};

// localforage.clear().then(() => {
//   console.log('Đã xóa toàn bộ dữ liệu trong localforage.');
// }).catch((err) => {
//   console.error('Lỗi khi xóa dữ liệu localforage:', err);
// });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
  .concat(checkTokenExpirationMiddleware),
});

export const persistor = persistStore(store);