import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { 
    fetchPlaylistData, 
    selectPlaylistItems
} from '~/redux/slices/playlistDataSlice';
import { 
    PlaylistFallbackIcon,
} from '~/assets/icons';
import MediaDetailLayout from '~/layouts/MediaDetailLayout';
import TrackListSection from '~/components/TrackListSection/TrackListSection';
import { contentScrollHandler } from '~/utils/eventHandler';
// import classNames from 'classnames/bind';
// import styles from '~/styles/pages/Search.module.scss';

// const cx = classNames.bind(styles);

function Playlist(props) {
    const {
        viewAs = 'list',
    } = props;

    const [isFixed, setIsFixed] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const dispatch = useDispatch(); 
    const { accessToken } = useSelector((state) => state.auth);
    const playlistItems = useSelector(selectPlaylistItems);

    const mediaLayoutRef = useRef(null);
    const childRef = useRef(null);

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchPlaylistData({
                accessToken, 
                id: '6AtpvRxDKuY1TzM5P2dXFG'
            }));
        }
    }, [accessToken, dispatch]);
    
    const handleScroll = (scrollY) => contentScrollHandler(scrollY, mediaLayoutRef, childRef, setIsFixed, setIsVisible);

    return (
        <MediaDetailLayout
            coverUrl = ''
            coverFallback = {<PlaylistFallbackIcon />}
            type = 'playlist'
            title = 'Playlist 2024'
            authorImgUrl='https://i.scdn.co/image/ab67757000003b82f452de5a7f6223f17ae26f6b'
            authorName = 'linyao926'
            trackCount = '13'
            totalDuration = '49 min 16 sec'
            canAddToLibrary
            canViewAs
            isEditable
            ref={mediaLayoutRef}
            contentScrollHandler={handleScroll}
        >
            <TrackListSection 
                data={playlistItems}
                viewAs={viewAs}
                initialColumns={viewAs === 'list' ? 5 : 6}
                ref={childRef}
                isFixed={isFixed}
                isVisible={isVisible}
            />
        </MediaDetailLayout>
    );
}
  
export default Playlist;