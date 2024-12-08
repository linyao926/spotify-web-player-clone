import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '~/services/api';

export const fetchProfileData = createAsyncThunk(
  'profile/fetchProfileData',
  async ({accessToken, endpoint = ''}, { rejectWithValue }) => {
    try {
      const profileInfo = await fetchData('/me', accessToken);

      return {
        profileInfo,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  profileInfo: null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profileInfo = action.payload.profileInfo;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectProfileInfo = (state) => state.profile.profileInfo;

export default profileSlice.reducer;