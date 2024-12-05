import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDynamicColumns from '~/hooks/useDynamicColumns';
import { PlayLargeIcon } from '~/assets/icons';
import { formatDate, formatMillisecondsToMinutes } from '~/utils/timeUtils';
import TrackItemCardInfo from './TrackItemCardInfo';
import TrackItemCardActions from './TrackItemCardActions';
import classNames from 'classnames/bind';
import styles from '~/styles/components/TrackItemCard.module.scss';

const cx = classNames.bind(styles);

const TrackItemCard = (props) => {
    const {
        viewAs,
        initialColumns = 5,
        routeLink = '/',
        trackIndex = 1,
        imgUrl = '',
        title = '',
        authors = [''],
        album = '',
        addedDate = '',
        duration = '',
        showIndex = false,
        showArtist = true,
        showAlbum = false,
        showAddedDate = false,
    } = props;

    const containerRef = useRef(null);
    const { currentColumns, templateColumns } = useDynamicColumns(containerRef, initialColumns, showIndex);

    const authorList = authors.map(authorName => (
        <span key={authorName} className={cx('track-item-card-author')}>{authorName}</span>
    ));

    return (
        <Link 
            className={cx('track-item-card', templateColumns, viewAs)}
            to={routeLink}
            ref={containerRef}
        >
            {showIndex && (
                <div className={cx('track-item-index', 'show-play-icon')}>
                    <span>{trackIndex}</span>
                    <span className={cx('play-icon-wrapper')}><PlayLargeIcon /></span>
                </div>
            )}
            {viewAs === 'list' 
                ? <TrackItemCardInfo 
                    imgUrl={imgUrl}
                    title={title}
                    authors={authorList}
                    showIndex={showIndex}
                    showArtist={showArtist}
                /> 
                : <>
                    <span className={cx('track-item-card-title')}>{title}</span>
                    {showArtist && currentColumns >= 4 && <span className={cx('track-item-card-author-wrapper')}>{authorList}</span>}
                </>
            }
            {((currentColumns >= 5 || (viewAs === 'list' && currentColumns >= 4)) || initialColumns >= 3) && showAlbum && <span className={cx('track-item-album')}>{album}</span>}
            {(currentColumns >= 6 || (viewAs === 'list' && currentColumns >= 5)) && showAddedDate && <span className={cx('track-item-added-date')}>{formatDate(addedDate)}</span>}
            <TrackItemCardActions 
                duration={formatMillisecondsToMinutes(duration)}
            />
        </Link>
    );
};

export default TrackItemCard;