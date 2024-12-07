import React, { useRef, useEffect, useState } from 'react';
import { useGetId } from '~/hooks/useGetId';
import { useDispatch, useSelector } from 'react-redux'; 
import { 
    fetchUserData,
    selectUserInfo,
} from '~/redux/slices/userSlice';
import { 
    UserFallbackIcon,
} from '~/assets/icons';
import MediaDetailLayout from '~/layouts/MediaDetailLayout/MediaDetailLayout';

function UserProfile(props) {
    const dispatch = useDispatch(); 
    const { accessToken } = useSelector((state) => state.auth);
    const userInfo = useSelector(selectUserInfo);
    const userStatus = useSelector((state) => state.user.status);

    const { id } = useGetId();

    const mediaLayoutRef = useRef(null);

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchUserData({
                accessToken, 
                id: id
            }));
             ;
        }
    }, [accessToken, dispatch, id]);

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