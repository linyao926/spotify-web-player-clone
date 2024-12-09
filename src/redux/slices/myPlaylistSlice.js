import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('my_playlists');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error('Failed to load my playlists from localStorage:', e);
    return [];
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('my_playlists', serializedState);
  } catch (e) {
    console.error('Failed to save my playlists to localStorage:', e);
  }
};

const generateId = (index) => {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); 
  const orderPart = String(index).padStart(3, '0'); 
  return `${randomPart}${orderPart}`;
};

const myPlaylistSlice = createSlice({
  name: 'my_playlist',
  initialState: loadState(),
  reducers: {
    createPlaylist: (state) => {
      const newPlaylist = {
        id: generateId(state.length + 1),
        name: `My Playlist #${state.length + 1}`,
        type: 'playlist',
        tracks: { items: [] },
        description: '',
        'track_total': 0,
        images: {
          fallbackUrl: '',
          uploadUrl: ''
        },
        isMyPlaylist: true,
      };
      state.push(newPlaylist);
      saveState(state); 
    },

    addTrackToPlaylist: (state, action) => {
      const { playlistId, track } = action.payload;
      const playlist = state.find((p) => p.id === playlistId);
      if (playlist) {
        playlist.tracks.items.push(track.id);
        playlist.track_total += 1;
        if (playlist.tracks.items.length === 1) {
          playlist.images.fallbackUrl = track.images[0].url;
        }
        saveState(state);
      }
    },

    uploadImageToPlaylist: (state, action) => {
      const { playlistId, imageUrl } = action.payload;
      const playlist = state.find((p) => p.id === playlistId);
      if (playlist) {
        playlist.images.uploadUrl = '';
        playlist.images.uploadUrl = imageUrl;
        saveState(state);
      }
    },

    updatePlaylistDetails: (state, action) => {
      const { playlistId, name, description } = action.payload;
      const playlist = state.find((pl) => pl.id === playlistId);

      if (playlist) {
        if (name !== undefined) playlist.name = name;
        if (description !== undefined) playlist.description = description;
      }
    },
  },
});

export const { createPlaylist, addTrackToPlaylist, uploadImageToPlaylist, updatePlaylistDetails } = myPlaylistSlice.actions;
export default myPlaylistSlice.reducer;