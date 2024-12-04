import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { 
    fetchTrackData, 
    selectTrackInfo,
    selectTrackArtist,
} from '~/redux/slices/trackSlice';
import MediaDetailLayout from '~/layouts/MediaDetailLayout';
import TrackListSection from '~/components/TrackListSection/TrackListSection';
import MediaSection from '~/components/MediaSection/MediaSection';
import classNames from 'classnames/bind';
import styles from '~/styles/pages/Track.module.scss';

const cx = classNames.bind(styles);

function Track(props) {
    const {
        
    } = props;

    const dispatch = useDispatch(); 
    const { accessToken } = useSelector((state) => state.auth);
    const trackInfo = useSelector(selectTrackInfo);
    const trackArtist = useSelector(selectTrackArtist);

    const mediaLayoutRef = useRef(null);
    const childRef = useRef(null);

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchTrackData({
                accessToken, 
                id: '1FSJO6ZysQq9R1b2owKcAf'
            }));
        }
    }, [accessToken, dispatch]);

    return (
        <MediaDetailLayout
            coverUrl = {trackInfo.album && trackInfo.album.images[0].url}
            // coverFallback = {<TrackFallbackIcon />}
            title = {trackInfo?.name}
            followerCount={trackInfo?.followers && trackInfo?.followers.total}
            authorImgUrl = {trackArtist.images && trackArtist.images[0].url}
            authorName = {trackArtist.name && trackArtist.name}
            albumName = {trackInfo.album && trackInfo.album.name}
            releaseDate = {trackInfo.album && trackInfo.album["release_date"]}
            duration = {trackInfo["duration_ms"] && trackInfo["duration_ms"]}
            canAddToLibrary
            canShowOptions
            ref={mediaLayoutRef}
        >
            <div className={cx('artists-wrapper')}>
                <div className={cx('artist')}>
                    <div className={cx('artist-cover-wrapper')}>
                        {trackArtist.images 
                            ? <img className={cx('artist-cover')} src={trackArtist.images[0].url} alt='' />
                            : <span className={cx('artist-cover-fallback')}></span>
                        }
                    </div>
                    <div className={cx('artist-info-text')}>
                        <span className={cx('artist-subtitle')}>Artist</span>
                        <span className={cx('artist-title')}>{trackArtist.name && trackArtist.name}</span>
                    </div>
                </div>  
            </div>
            {/* {trackTopTracks.tracks && <TrackListSection 
                data={trackTopTracks.tracks}
                initialColumns={4}
                ref={childRef}
                showAlbum
                headerType="title"
                title="Popular"
            />}
            {trackAlbums.items && <MediaSection 
                data={trackAlbums.items}
                type="album"
                title={`Discography`}
                showAll
                routeLink = {`/track/${trackInfo.id}/discography/all`}
            />} */}
        </MediaDetailLayout>
    );
}
  
export default Track;