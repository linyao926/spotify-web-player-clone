import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/services/api';

export const fetchTrackItemsData = createAsyncThunk(
  'trackItems/fetchTrackItemsData',
  async ({accessToken, type, id}, { rejectWithValue }) => {
    try {
        const path = type === 'artist' ? `/${type}s/${id}/top-tracks` : `/${type}s/${id}/tracks`;
        const trackItemsData = await fetchData(path, accessToken, 50);
        const result = type === 'artist' ? trackItemsData.tracks : trackItemsData.items;

        return {
            trackItemsData: result,
        };
    } catch (error) {
        return rejectWithValue(error.message);
    }
  }
);

const initialState = {
    trackItemsData: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
};

const trackItemsDataSlice = createSlice({
    name: 'track-items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTrackItemsData.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchTrackItemsData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.trackItemsData = action.payload.trackItemsData;
        })
        .addCase(fetchTrackItemsData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export const selectTrackItemsData = (state) => state['track-items'].trackItemsData;

export default trackItemsDataSlice.reducer;