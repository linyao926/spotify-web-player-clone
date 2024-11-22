import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/services/api';

export const fetchTrackData = createAsyncThunk(
  'track/fetchTrackData',
  async ({accessToken, endpoint}, { rejectWithValue }) => {
    try {
      const data = await fetchData(endpoint, accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  trackData: null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrackData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trackData = action.payload;
      })
      .addCase(fetchTrackData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectTrackData = (state) => state.track.trackData;
export default trackSlice.reducer;