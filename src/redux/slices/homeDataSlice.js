import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/services/api';

export const fetchHomeData = createAsyncThunk(
    'home/fetchHomeData',
    async (accessToken, { rejectWithValue }) => {
      try {
        const [
          recentlyPlayed,
          recommendedToday,
          popularplaylist,
          newReleases,
          topArtists,
          topTracks
        ] = await Promise.all([
          fetchData('/me/player/recently-played', accessToken),
          fetchData('/recommendations?seed_genres=pop', accessToken),
          fetchData('/browse/featured-playlists', accessToken),
          fetchData('/browse/new-releases', accessToken),
          fetchData('/me/top/artists', accessToken, 2), 
          fetchData('/me/top/tracks', accessToken, 2)
        ]);
  
        return {
          recentlyPlayed: recentlyPlayed.items,
          recommendedToday: recommendedToday.tracks,
          popularplaylist: popularplaylist.playlists.items,
          newReleases: newReleases.albums.items,
          topArtists: topArtists.items,  // Trả về top artists
          topTracks: topTracks.items   
        };
      } catch (error) {
        return rejectWithValue('Failed to fetch home data');
      }
    }
);

const homeSlice = createSlice({
    name: 'home',
    initialState: {
      recentlyPlayed: [],
      recommendedToday: [],
      popularplaylist: [],
      newReleases: [],
      topArtists: [],
      topTracks: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchHomeData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchHomeData.fulfilled, (state, action) => {
          state.loading = false;
          state.recentlyPlayed = action.payload.recentlyPlayed;
          state.recommendedToday = action.payload.recommendedToday;
          state.popularplaylist = action.payload.popularplaylist;
          state.newReleases = action.payload.newReleases;
          state.topArtists = action.payload.topArtists;
          state.topTracks = action.payload.topTracks;
        })
        .addCase(fetchHomeData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
export const selectRecentlyPlayed = (state) => state.home.recentlyPlayed;
export const selectRecommendedToday = (state) => state.home.recommendedToday;
export const selectPopularPlaylist = (state) => state.home.popularplaylist;
export const selectNewReleases = (state) => state.home.newReleases;
export const selectTopArtists = (state) => state.home.topArtists;
export const selectTopTracks = (state) => state.home.topTracks;

export default homeSlice.reducer;