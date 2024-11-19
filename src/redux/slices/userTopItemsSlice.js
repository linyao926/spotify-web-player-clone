import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/api/api';

export const fetchUserTopItems = createAsyncThunk('userTopItems/fetchUserTopItems', 
    async ({accessToken, type}, { rejectWithValue }) => {
        try {
          const data = await fetchData(`top/${type}`, accessToken);
          return data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
    }
);

const userTopItemsSlice = createSlice({
    name: 'userTopItems',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserTopItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserTopItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.items;
            })
            .addCase(fetchUserTopItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default userTopItemsSlice.reducer;
