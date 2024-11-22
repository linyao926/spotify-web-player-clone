import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/services/api';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async ({accessToken, endpoint = ''}, { rejectWithValue }) => {
    try {
      const userInfo = await fetchData('/me', accessToken);
      
      // const userPlaylists = await fetchData('/me/playlists', accessToken);
      
      // const savedTracks = await fetchData('/me/tracks', accessToken);
      
      // const savedAlbums = await fetchData('/me/albums', accessToken);

      return {
        userInfo,
        // userPlaylists,
        // savedTracks,
        // savedAlbums,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userInfo: null,
  userPlaylists: [],
  savedTracks: [],
  savedAlbums: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectUserInfo = (state) => state.user.userInfo;
// export const selectUserPlaylists = (state) => state.user.userPlaylists;
// export const selectSavedTracks = (state) => state.user.savedTracks;
// export const selectSavedAlbums = (state) => state.user.savedAlbums;
export default userSlice.reducer;