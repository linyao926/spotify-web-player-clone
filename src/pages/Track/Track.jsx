import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { 
    fetchTrackData, 
    selectTrackInfo,
    selectTrackArtist,
    selectAlbum,
    selectArtistAlbums,
    selectArtistSingles,
    selectArtistTopTracks,
} from '~/redux/slices/trackSlice';
import MediaDetailLayout from '~/layouts/MediaDetailLayout/MediaDetailLayout';
import TrackListSection from '~/components/TrackListSection/TrackListSection';
import MediaSection from '~/components/MediaSection/MediaSection';
import AlbumDisplay from './AlbumDisplay';
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
    const album = useSelector(selectAlbum)
    const artistAlbums = useSelector(selectArtistAlbums)
    const artistSingles = useSelector(selectArtistSingles)
    const artistTopTracks = useSelector(selectArtistTopTracks)

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

    // console.log(artistTopTracks)

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
            {artistTopTracks.tracks && <TrackListSection 
                data={artistTopTracks.tracks}
                initialColumns={4}
                ref={childRef}
                headerType="title"
                subtitle="Popular Tracks by"
                title={trackArtist.name}
                subtitlePosition="top"
                seeMore
                showAlbum
                showArtist={false}
            />}
            {artistAlbums.items && <MediaSection 
                data={artistAlbums.items}
                type="album"
                title={`Popular Releases by ${trackArtist.name}`}
                showAll
                routeLink = {`/track/${trackInfo.id}/discography/album`}
            />}
            {artistSingles.items && <MediaSection 
                data={artistSingles.items}
                type="album"
                title={`Popular Singles and EPs by ${trackArtist.name}`}
                showAll
                routeLink = {`/track/${trackInfo.id}/discography/single`}
            />}
            {album.length !== 0 && <AlbumDisplay albumData={album} />}
        </MediaDetailLayout>
    );
}
  
export default Track;