import React, { useRef, useState } from 'react';
import { useLoaderData } from "react-router";
import { useGetId } from '~/hooks/useGetId';
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

    const { id } = useGetId();

    const [isFixed, setIsFixed] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const { playlistInfo, playlistItems, relatedTrack } = useLoaderData();

    const mediaLayoutRef = useRef(null);
    const childRef = useRef(null);
    
    const handleScroll = (scrollY) => contentScrollHandler(scrollY, mediaLayoutRef, childRef, setIsFixed, setIsVisible);

    return (
        <MediaDetailLayout
            id={id}
            coverUrl = {playlistInfo?.images && playlistInfo?.images[0].url}
            coverFallback = {<PlaylistFallbackIcon />}
            type = 'playlist'
            title = {playlistInfo?.name}
            authorImgUrl={playlistInfo?.owner && playlistInfo.owner.images[0].url}
            authorName = {playlistInfo?.owner && playlistInfo.owner['display_name']}
            authorId = {playlistInfo?.owner && playlistInfo.owner.id}
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