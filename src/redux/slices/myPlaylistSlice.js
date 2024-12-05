import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/services/api';

export const fetchMyPlaylistData = createAsyncThunk(
  'myplaylist/fetchMyPlaylistData',
  async ({accessToken, endpoint = ''}, { rejectWithValue }) => {
    try {
    //   const myplaylistInfo = await fetchData('/me', accessToken);

      return {
        // myplaylistInfo,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  myPlaylistInfo: {
    name: '',
    id: ``
  },
  myPlaylistTracks: [], 
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const myplaylistSlice = createSlice({
  name: 'my_playlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyPlaylistData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyPlaylistData.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(fetchMyPlaylistData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectMyPlaylistInfo = (state) => state.myplaylist.myPlaylistInfo;

export default myplaylistSlice.reducer;