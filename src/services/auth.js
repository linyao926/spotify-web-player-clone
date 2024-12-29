import { store } from '~/redux/store';
import { 
  setTokens, 
  logout 
} from '~/redux/slices/authSlice';

export const getAccessToken = async () => {
    const spotify_client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const spotify_client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    const basicAuth = btoa(`${spotify_client_id}:${spotify_client_secret}`);

    const state = store.getState();
    const refreshToken = state.auth.refreshToken;
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: spotify_client_id,
      }),
    }

    const body = await fetch(url, payload);
    const response = await body.json();

    if (response.error) {
      throw new Error(response.error_description || 'Error refreshing token');
    }

    return {
      accessToken: response.access_token || '',
      refreshToken: response.refresh_token || refreshToken,
      expiresIn: response.expires_in
    };
}

export const checkTokenExpirationMiddleware = (store) => (next) => async (action) => {
  const state = store.getState();
  const tokenExpiresIn = state.auth.tokenExpiresIn;
  const tokenFetchTime = state.auth.tokenFetchTime;
  const currentTime = Date.now();

  if (tokenFetchTime > 0 && tokenExpiresIn > 0) {
    if (currentTime > (tokenFetchTime + tokenExpiresIn * 1000)) {
      try {
        const {accessToken, refreshToken, expiresIn} = await getAccessToken();
        store.dispatch(setTokens({accessToken, refreshToken, expiresIn}));
      } catch (error) {
        store.dispatch(logout());
      }
    }
  }

  return next(action);
};