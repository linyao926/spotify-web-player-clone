import React from 'react';
import { Link } from 'react-router';
import {
    trackContextMenu,
    queueTrackContextMenu
} from '~/constants/subContextItems';
import TrackItemCard from '~/components/Card/TrackItemCard/TrackItemCard';
import classNames from 'classnames/bind';
import styles from '~/styles/pages/Track.module.scss';

const cx = classNames.bind(styles);

function AlbumDisplay({ albumData }) {
    // console.log(albumData)
    const trackListItems = albumData.tracks.items.map((item, index) => {
        let element;
        if (item.track) {
            element = item.track;
        } else {
            element = item;
        }
        const authors = element.artists.map(artist => artist.name);

        // console.log(element.album.name)

        return (
            <TrackItemCard 
                key={element.id}
                routeLink = {`/track/${element.id}`}
                trackIndex = {index + 1}
                imgUrl = {albumData.images[0].url}
                title = {element.name}
                authors = {authors}
                album = {albumData.name}
                addedDate = {item['added_at']}
                duration = {element['duration_ms']}
                showIndex
                showAlbum = {false}
                initialColumns = {3}
                parent={{
                    cover: albumData.images[0].url,
                    id: albumData.id,
                    title: albumData.name,
                    type: 'album',
                }}
                displayInContentPage
            />
        )
    });

    return (
        <section className={cx('track-album-display')}>
            <Link className={cx('track-album-display-header')}
                to={`/album/${albumData.id}`}
            >
                <img className={cx('header-cover')} src={albumData.images[0].url} />
                <div className={cx('header-text')}>
                    <span className={cx('header-text-subtitle')}>From the {albumData['album_type']}</span>
                    <span>{albumData.name}</span>
                </div>
            </Link>
            <div className={cx('track-album-display-content')}>
                {trackListItems}
            </div>
            <div className={cx("release-info")}>
                <span>{new Date(albumData.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })}</span>
                {albumData.copyrights.map((copyright, index) => (
                    <span key={index}>
                    {copyright.type === "C" ? "©" : "℗"} {copyright.text}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default AlbumDisplay;