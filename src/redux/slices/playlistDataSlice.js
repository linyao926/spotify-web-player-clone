import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/services/api';

export const fetchPlaylistData = createAsyncThunk(
    'home/fetchPlaylistData',
    async ({accessToken, id}, { rejectWithValue }) => {
      try {
        const playlistItems = await fetchData(`/playlists/${id}/tracks`, accessToken, 50);
        return {playlistItems: playlistItems.items};
      } catch (error) {
        return rejectWithValue('Failed to fetch home data');
      }
    }
);

const playlistDataSlice = createSlice({
    name: 'playlist',
    initialState: {
      playlistItems: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPlaylistData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchPlaylistData.fulfilled, (state, action) => {
          state.loading = false;
          state.playlistItems = action.payload.playlistItems;
        })
        .addCase(fetchPlaylistData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
export const selectPlaylistItems = (state) => state.playlistData.playlistItems;

export default playlistDataSlice.reducer;