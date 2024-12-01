import React from 'react';
import { Link } from 'react-router-dom';
import { PlayLargeIcon } from '~/assets/icons';
import { formatDate, formatMillisecondsToMinutes } from '~/utils/timeUtils';
import Button from '~/components/Button/Button';
import TrackItemCardInfo from './TrackItemCardInfo';
import TrackItemCardActions from './TrackItemCardActions';
import classNames from 'classnames/bind';
import styles from '~/styles/components/TrackItemCard.module.scss';

const cx = classNames.bind(styles);

const TrackItemCard = (props) => {
    const {
        templateColumns = "default",
        routeLink = '/',
        trackIndex = 1,
        imgUrl = '',
        title = '',
        author = '',
        album = '',
        addedDate = '',
        duration = '',
        showIndex = false,
        showAlbum = false,
        showAddedDate = false,
    } = props;

    // const formattedDate = formatDate(addedDate);

    return (
        <Link 
            className={cx('track-item-card', templateColumns)}
            to={routeLink}
        >
            {showIndex && (
                <div className={cx('track-item-index', 'show-play-icon')}>
                    <span>{trackIndex}</span>
                    <span className={cx('play-icon-wrapper')}><PlayLargeIcon /></span>
                </div>
            )}
            <TrackItemCardInfo 
                imgUrl={imgUrl}
                title={title}
                author={author}
                showIndex={showIndex}
            />
            {showAlbum && <span className={cx('track-item-album')}>{album}</span>}
            {showAddedDate && <span className={cx('track-item-added-date')}>{formatDate(addedDate)}</span>}
            <TrackItemCardActions 
                duration={formatMillisecondsToMinutes(duration)}
            />
        </Link>
    );
};

export default TrackItemCard;