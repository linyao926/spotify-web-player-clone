import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

const authSlice = createSlice({
  name: 'auth',

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

    updateTokenFetchTime: (state, action) => {
      state.tokenFetchTime = Date.now();

      localStorage.setItem('tokenFetchTime', Date.now().toString());
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
  // extraReducers: (builder) => {
  //   builder.addCase(refreshTokenFunction.fulfilled, (state, action) => {
  //     state.accessToken = action.payload;
  //   });
  // },
});

export const { setTokens, updateTokenFetchTime, logout } = authSlice.actions;
export default authSlice.reducer;