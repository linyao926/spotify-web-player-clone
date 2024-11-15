import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const refreshToken = createAsyncThunk(
  '/refresh_token',
  async (_, { getState, dispatch }) => {
    const refreshToken = getState().auth.refreshToken;
    const response = await axios.post('/refresh_token', { refreshToken });
    const { accessToken, expiresIn } = response.data;

    dispatch(updateAccessToken({ accessToken, expiresIn }));

    return accessToken;
  }
);

const getInitialState = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const tokenExpiresIn = localStorage.getItem('tokenExpiresIn');
  const tokenFetchTime = localStorage.getItem('tokenFetchTime');

  return {
    accessToken: accessToken || null,
    refreshToken: refreshToken || null,
    tokenExpiresIn: tokenExpiresIn ? parseInt(tokenExpiresIn) : 0,
    tokenFetchTime: tokenFetchTime ? parseInt(tokenFetchTime) : 0,
  };
};

const userSlice = createSlice({
  name: 'user',

  initialState: getInitialState(),

  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.tokenExpiresIn = action.payload.expiresIn;
      state.tokenFetchTime = Date.now();

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('tokenExpiresIn', action.payload.expiresIn);
      localStorage.setItem('tokenFetchTime', Date.now().toString());
    },

    updateAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.tokenExpiresIn = action.payload.expiresIn;

      localStorage.setItem('accessToken', action.payload.accessToken);
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.tokenExpiresIn = 0;
      state.tokenFetchTime = 0;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('tokenExpiresIn');
      localStorage.removeItem('tokenFetchTime');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.accessToken = action.payload;
    });
  },
});

export const { setTokens, updateAccessToken, logout } = userSlice.actions;
export default userSlice.reducer;