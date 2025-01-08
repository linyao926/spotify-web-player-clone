import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTrackItemsData, fetchTrackItemsData } from '~/redux/slices/trackItemsDataSlice';
import { pausePlaybackThunk, seekPlaybackThunk, fetchPlayer } from '~/redux/slices/playerSlice';
import { 
    setQueueAndPlay, 
    playFromQueue, 
    playFromNextFrom, 
    togglePlayPause,
} from '~/redux/slices/queueSlice';

export const useQueueHandler = (props) => {
    const { 
        type = '', 
        id = '', 
        title = '', 
        coverUrl = '',
        trackId = '',
        data = [], 
        inNext = {
            nextFrom: false,
            nextQueue: false,
        },
        progress_ms,
    } = props;

    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.auth);
    const trackItems = useSelector(selectTrackItemsData);
    const queuePlaylist = useSelector((state) => state['queue'].queueData);
    const itemIsPlaying = useSelector((state) => state['queue'].itemIsPlaying);
    const nowPlaying = useSelector((state) => state['queue'].nowPlaying);

    const playPausePlayback = () => {
        if (itemIsPlaying) {
            dispatch(pausePlaybackThunk({ token: accessToken }));
        } else {
            if (accessToken && nowPlaying) {
                dispatch(fetchPlayer({
                            accessToken,
                            uri: nowPlaying.uri,
                            positionMs: progress_ms,
                        }));
            }
        }

        dispatch(togglePlayPause());
    }

    const handlePlayClick = useCallback(
        async (event) => {
            event.preventDefault();
            event.stopPropagation();

            let tracks = [];

            if (queuePlaylist && queuePlaylist.id !== id && type !== 'track' && data.length === 0 && id.length > 0) {
                try {
                    const fetchedData = await dispatch(fetchTrackItemsData({ accessToken, type, id })).unwrap();
                    tracks = [...fetchedData.trackItemsData];
                } catch (error) {
                    console.error('Error fetching track items:', error);
                    return; 
                }
            } 
            
            if (trackItems.length > 0 && queuePlaylist.id === id) {
                tracks = [...trackItems]; 
            }

            if (type === 'track') {
                tracks = [{
                    title,
                    id,
                    type,
                    coverUrl,
                }];
            }

            if (data.length > 0) {
                tracks = [...data];
            }

            const parentData = {
                title,
                id,
                time_played: new Date().toISOString(),
                type,
                coverUrl,
            };

            let startTrackId = trackId || tracks[0]?.id;

            if (inNext.nextQueue) {
                dispatch(playFromQueue({ trackId: startTrackId }));
            } else if (inNext.nextFrom) {
                dispatch(playFromNextFrom({ trackId: startTrackId }));
            } else if (queuePlaylist.id) {
                if (queuePlaylist.id === id) {
                    playPausePlayback();
                } else {
                    dispatch(setQueueAndPlay({ tracks, startTrackId, parentData }));
                }
            } else {
                dispatch(setQueueAndPlay({ tracks, startTrackId, parentData }));
            }
        },
        [accessToken, data, dispatch, id, queuePlaylist.id, title, type, coverUrl, trackId, itemIsPlaying] 
    );

    return { handlePlayClick, trackItems };
};