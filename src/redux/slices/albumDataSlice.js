import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/services/api';

export const fetchAlbumData = createAsyncThunk(
  'albumData/fetchAlbumData',
  async ({accessToken, id}, { rejectWithValue }) => {
    try {
        const albumData = await fetchData(`/albums/${id}`, accessToken);
        return {
            albumData: albumData,
        };
    } catch (error) {
        return rejectWithValue(error.message);
    }
  }
);

const initialState = {
    albumData: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
};

const albumDataSlice = createSlice({
    name: 'album-data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAlbumData.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAlbumData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.albumData = action.payload.albumData;
        })
        .addCase(fetchAlbumData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export const selectAlbumData = (state) => state['album-data'].albumData;

export default albumDataSlice.reducer;