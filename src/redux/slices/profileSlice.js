import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/services/api';

export const fetchProfileData = createAsyncThunk(
  'profile/fetchProfileData',
  async ({accessToken, endpoint = ''}, { rejectWithValue }) => {
    try {
      const profileInfo = await fetchData('/me', accessToken);
      
      const profileTopTracks = await fetchData('/me/top/tracks?time_range=short_term', accessToken);

      const profileTopArtists = await fetchData('/me/top/artists?time_range=short_term', accessToken);

      return {
        profileInfo,
        profileTopTracks,
        profileTopArtists,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  profileInfo: null,
  profileTopTracks: [],
  profileTopArtists: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profileInfo = action.payload.profileInfo;
        state.profileTopArtists = action.payload.profileTopArtists;
        state.profileTopTracks = action.payload.profileTopTracks;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectProfileInfo = (state) => state.profile.profileInfo;
export const selectProfileTopArtists = (state) => state.profile.profileTopArtists;
export const selectProfileTopTracks = (state) => state.profile.profileTopTracks;

export default profileSlice.reducer;