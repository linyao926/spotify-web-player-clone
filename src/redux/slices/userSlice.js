import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  isLoggedIn: false,
  loginError: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      loginSuccess: (state, action) => {
        state.userInfo = action.payload;
        state.isLoggedIn = true;
        state.loginError = null;
      },
      loginFailure: (state, action) => {
        state.userInfo = null;
        state.isLoggedIn = false;
        state.loginError = action.payload;
      },
      logout: (state) => {
        state.userInfo = null;
        state.isLoggedIn = false;
      },
    },
  });
  
export const { loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;