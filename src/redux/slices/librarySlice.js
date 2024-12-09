import { createSlice } from '@reduxjs/toolkit';

const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error(`Failed to load ${key} from localStorage`, e);
    return [];
  }
};

const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.error(`Failed to save ${key} to localStorage`, e);
  }
};

const librarySlice = createSlice({
  name: 'library',
  initialState: {
    playlists: loadState('library_playlists'),
    albums: loadState('library_albums'),
    artists: loadState('library_artists'),
    likedTracks: loadState('liked_tracks'),
  },
  reducers: {
    addToLibrary: (state, action) => {
      const { type, item } = action.payload; // type: 'playlist' | 'album' | 'artist'
      if (state[type]) {
        const exists = state[type].some((i) => i.id === item.id);
        if (!exists) {
          state[type].push(item);
          saveState(`library_${type}`, state[type]);
        }
      }
    },
    removeFromLibrary: (state, action) => {
      const { type, id } = action.payload;
      state[type] = state[type].filter((item) => item.id !== id);
      saveState(`library_${type}`, state[type]);
    },
    addToLikedTracks: (state, action) => {
      const track = action.payload;
      const exists = state.likedTracks.some((t) => t.id === track.id);
      if (!exists) {
        state.likedTracks.push(track);
        saveState('liked_tracks', state.likedTracks);
      }
    },
    removeFromLikedTracks: (state, action) => {
      const trackId = action.payload;
      state.likedTracks = state.likedTracks.filter((t) => t.id !== trackId);
      saveState('liked_tracks', state.likedTracks);
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