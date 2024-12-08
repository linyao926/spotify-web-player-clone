import React, { useRef } from 'react';
import { useLoaderData } from 'react-router';
import { 
    UserFallbackIcon,
} from '~/assets/icons';
import MediaDetailLayout from '~/layouts/MediaDetailLayout/MediaDetailLayout';

function UserProfile() {
    const { userInfo } = useLoaderData();
    const mediaLayoutRef = useRef(null);

    return (
        <MediaDetailLayout
            coverUrl = {userInfo?.images[0]?.url}
            coverFallback = {<UserFallbackIcon />}
            type = 'profile'
            title = {userInfo && userInfo['display_name']}
            coverIsCircle
            canPlay={false}
            canFollow
            canShowOptions
            ref={mediaLayoutRef}
        >
        </MediaDetailLayout>
    );
}
  
export default UserProfile;