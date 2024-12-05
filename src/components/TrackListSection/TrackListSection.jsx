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
        title = '',
        subtitle = '',
        subtitlePosition = 'bottom',
        data,
        viewAs = 'list',
        showAlbum = true,
        showArtist = true,
        showAddedDate = false,
        initialColumns = 5,
        isFixed = false,
        isVisible = true,
        nonIndex = false,
        related = false,
        seeMore = false,
    } = props;

    const headerRef = useRef(null);

    const { currentColumns, templateColumns } = useDynamicColumns(headerRef, initialColumns, true);

    const trackListItems = data.map((item, index) => {
        let element;
        if (item.track) {
            element = item.track;
        } else {
            element = item;
        }
        const authors = element.artists.map(artist => artist.name);

        if (related) {
            if ((index > 4 && index < 10) || (index > 14 && index < 19)) return;
        }

        // console.log(element.album.name)

        return (
            <TrackItemCard 
                key={element.id}
                routeLink = {`/track/${element.id}`}
                trackIndex = {index + 1}
                imgUrl = {element.album.images[0].url}
                title = {element.name}
                authors = {authors}
                album = {element.album.name}
                addedDate = {item['added_at']}
                duration = {element['duration_ms']}
                showIndex={!nonIndex}
                showArtist={showArtist}
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
                {!nonIndex && <span className={cx('header-index')}>#</span>}
                <span>Title</span>
                {viewAs === 'compact' && currentColumns >= 4 && <span>Artist</span>}
                {(currentColumns >= 5 || (viewAs === 'list' && currentColumns >= 4)) && showAlbum && <span>Album</span>}
                {(currentColumns >= 6 || (viewAs === 'list' && currentColumns >= 5)) && showAddedDate && <span>Date added</span>}
                <span className={cx('header-duration')}><DurationRepresentIcon /></span>
            </header>}
            {headerType === 'title' && <header className={cx('header-title-wrapper', subtitlePosition)}>
                <span>{title}</span>
                <span className={cx('header-subtitle')}>{subtitle}</span>
            </header>}
            <div className={cx('track-list-content')}>
                {trackListItems}
            </div>
        </section>
    );
});

export default TrackListSection;