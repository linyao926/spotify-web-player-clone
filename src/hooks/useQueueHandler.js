import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTrackItemsData, fetchTrackItemsData } from '~/redux/slices/trackItemsDataSlice';
import { setQueueAndPlay, togglePlayPause } from '~/redux/slices/queueSlice';

export const useQueueHandler = (props) => {
    const { 
        type, 
        id, 
        title, 
        coverUrl,
        trackId,
        data = [], 
    } = props;

    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.auth);
    const trackItems = useSelector(selectTrackItemsData);
    const queuePlaylist = useSelector((state) => state['queue'].queueData);

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

            if (queuePlaylist.id) {
                if (queuePlaylist.id === id) {
                    dispatch(togglePlayPause());
                } else {
                    dispatch(setQueueAndPlay({ tracks, startTrackId, parentData }));
                }
            } else {
                dispatch(setQueueAndPlay({ tracks, startTrackId, parentData }));
            }
        },
        [accessToken, data, dispatch, id, queuePlaylist.id, title, type, coverUrl, trackId] 
    );

    return { handlePlayClick, trackItems };
};