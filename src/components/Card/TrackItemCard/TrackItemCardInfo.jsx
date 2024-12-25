import React from 'react';
import { Link } from "react-router";
import { PlayLargeIcon, MusicalNotePlusIcon } from '~/assets/icons';
import classNames from 'classnames/bind';
import styles from '~/styles/components/TrackItemCard.module.scss';

const cx = classNames.bind(styles);

const TrackItemCardInfo = (props) => {
    const {
        imgUrl,
        title,
        authors,
        showIndex,
        showArtist,
    } = props;

    return (
        <div className={cx('track-item-card-info')}>
            <div className={cx('track-item-card-img-wrapper', !showIndex && 'show-play-icon')}>
                {imgUrl.length > 0 
                    ? <img 
                        draggable="false" 
                        loading="lazy" 
                        src={imgUrl} 
                        alt="" 
                        className={cx('track-item-card-img')} 
                    />
                    : <span className={cx('track-item-card-img')} >
                        <MusicalNotePlusIcon />
                    </span> 
                }
                {!showIndex && <span className={cx('play-icon-wrapper')}><PlayLargeIcon /></span>}
            </div>
            <div className={cx('track-item-card-info-text')}>
                <span className={cx('track-item-card-title')}>{title}</span>
                {showArtist && <span className={cx('track-item-card-author-wrapper')}>{authors}</span>}
            </div>
        </div>
    );
};

export default TrackItemCardInfo;