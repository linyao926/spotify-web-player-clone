import React from 'react';
import { Link } from 'react-router-dom';
import { PlayLargeIcon } from '~/assets/icons';
import classNames from 'classnames/bind';
import styles from '~/styles/components/TrackItemCard.module.scss';

const cx = classNames.bind(styles);

const TrackItemCardInfo = (props) => {
    const {
        imgUrl,
        title,
        author,
        showIndex,
    } = props;

    return (
        <div className={cx('track-item-card-info')}>
            <div className={cx('track-item-card-img-wrapper', !showIndex && 'show-play-icon')}>
                <img 
                    draggable="false" 
                    loading="lazy" 
                    src={imgUrl} 
                    alt="" 
                    className={cx('track-item-card-img')} 
                />
                {!showIndex && <span className={cx('play-icon-wrapper')}><PlayLargeIcon /></span>}
            </div>
            <div className={cx('track-item-card-info-text')}>
                <span className={cx('track-item-card-title')}>{title}</span>
                <span className={cx('track-item-card-author')}>{author}</span>
            </div>
        </div>
    );
};

export default TrackItemCardInfo;