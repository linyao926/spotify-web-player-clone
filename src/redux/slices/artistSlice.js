import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/services/api';

export const fetchArtistData = createAsyncThunk(
    'home/fetchArtistData',
    async ({accessToken, id}, { rejectWithValue }) => {
      try {
        const [
            artist,
            artistAlbums,
            artistTopTracks
        ] = await Promise.all([
            fetchData(`/artists/${id}`, accessToken),
            fetchData(`/artists/${id}/albums`, accessToken, 50),
            fetchData(`/artists/${id}/top-tracks`, accessToken)
        ]);
        return {
          artistInfo: artist,
          artistAlbums: artistAlbums,
          artistTopTracks: artistTopTracks,
        };
      } catch (error) {
        return rejectWithValue('Failed to fetch artist data');
      }
    }
);

const artistSlice = createSlice({
    name: 'artist',
    initialState: {
      artistInfo: [],
      artistAlbums: [],
      artistTopTracks: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchArtistData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchArtistData.fulfilled, (state, action) => {
          state.loading = false;
          state.artistInfo = action.payload.artistInfo;
          state.artistAlbums = action.payload.artistAlbums;
          state.artistTopTracks = action.payload.artistTopTracks;
        })
        .addCase(fetchArtistData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
});

export const selectArtistInfo = (state) => state.artist.artistInfo;
export const selectArtistAlbums = (state) => state.artist.artistAlbums;
export const selectArtistTopTracks = (state) => state.artist.artistTopTracks;

export default artistSlice.reducer;