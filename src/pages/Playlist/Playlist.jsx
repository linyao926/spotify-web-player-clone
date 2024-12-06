import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { 
    fetchPlaylistData, 
    selectPlaylistInfo,
    selectPlaylistItems,
    selectRelatedTrack,
} from '~/redux/slices/playlistDataSlice';
import { 
    PlaylistFallbackIcon,
} from '~/assets/icons';
import MediaDetailLayout from '~/layouts/MediaDetailLayout/MediaDetailLayout';
import TrackListSection from '~/components/TrackListSection/TrackListSection';
import { contentScrollHandler } from '~/utils/eventHandler';

function Playlist(props) {
    const {
        viewAs = 'list',
    } = props;

    const [isFixed, setIsFixed] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const dispatch = useDispatch(); 
    const { accessToken } = useSelector((state) => state.auth);
    const playlistInfo = useSelector(selectPlaylistInfo);
    const playlistItems = useSelector(selectPlaylistItems);
    const relatedTrack = useSelector(selectRelatedTrack);

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

    // console.log(relatedTrack)

    return (
        <MediaDetailLayout
            coverUrl = {playlistInfo?.images && playlistInfo?.images[0].url}
            coverFallback = {<PlaylistFallbackIcon />}
            type = 'playlist'
            title = {playlistInfo?.name}
            authorImgUrl={playlistInfo?.owner && playlistInfo.owner.images[0].url}
            authorName = {playlistInfo?.owner && playlistInfo.owner['display_name']}
            trackCount = {playlistInfo && playlistInfo['track_total']}
            totalDuration = '49 min 16 sec'
            canAddToLibrary
            canShowOptions
            canViewAs
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
            {relatedTrack.length > 0 && <TrackListSection 
                data={relatedTrack}
                initialColumns={3}
                title='Recommended'
                headerType='title'
                nonIndex
                showAlbum
                related
            />}
        </MediaDetailLayout>
    );
}
  
export default Playlist;