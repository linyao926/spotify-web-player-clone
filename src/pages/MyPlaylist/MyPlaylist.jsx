import React, { useRef, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { useGetId } from '~/hooks/useGetId';
import { useDispatch, useSelector } from 'react-redux';
import { addTrackToPlaylist } from '~/redux/slices/myPlaylistSlice';
import { selectProfileInfo, selectProfileTopTracks } from '~/redux/slices/profileSlice';
import { 
    PlaylistFallbackIcon,
} from '~/assets/icons';
import MediaDetailLayout from '~/layouts/MediaDetailLayout/MediaDetailLayout';
import TrackListSection from '~/components/TrackListSection/TrackListSection';
import FindMoreForPlaylist from './FindMoreForPlaylist';
import { contentScrollHandler } from '~/utils/eventHandler';

function MyPlaylist(props) {
    const {
        viewAs = 'list',
    } = props;

    const { id } = useGetId();
    const playlist = useSelector((state) =>
        state['my_playlist'].playlists.find((playlist) => playlist.id === id)
    );

    if (!playlist) {
        return <div style={{flexGrow: '1', height: '100%'}}>My Playlist not found</div>;
    }

    const [isFixed, setIsFixed] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [findMoreVisible, setFindMoreVisible] = useState(true);

    const profileInfo = useSelector(selectProfileInfo);
    const profileTopTracks = useSelector(selectProfileTopTracks);

    const mediaLayoutRef = useRef(null);
    const childRef = useRef(null);
    
    const handleScroll = (scrollY) => contentScrollHandler(scrollY, mediaLayoutRef, childRef, setIsFixed, setIsVisible);

    return (
        <MediaDetailLayout
            id={id}
            coverUrl = {playlist.images.uploadUrl 
                ? playlist.images.uploadUrl 
                : (playlist.images.fallbackUrl 
                    ? playlist.images.fallbackUrl 
                    : null
                )}
            coverFallback = {<PlaylistFallbackIcon />}
            type = 'playlist'
            title = {playlist.name}
            authorImgUrl={profileInfo?.images[0]?.url}
            authorName = {profileInfo && profileInfo['display_name']}
            authorId = {profileInfo && profileInfo.id}
            trackCount = {playlist['track_total']}
            totalDuration = {0}
            canPlay={playlist['track_total'] > 0}
            canShowOptions
            canViewAs
            isEditable
            ref={mediaLayoutRef}
            contentScrollHandler={handleScroll}
        >
            {/* <TrackListSection 
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
            />} */}
            {findMoreVisible ? <FindMoreForPlaylist 
                clickFunction={() => setFindMoreVisible(false)}
            /> 
            : <span 
                onClick={() => setFindMoreVisible(true)}
                style={{
                    color: 'var(--text-base)',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    padding: '32px var(--content-spacing) 0',
                    textAlign: 'end',
                    width: '100%',
                    display: 'block',
                    cursor: 'pointer',
                }}
              >Find more</span>
            }
            {!findMoreVisible && profileTopTracks.items && <TrackListSection 
                data={profileTopTracks.items}
                initialColumns={3}
                title='Recommended'
                subtitle='Based on your listening'
                subtitlePosition='bottom'
                headerType='title'
                nonIndex
                showAlbum
                showAddToLibrary
            />} 
        </MediaDetailLayout>
    );
}
  
export default MyPlaylist;