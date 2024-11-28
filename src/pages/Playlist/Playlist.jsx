import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { 
  fetchBrowseData, 
  selectBrowseData
} from '~/redux/slices/browseDataSlice';
import { 
    PlaylistFallbackIcon,
} from '~/assets/icons';
import ScrollWrapper from '~/components/ScrollWrapper/ScrollWrapper';
import MediaDetailLayout from '~/layouts/MediaDetailLayout';
// import classNames from 'classnames/bind';
// import styles from '~/styles/pages/Search.module.scss';

// const cx = classNames.bind(styles);

function Browse() {
    const dispatch = useDispatch(); 
    const { accessToken } = useSelector((state) => state.auth);

    return (
        <MediaDetailLayout
            coverUrl = 'https://misc.scdn.co/liked-songs/liked-songs-300.png'
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
        >
            playlist content
        </MediaDetailLayout>
    );
}
  
export default Browse;