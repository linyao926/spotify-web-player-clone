import React, { useRef } from 'react';
import { Link, useLoaderData } from 'react-router';
import { useGetId } from '~/hooks/useGetId';
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

    const { id } = useGetId();

    const { 
        trackInfo, 
        trackArtist, 
        album, 
        artistAlbums, 
        artistSingles,
        artistTopTracks,
      } = useLoaderData();

    const mediaLayoutRef = useRef(null);
    const childRef = useRef(null);

    // console.log(artistTopTracks)

    return (
        <MediaDetailLayout
            id={id}
            coverUrl = {trackInfo.album && trackInfo.album.images[0].url}
            // coverFallback = {<TrackFallbackIcon />}
            type ={trackInfo?.type}
            title = {trackInfo?.name}
            followerCount={trackInfo?.followers && trackInfo?.followers.total}
            authorImgUrl = {trackArtist.images && trackArtist.images[0].url}
            authorName = {trackArtist.name && trackArtist.name}
            authorId = {trackArtist.id && trackArtist.id}
            albumName = {trackInfo.album && trackInfo.album.name}
            albumId = {trackInfo.album && trackInfo.album.id}
            releaseDate = {trackInfo.album && trackInfo.album["release_date"]}
            duration = {trackInfo["duration_ms"] && trackInfo["duration_ms"]}
            canAddToLibrary
            canShowOptions
            ref={mediaLayoutRef}
        >
            <div className={cx('artists-wrapper')}>
                <Link className={cx('artist')}
                    to={`/artist/${trackArtist.id}`}
                >
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
                </Link>  
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
            {artistAlbums.items && artistAlbums.items.length > 0 && <MediaSection 
                data={artistAlbums.items}
                type="album"
                title={`Popular Releases by ${trackArtist.name}`}
                showAll
                routeLink = {`/track/${trackInfo.id}/discography/album`}
            />}
            {artistSingles.items && artistSingles.items.length > 0 && <MediaSection 
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