import store from '~/redux/store';
import { updateTokenFetchTime } from '~/redux/slices/authSlice';
import axios from 'axios';


export const getRefreshToken = async () => {
    const spotify_client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

    const refreshToken = localStorage.getItem('refreshToken');
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: spotify_client_id
      }),
    }
    const body = await fetch(url, payload);
    const response = await body.json();

    if (response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken);
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('tokenExpiresIn');
      localStorage.removeItem('tokenFetchTime');
    }

    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken);
    }
}

export const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const tokenExpiresIn = state.auth.tokenExpiresIn;
  const tokenFetchTime = state.auth.tokenFetchTime;
  const currentTime = Date.now();

  if (tokenFetchTime > 0 && tokenExpiresIn > 0) {
    if (currentTime > (tokenFetchTime + tokenExpiresIn * 1000)) {
        getRefreshToken();
        store.dispatch(updateTokenFetchTime(Date.now()));
    }
  }

  return next(action);
};

export const setAuthHeaders = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};