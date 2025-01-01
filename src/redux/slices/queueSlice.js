import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: null,        
  nextFrom: [],            
  nextQueue: [],  
  previousQueue: [],
  queueData: {},   
  itemIsPlaying: false, 
  isShuffle: false, 
  repeatMode: 0,      
};

function shouldAddToPreviousQueue(nowPlaying, previousQueue, nextFrom, queueData) {
  const isInPreviousQueue = previousQueue.some(track => track.id === nowPlaying.id);
  const isInNextFrom = nextFrom.some(track => track.id === nowPlaying.id);
  const isInQueueData = queueData.some(track => track.id === nowPlaying.id);

  return !isInPreviousQueue && !isInNextFrom && isInQueueData;
};

function shuffleTracks(tracks) {
  const shuffledTracks = [...tracks];
  for (let i = shuffledTracks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledTracks[i], shuffledTracks[j]] = [shuffledTracks[j], shuffledTracks[i]];
  }
  return shuffledTracks;
};

const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    togglePlayPause(state) {
      state.itemIsPlaying = !state.itemIsPlaying; 
    },
    toggleShuffle(state) {
      state.isShuffle = !state.isShuffle; 
      if (state.isShuffle) {
        const shuffledNextFrom = shuffleTracks(state.nextFrom);
        const currentTrackIndex = shuffledNextFrom.findIndex(track => track.id === state.nowPlaying.id);

        state.nowPlaying = state.nowPlaying;

        state.nextFrom = shuffledNextFrom.slice(0, currentTrackIndex).concat([state.nowPlaying]).concat(shuffledNextFrom.slice(currentTrackIndex + 1));
      } else {
        state.nextFrom = [...state.queueData.tracks];
      }
    },
    toggleRepeat(state) {
      // 0: off, 1: repeat all, 2: repeat one
      state.repeatMode = (state.repeatMode + 1) % 3;
    },
    setQueueAndPlay(state, action) {
      const { tracks, startTrackId, parentData } = action.payload;
      const startIndex = tracks.findIndex((track) => track.id === startTrackId);

      if (startIndex !== -1) {
        state.nowPlaying = tracks[startIndex];
        state.nextFrom = tracks.slice(startIndex + 1);
        state.previousQueue = tracks.slice(0, startIndex);
        state.queueData = { tracks: [...tracks]}; 
      }

      if (parentData) {
        state.queueData = { tracks: [...tracks], ...parentData };
      }

      state.nextQueue = []; 
    },
    addToQueue(state, action) {
      const { tracks } = action.payload;
      state.nextQueue = [...state.nextQueue, ...tracks];
    },
    playFromQueue(state, action) {
      const { trackId } = action.payload;
      const trackIndex = state.nextQueue.findIndex((track) => track.id === trackId);

      const newNowPlaying = state.nextQueue[trackIndex];

      if (newNowPlaying) {
        state.nowPlaying = newNowPlaying;
        state.nextQueue = state.nextQueue.slice(trackIndex + 1); 
      }
    },
    playFromNextFrom(state, action) {
      const { trackId } = action.payload;
      const trackIndex = state.nextFrom.findIndex((track) => track.id === trackId);

      const newNowPlaying = state.nextFrom[trackIndex];

      if (newNowPlaying) {
        state.previousQueue = [
          ...state.previousQueue,
          ...(shouldAddToPreviousQueue(state.nowPlaying, state.previousQueue, state.nextFrom, state.queueData.tracks) ? [state.nowPlaying] : []),
          ...state.nextFrom.slice(0, trackIndex),
        ];
        state.nowPlaying = newNowPlaying;
        state.nextFrom = state.nextFrom.slice(trackIndex + 1); 
      }
    },
    playPrevious(state) {
      if (state.previousQueue.length > 0) {
        state.nextFrom.unshift(state.nowPlaying);
        state.nowPlaying = state.previousQueue.pop();
      }
    },
    playNext(state) {
      if (state.nextQueue.length > 0) {
        const nextTrack = state.nextQueue.shift(); 
        state.previousQueue = [
          ...state.previousQueue,
          ...(shouldAddToPreviousQueue(state.nowPlaying, state.previousQueue, state.nextFrom, state.queueData.tracks) ? [state.nowPlaying] : []),
        ];
        state.nowPlaying = nextTrack; 
      } else if (state.nextFrom.length > 0) {
        const nextTrack = state.nextFrom.shift(); 
        state.previousQueue = [
          ...state.previousQueue,
          ...(shouldAddToPreviousQueue(state.nowPlaying, state.previousQueue, state.nextFrom, state.queueData.tracks) ? [state.nowPlaying] : []),
          ...state.nextFrom.slice(0, 0),
        ]; 
        state.nowPlaying = nextTrack; 
      }
    },
  },
});

export const { 
  togglePlayPause, 
  toggleShuffle, 
  toggleRepeat, 
  setQueueAndPlay,
  addToQueue, 
  playFromQueue, 
  playFromNextFrom, 
  playPrevious, 
  playNext 
} = queueSlice.actions;

export default queueSlice.reducer;
