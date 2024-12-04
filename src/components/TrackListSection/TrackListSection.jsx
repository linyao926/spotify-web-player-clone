import React, { useRef, useState, useEffect } from 'react';
import useDynamicColumns from '~/hooks/useDynamicColumns';
import { DurationRepresentIcon } from '~/assets/icons';
import TrackItemCard from '~/components/Card/TrackItemCard/TrackItemCard';
import classNames from 'classnames/bind';
import styles from '~/styles/components/TrackListSection.module.scss';

const cx = classNames.bind(styles);

const TrackListSection = React.forwardRef((props, ref) => {
    const {
        headerType = 'bar',
        title = 'Popular',
        data,
        viewAs = 'list',
        showAlbum = true,
        showAddedDate = true,
        initialColumns = 5,
        isFixed = false,
        isVisible = true,
    } = props;

    const headerRef = useRef(null);

    const { currentColumns, templateColumns } = useDynamicColumns(headerRef, initialColumns, true);

    const trackListItems = data.map((item, index) => {
        const authors = item.track.artists.map(artist => artist.name);

        return (
            <TrackItemCard 
                key={item.track.id}
                routeLink = {`/track/${item.track.id}`}
                trackIndex = {index + 1}
                imgUrl = {item.track.album.images[0].url}
                title = {item.track.name}
                authors = {authors}
                album = {item.track.album.name}
                addedDate = {item['added_at']}
                duration = {item.track['duration_ms']}
                showIndex
                showAlbum = {showAlbum}
                showAddedDate = {showAddedDate}
                initialColumns = {initialColumns}
                viewAs = {viewAs}
            />
        )
    });

    return (
        <section className={cx('track-list')} 
            ref={ref} 
        >
            {headerType === 'bar' && <header 
                className={cx('header-bar', templateColumns, isFixed && 'fixed', !isVisible && 'hidden')}
                ref={headerRef}            
            >
                <span className={cx('header-index')}>#</span>
                <span>Title</span>
                {viewAs === 'compact' && currentColumns >= 4 && <span>Artist</span>}
                {(currentColumns >= 5 || (viewAs === 'list' && currentColumns >= 4)) && showAlbum && <span>Album</span>}
                {(currentColumns >= 6 || (viewAs === 'list' && currentColumns >= 5)) && showAddedDate && <span>Date added</span>}
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
});

export default TrackListSection;