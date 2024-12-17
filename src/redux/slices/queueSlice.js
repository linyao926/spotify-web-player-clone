import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: null,        
  nextFrom: [],            
  nextQueue: [],           
};

const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    setPlaylist(state, action) {
      const { tracks, startTrackId } = action.payload;
      const startIndex = tracks.findIndex((track) => track.id === startTrackId);
      state.nowPlaying = tracks[startIndex];
      state.nextFrom = tracks.slice(startIndex + 1);
      state.nextQueue = [];
    },
    addToQueue(state, action) {
      const { tracks } = action.payload;
      state.nextQueue = [...state.nextQueue, ...tracks];
    },
    playFromQueue(state, action) {
      const { trackIndex } = action.payload;

      const newNowPlaying = state.nextFrom[trackIndex];

      if (newNowPlaying) {
        state.nowPlaying = newNowPlaying;
        state.nextFrom = state.nextFrom.slice(trackIndex + 1);
      }
    },
  },
});

export const { setPlaylist, addToQueue, playFromQueue } = queueSlice.actions;

export default queueSlice.reducer;
