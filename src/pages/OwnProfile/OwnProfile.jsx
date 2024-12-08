import React, { useRef } from 'react';
import { useLoaderData } from "react-router";
import { 
    UserFallbackIcon,
} from '~/assets/icons';
import MediaDetailLayout from '~/layouts/MediaDetailLayout/MediaDetailLayout';
import MediaSection from '~/components/MediaSection/MediaSection';
import TrackListSection from '~/components/TrackListSection/TrackListSection';

function OwnProfile() {
    const { profileInfo, profileTopArtists, profileTopTracks } = useLoaderData();

    const mediaLayoutRef = useRef(null);
    const childRef = useRef(null);

    return (
        <MediaDetailLayout
            coverUrl = {profileInfo?.images[0]?.url}
            coverFallback = {<UserFallbackIcon />}
            type = 'profile'
            title = {profileInfo && profileInfo['display_name']}
            publicPlaylists = {0}
            followingCount = {0}
            coverIsCircle
            canPlay={false}
            ref={mediaLayoutRef}
        >
            {profileTopArtists.items && <MediaSection 
                data={profileTopArtists.items}
                type="artist"
                title={`Top artists this month`}
                subtitle='Only visible to you'
                showAll
                routeLink = {`/user/${profileInfo.id}/top/artists`}
            />}
            {profileTopTracks.items && <TrackListSection 
                data={profileTopTracks.items}
                initialColumns={4}
                ref={childRef}
                headerType="title"
                subtitle="Only visible to you"
                title='Top tracks this month'
                subtitlePosition="bottom"
                showAll
                showAlbum
                routeLink = {`/user/${profileInfo.id}/top/tracks`}
            />}
        </MediaDetailLayout>
    );
}
  
export default OwnProfile;