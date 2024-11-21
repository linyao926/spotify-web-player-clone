import React from 'react';
import { Link } from 'react-router-dom';
import { PlayLargeIcon } from '~/assets/icons';
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
        imgUrl = 'https://i.scdn.co/image/ab67616d00001e0227c1a17d71ecaf008c1357e7',
        title = 'Fake Love',
        author = 'BTS',
        album = 'The Most Beautiful Moment in Life Pt.1',
        addedDate = 'Sep 22, 2023',
        duration = '3:30',
        showIndex = false,
        showAlbum = false,
        showAddedDate = false,
    } = props;

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
            {showAddedDate && <span className={cx('track-item-added-date')}>{addedDate}</span>}
            <TrackItemCardActions 
                duration={duration}
            />
        </Link>
    );
};

export default TrackItemCard;