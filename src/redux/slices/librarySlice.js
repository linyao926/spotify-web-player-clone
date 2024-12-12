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
    updateLibraryItem: (state, action) => {
      const { type, item } = action.payload;
      console.log(item)
      if (type === 'playlists') {
        const index = state.playlists.findIndex((i) => i.id === item.id);
        if (index !== -1) {
          let result;
          if (item.url) {
            result = {
              images: {
                ...state.playlists[index].images,
                uploadUrl: item.url,
              }
            }
          } else {
            result = {...item}
          }
          state.playlists[index] = { ...state.playlists[index], ...result }; 
          console.log(state.playlists[index])
        }
      }
    },
  },
});

export const {
  addToLibrary,
  removeFromLibrary,
  addToLikedTracks,
  removeFromLikedTracks,
  updateLibraryItem,
} = librarySlice.actions;

export default librarySlice.reducer;