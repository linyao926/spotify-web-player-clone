import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/services/api';

export const fetchAlbumData = createAsyncThunk(
    'home/fetchAlbumData',
    async ({accessToken, id}, { rejectWithValue }) => {
      try {
        const album = await fetchData(`/albums/${id}`, accessToken, 50);
        const relatedArtistId = album.artists[0].id;
        const artist = await fetchData(`/artists/${relatedArtistId}`, accessToken);
        const relatedArtistTracks = await fetchData(`/artists/${relatedArtistId}/top-tracks`, accessToken);

        const albumItems = [...album.tracks.items];

        albumItems.forEach(item => {
          item.album = {
            images: album.images,
            name: album.name
          }
        });

        return {
          albumInfo: {
            "images": album.images,
            "name": album.name,
            "release_date": album["release_date"],
            "artists": artist,
            "id": album.id,
            "type": album.type,
            "album_type": album["album_type"],
            "track_total": album['total_tracks'],
          },
          albumItems: album.tracks.items,
          relatedTrack: relatedArtistTracks,
        };
      } catch (error) {
        return rejectWithValue('Failed to fetch album data');
      }
    }
);

const albumSlice = createSlice({
    name: 'album',
    initialState: {
      albumInfo: [],
      albumItems: [],
      relatedTrack: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAlbumData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAlbumData.fulfilled, (state, action) => {
          state.loading = false;
          state.albumInfo = action.payload.albumInfo;
          state.albumItems = action.payload.albumItems;
          state.relatedTrack = action.payload.relatedTrack;
        })
        .addCase(fetchAlbumData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
});

export const selectAlbumInfo = (state) => state.album.albumInfo;
export const selectAlbumItems = (state) => state.album.albumItems;
export const selectRelatedTrack = (state) => state.album.relatedTrack;

export default albumSlice.reducer;