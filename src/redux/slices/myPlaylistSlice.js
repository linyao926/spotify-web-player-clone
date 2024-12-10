import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const generateId = (index) => {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); 
  const orderPart = String(index).padStart(3, '0'); 
  return `${randomPart}${orderPart}`;
};

const myPlaylistSlice = createSlice({
  name: 'my_playlist',
  initialState: initialState, // Redux sẽ tự động phục hồi state từ storage

  reducers: {
    createPlaylist: (state) => {
      const newPlaylist = {
        id: generateId(state.length + 1),
        name: `My Playlist #${state.length + 1}`,
        type: 'playlist',
        tracks: { items: [] },
        description: '',
        track_total: 0,
        images: {
          fallbackUrl: '',
          uploadUrl: ''
        },
        time_added: new Date().toISOString(),
        time_played: null,
        isMyPlaylist: true,
      };
      state.push(newPlaylist); // Thêm playlist mới vào state
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
      }
    },

    uploadImageToPlaylist: (state, action) => {
      const { playlistId, imageUrl } = action.payload;
      const playlist = state.find((p) => p.id === playlistId);
      if (playlist) {
        playlist.images.uploadUrl = imageUrl;
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

export const {
  createPlaylist,
  addTrackToPlaylist,
  uploadImageToPlaylist,
  updatePlaylistDetails
} = myPlaylistSlice.actions;

export default myPlaylistSlice.reducer;