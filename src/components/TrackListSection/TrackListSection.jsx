import React from 'react';
import { DurationRepresentIcon } from '~/assets/icons';
import TrackItemCard from '~/components/Card/TrackItemCard/TrackItemCard';
import classNames from 'classnames/bind';
import styles from '~/styles/components/TrackListSection.module.scss';

const cx = classNames.bind(styles);

const TrackListSection = (props) => {
    const {
        headerType = 'title',
        title = 'Popular',
        data,
        viewAs = 'list',
        showAlbum = false,
        showAddedDate = false,
    } = props;

    const trackListItems = data.map((item, index) => {
        return (
            <TrackItemCard 
                key={item.track.id}
                routeLink = {`/track/${item.track.id}`}
                trackIndex = {index + 1}
                imgUrl = {item.track.album.images[0].url}
                title = {item.track.name}
                author = {item.track.artists[0].name}
                album = {item.track.album.name}
                addedDate = {item['added_at']}
                duration = {item.track['duration_ms']}
                showIndex
                showAlbum = {showAlbum}
                showAddedDate = {showAddedDate}
                templateColumns = {showAlbum ? 'default' : 'three-cols'}
            />
        )
    });

    return (
        <section className={cx('track-list')}>
            {headerType === 'bar' && <header className={cx('header-bar')}>
                <span className={cx('header-index')}>#</span>
                <span>Title</span>
                {showAlbum && <span>Album</span>}
                {showAddedDate && <span>Date added</span>}
                <span className={cx('header-duration')}><DurationRepresentIcon /></span>
            </header>}
            {headerType === 'title' && <header className={cx('header-title')}>
                {title}
            </header>}
            <div className={cx('track-list-content')}>
                {trackListItems}
            </div>
        </section>
    );
};

export default TrackListSection;