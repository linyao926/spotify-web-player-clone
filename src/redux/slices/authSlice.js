import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  return {
    accessToken: '',         
    refreshToken: null,      
    tokenExpiresIn: 0,       
    tokenFetchTime: 0,       
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
    },

    updateTokenFetchTime: (state) => {
      state.tokenFetchTime = Date.now();
    },

    logout: (state) => {
      state.accessToken = '';
      state.refreshToken = null;
      state.tokenExpiresIn = 0;
      state.tokenFetchTime = 0;
    },
  },
});

export const { setTokens, updateTokenFetchTime, logout } = authSlice.actions;
export default authSlice.reducer;