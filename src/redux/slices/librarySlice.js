import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playlists: [],
  albums: [],
  artists: [],
  likedTracks: [],
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addToLibrary: (state, action) => {
      const { type, item } = action.payload; // type: 'playlist' | 'album' | 'artist'
      if (state[type]) {
        const exists = state[type].some((i) => i.id === item.id);
        if (!exists) {
          state[type].push(item);
        }
      }
    },
    removeFromLibrary: (state, action) => {
      const { type, id } = action.payload;
      state[type] = state[type].filter((item) => item.id !== id);
    },
    addToLikedTracks: (state, action) => {
      const track = action.payload;
      const exists = state.likedTracks.some((t) => t.id === track.id);
      if (!exists) {
        state.likedTracks.push(track);
      }
    },
    removeFromLikedTracks: (state, action) => {
      const trackId = action.payload;
      state.likedTracks = state.likedTracks.filter((t) => t.id !== trackId);
    },
  },
});

export const {
  addToLibrary,
  removeFromLibrary,
  addToLikedTracks,
  removeFromLikedTracks,
} = librarySlice.actions;

export default librarySlice.reducer;