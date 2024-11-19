import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/api/api';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (accessToken, { rejectWithValue }) => {
    try {
      const data = await fetchData('me', accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userData: null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;