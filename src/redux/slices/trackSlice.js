import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/services/api';

export const fetchTrackData = createAsyncThunk(
    'home/fetchTrackData',
    async ({accessToken, id}, { rejectWithValue }) => {
      try {
        const track = await fetchData(`/tracks/${id}`, accessToken);
        const artistId = track.artists[0].id;
        const albumId = track.album.id;
        const album = await fetchData(`/albums/${albumId}`, accessToken);
        
        const [
          artist,
          artistAlbums,
          artistSingles,
          artistTopTracks
        ] = await Promise.all([
            fetchData(`/artists/${artistId}`, accessToken),
            fetchData(`/artists/${artistId}/albums?include_groups=album`, accessToken, 50),
            fetchData(`/artists/${artistId}/albums?include_groups=single`, accessToken, 50),
            fetchData(`/artists/${artistId}/top-tracks`, accessToken)
        ]);

        return {
          trackInfo: track,
          trackArtist: artist,
          album: album,
          artistAlbums: artistAlbums,
          artistSingles: artistSingles,
          artistTopTracks: artistTopTracks,
        };
      } catch (error) {
        return rejectWithValue('Failed to fetch track data');
      }
    }
);

const trackSlice = createSlice({
    name: 'track',
    initialState: {
      trackInfo: [],
      trackArtist: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTrackData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTrackData.fulfilled, (state, action) => {
          state.loading = false;
          state.trackInfo = action.payload.trackInfo;
          state.trackArtist = action.payload.trackArtist;
        })
        .addCase(fetchTrackData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
});

export const selectTrackInfo = (state) => state.track.trackInfo;
export const selectTrackArtist = (state) => state.track.trackArtist;

export default trackSlice.reducer;