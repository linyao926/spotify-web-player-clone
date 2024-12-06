import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { 
    selectProfileInfo,
    selectProfileTopTracks,
    selectProfileTopArtists,
} from '~/redux/slices/profileSlice';
import { 
    UserFallbackIcon,
} from '~/assets/icons';
import MediaDetailLayout from '~/layouts/MediaDetailLayout/MediaDetailLayout';
import MediaSection from '~/components/MediaSection/MediaSection';
import TrackListSection from '~/components/TrackListSection/TrackListSection';
import Button from '~/components/Button/Button';
// import classNames from 'classnames/bind';
// import styles from '~/styles/pages/CollectionTracks.module.scss';

// const cx = classNames.bind(styles);

function OwnProfile(props) {
    const dispatch = useDispatch(); 
    const { accessToken } = useSelector((state) => state.auth);
    const profileInfo = useSelector(selectProfileInfo);
    const profileTopArtists = useSelector(selectProfileTopArtists);
    const profileTopTracks = useSelector(selectProfileTopTracks);
    const profileStatus = useSelector((state) => state.profile.status);

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