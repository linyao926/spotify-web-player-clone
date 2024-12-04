import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/services/api';

export const fetchPlaylistData = createAsyncThunk(
    'home/fetchPlaylistData',
    async ({accessToken, id}, { rejectWithValue }) => {
      try {
        const playlist = await fetchData(`/playlists/${id}`, accessToken, 50);
        const ownerId = playlist.owner.id;
        const relatedFirstArtistId = playlist.tracks.items[0].track.artists[0].id;
        let randomIndex = Math.floor(Math.random() * (playlist.tracks.total - 1));
        if (randomIndex == 0 && total > 1) {
          randomIndex = 1;
        }
        const relatedArtistRandomId = playlist.tracks.items[randomIndex].track.artists[0].id;
        const [
          ownerData,
          relatedFirstArtistTracks,
          relatedArtistRandomTracks,
        ] = await Promise.all([
          fetchData(`/users/${ownerId}`, accessToken),
          fetchData(`/artists/${relatedFirstArtistId}/top-tracks`, accessToken, 5),
          fetchData(`/artists/${relatedArtistRandomId}/top-tracks`, accessToken, 5),
        ]);

        return {
          playlistInfo: {
            "description": playlist.description,
            "followers": playlist.followers,
            "images": playlist.images,
            "name": playlist.name,
            "owner": ownerData,
            "id": playlist.id,
            "type": playlist.type,
            "track_total": playlist.tracks.total,
          },
          playlistItems: playlist.tracks.items,
          relatedTrack: [
            ...relatedFirstArtistTracks.tracks,
            ...relatedArtistRandomTracks.tracks,
          ]
        };
      } catch (error) {
        return rejectWithValue('Failed to fetch playlist data');
      }
    }
);

const playlistDataSlice = createSlice({
    name: 'playlist',
    initialState: {
      playlistInfo: [],
      playlistItems: [],
      relatedTrack: [],
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
          state.playlistInfo = action.payload.playlistInfo;
          state.playlistItems = action.payload.playlistItems;
          state.relatedTrack = action.payload.relatedTrack;
        })
        .addCase(fetchPlaylistData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
});

export const selectPlaylistInfo = (state) => state.playlistData.playlistInfo;
export const selectPlaylistItems = (state) => state.playlistData.playlistItems;
export const selectRelatedTrack = (state) => state.playlistData.relatedTrack;

export default playlistDataSlice.reducer;