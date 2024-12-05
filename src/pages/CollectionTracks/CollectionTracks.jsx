import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { 
    fetchUserData, 
    selectUserInfo,
} from '~/redux/slices/userSlice';
import { 
    PlaylistFallbackIcon,
    LikedPlaceholderIcon,
} from '~/assets/icons';
import MediaDetailLayout from '~/layouts/MediaDetailLayout';
import TrackListSection from '~/components/TrackListSection/TrackListSection';
import Button from '~/components/Button/Button';
import { contentScrollHandler } from '~/utils/eventHandler';
import classNames from 'classnames/bind';
import styles from '~/styles/pages/CollectionTracks.module.scss';

const cx = classNames.bind(styles);

function CollectionTracks(props) {
    const {
        viewAs = 'list',
    } = props;

    const [isFixed, setIsFixed] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const dispatch = useDispatch(); 
    const { accessToken } = useSelector((state) => state.auth);
    const userData = useSelector(selectUserInfo);
    const userStatus = useSelector((state) => state.user.status);

    const mediaLayoutRef = useRef(null);
    const childRef = useRef(null);

    useEffect(() => {
        if (accessToken && userStatus === 'idle') {
          dispatch(fetchUserData({accessToken}));
        }
    }, [accessToken, userStatus, dispatch]);
    
    const handleScroll = (scrollY) => contentScrollHandler(scrollY, mediaLayoutRef, childRef, setIsFixed, setIsVisible);

    console.log(userData)

    return (
        <MediaDetailLayout
            coverUrl = "https://misc.scdn.co/liked-songs/liked-songs-300.png"
            coverFallback = {<PlaylistFallbackIcon />}
            type = 'playlist'
            title = 'Liked Songs'
            authorImgUrl={userData?.userInfo?.images[0]?.url}
            authorName = {userData?.userInfo && userData?.userInfo['display_name']}
            trackCount = {0}
            canViewAs
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
            /> */}
            {false 
                ? <></>
                : <section className={cx('liked-placeholder')}>
                    <span className={cx('icon-wrapper')}> <LikedPlaceholderIcon /> </span>
                    <h3>Songs you like will appear here</h3>
                    <span className={cx('description')}>Save songs by tapping the heart icon.</span>
                    <span className={cx('btn-wrapper')}><Button
                        variant="background-base"
                        size="size-base"
                        borderRadius="rounded"
                        routeLink="/search"
                    >Find songs</Button></span>
                </section>
            }

        </MediaDetailLayout>
    );
}
  
export default CollectionTracks;