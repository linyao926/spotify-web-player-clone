import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/services/api';

export const fetchBrowseData = createAsyncThunk(
    'home/fetchBrowseData',
    async (accessToken, { rejectWithValue }) => {
      try {
        const browse = await fetchData('/browse/categories', accessToken, 50);
        return {browse: browse};
      } catch (error) {
        return rejectWithValue('Failed to fetch home data');
      }
    }
);

const browseSlice = createSlice({
    name: 'browse',
    initialState: {
      browseData: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchBrowseData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchBrowseData.fulfilled, (state, action) => {
          state.loading = false;
          state.browseData = action.payload.browse;
        })
        .addCase(fetchBrowseData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
export const selectBrowseData = (state) => state.browse.browseData;

export default browseSlice.reducer;