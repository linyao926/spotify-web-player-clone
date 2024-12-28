import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: null,        
  nextFrom: [],            
  nextQueue: [],  
  previousQueue: [],
  queueData: {},   
  itemIsPlaying: false, 
  isShuffle: false, 
  isRepeat: false,      
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
      state.isRepeat = !state.isRepeat; 
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

      state.itemIsPlaying = true; 
      state.nextQueue = []; 
    },
    addToQueue(state, action) {
      const { tracks } = action.payload;
      state.nextQueue = [...state.nextQueue, ...tracks];
    },
    playFromQueue(state, action) {
      const { trackIndex } = action.payload;

      const newNowPlaying = state.nextQueue[trackIndex];

      if (newNowPlaying) {
        state.nowPlaying = newNowPlaying;
        state.nextQueue = state.nextQueue.slice(trackIndex + 1); 
      }
    },
    playFromNextFrom(state, action) {
      const { trackIndex } = action.payload;

      const newNowPlaying = state.nextFrom[trackIndex];
      const removedTracks = state.nextFrom.slice(0, trackIndex);

      if (newNowPlaying) {
        if (shouldAddToPreviousQueue(state.nowPlaying, state.previousQueue, state.nextFrom, state.queueData.tracks)) {
            state.previousQueue = [...state.previousQueue, state.nowPlaying, ...removedTracks]; 
        } else {
            state.previousQueue = [...state.previousQueue, ...removedTracks]; 
        }
        state.nowPlaying = newNowPlaying;
        state.nextFrom = state.nextFrom.slice(trackIndex + 1); 
      }
    },
    playPrevious(state) {
      if (state.previousQueue.length > 0) {
        const lastPlayed = state.previousQueue.pop(); 
        state.nextFrom = [state.nowPlaying, ...state.nextFrom]; 
        state.nowPlaying = lastPlayed; 
      }
    },
    playNext(state) {
      if (state.nextQueue.length > 0) {
        const nextTrack = state.nextQueue.shift(); 
        state.nowPlaying = nextTrack; 
      } else if (state.nextFrom.length > 0) {
        const nextTrack = state.nextFrom.shift(); 
        state.previousQueue.push(state.nowPlaying); 
        state.nowPlaying = nextTrack; 
      }
    },
  },
});

export const { togglePlayPause, toggleShuffle, setQueueAndPlay, addToQueue, playFromQueue, playFromNextFrom, playPrevious, playNext } = queueSlice.actions;

export default queueSlice.reducer;
