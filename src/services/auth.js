import { refreshToken } from '~/redux/slices/userSlice';
import axios from 'axios';

export const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const tokenExpiresIn = state.user.tokenExpiresIn;
  const tokenFetchTime = state.user.tokenFetchTime;
  const currentTime = Date.now();

  if (tokenFetchTime > 0 && tokenExpiresIn > 0) {
    if (currentTime > (tokenFetchTime + tokenExpiresIn * 1000)) {
      store.dispatch(refreshToken());
    }
  }

  return next(action);
};

export const setAuthHeaders = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};