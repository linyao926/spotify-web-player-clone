import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, playTrack, putRequest, seekPlayback, setRepeatMode, setVolume } from '~/services/api';

export const fetchPlayer = createAsyncThunk(
  'player/fetchPlayer',
  async ({accessToken, uri = '', positionMs = 0}, { rejectWithValue }) => {
    try {
      const player = await playTrack({ token: accessToken, uri, positionMs });

      return {
        player,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPlaybackState = createAsyncThunk(
  'player/fetchPlaybackState',
  async ({accessToken}, { rejectWithValue }) => {
    try {
      const response = await fetchData('/me/player', accessToken);
      const playbackState = response;

      return {
        playbackState,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const pausePlaybackThunk = createAsyncThunk(
    'player/pausePlayback',
    async ({ token }, { rejectWithValue }) => {
      try {
        const status = await putRequest({ token, endpoint: '/me/player/pause' });
        return status;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

export const seekPlaybackThunk = createAsyncThunk(
    'player/seekPlayback',
    async ({ token, positionMs }, { rejectWithValue }) => {
      try {
        const status = await seekPlayback({ token, positionMs });
        return status;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

export const setRepeatModeThunk = createAsyncThunk(
    'player/setRepeatMode',
    async ({ token, state }, { rejectWithValue }) => {
      try {
        const status = await setRepeatMode({ token, state });
        return status;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

export const setVolumeThunk = createAsyncThunk(
    'player/setVolume',
    async ({ token, volumePercent }, { rejectWithValue }) => {
      try {
        const status = await setVolume({ token, volumePercent });
        return status;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

const initialState = {
    playbackState: {},
    status: 'idle', 
    seeking: false,
    repeatState: 'off', 
    volume: 30, 
    position_ms: 0, 
    pausePlayback: true,
    error: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchPlayer.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchPlayer.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.playbackState = action.payload.playbackState;
            state.error = null;
        })
        .addCase(fetchPlayer.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(fetchPlaybackState.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchPlaybackState.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.playbackState = action.payload.playbackState;
          state.error = null;
        })
        .addCase(fetchPlaybackState.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        // Seek Playback
        .addCase(seekPlaybackThunk.pending, (state) => {
            state.seeking = true;
            state.error = null;
        })
        .addCase(seekPlaybackThunk.fulfilled, (state) => {
            state.seeking = false;
        })
        .addCase(seekPlaybackThunk.rejected, (state, action) => {
            state.seeking = false;
            state.error = action.payload;
        })
        // Repeat Mode
        .addCase(setRepeatModeThunk.fulfilled, (state, action) => {
            state.repeatState = action.meta.arg.state;
        })
        .addCase(setRepeatModeThunk.rejected, (state, action) => {
            state.error = action.payload;
        })
        // Set Volume
        .addCase(setVolumeThunk.fulfilled, (state, action) => {
            state.volume = action.meta.arg.volumePercent;
        })
        .addCase(setVolumeThunk.rejected, (state, action) => {
            state.error = action.payload;
        })
        // Pause Playback
        .addCase(pausePlaybackThunk.fulfilled, (state, action) => {
            state.pausePlayback = true;
        })
        .addCase(pausePlaybackThunk.rejected, (state, action) => {
            state.error = action.payload;
            state.pausePlayback = false;
        });
  },
});

// export const selectProfileInfo = (state) => state.profile.profileInfo;
// export const selectProfileTopTracks = (state) => state.profile.profileTopTracks;
// export const selectProfileTopArtists = (state) => state.profile.profileTopArtists;

export default playerSlice.reducer;