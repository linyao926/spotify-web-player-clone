import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { 
    selectProfileInfo,
} from '~/redux/slices/profileSlice';
import { 
    PlaylistFallbackIcon,
    LikedPlaceholderIcon,
} from '~/assets/icons';
import images from '~/assets/images';
import MediaDetailLayout from '~/layouts/MediaDetailLayout/MediaDetailLayout';
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
    const profileInfo = useSelector(selectProfileInfo);
    const likedTracks = useSelector((state) => state['library'].likedTracks);

    const mediaLayoutRef = useRef(null);
    const childRef = useRef(null);
    
    const handleScroll = (scrollY) => contentScrollHandler(scrollY, mediaLayoutRef, childRef, setIsFixed, setIsVisible);

    return (
        <MediaDetailLayout
            coverUrl = {images['LikedTracksCover']}
            coverFallback = {<PlaylistFallbackIcon />}
            type = 'playlist'
            title = 'Liked Songs'
            authorImgUrl={profileInfo?.images[0]?.url}
            authorName = {profileInfo && profileInfo['display_name']}
            authorId = {profileInfo && profileInfo.id}
            trackCount = {likedTracks.length}
            canViewAs
            ref={mediaLayoutRef}
            contentScrollHandler={handleScroll}
        >
            
            {likedTracks.length > 0 
                ? <TrackListSection 
                    data={likedTracks}
                    viewAs={viewAs}
                    initialColumns={viewAs === 'list' ? 5 : 6}
                    ref={childRef}
                    isFixed={isFixed}
                    isVisible={isVisible}
                    parent={{
                        cover: images['LikedTracksCover'],
                        id: 'collection/tracks',
                        title: 'Liked Songs',
                        type: 'playlist',
                    }}
                />
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