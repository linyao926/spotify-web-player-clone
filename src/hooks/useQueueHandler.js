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

    const handlePlayClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        let tracks = [];
        if (type !== 'track' && data.length === 0 && id.length > 0 && !trackItems.length) {
            try {
                await dispatch(fetchTrackItemsData({ accessToken, type, id })).unwrap();
            } catch (error) {
                console.error('Error fetching track items:', error);
            }
        }

        if (trackItems.length > 0) {
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
    };

    return { handlePlayClick, trackItems };
};