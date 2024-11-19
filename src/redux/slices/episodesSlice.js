import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/api/api';

export const fetchEpisodes = createAsyncThunk('episodes/fetchEpisodes', 
    async ({accessToken, id}, { rejectWithValue }) => {
        try {
          const data = await fetchData(`episodes/${id}`, accessToken);
          return data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
    }
);

const episodesSlice = createSlice({
    name: 'episodes',
    initialState: {
        episode: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEpisodes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEpisodes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.episode = action.payload;
            })
            .addCase(fetchEpisodes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default episodesSlice.reducer;
