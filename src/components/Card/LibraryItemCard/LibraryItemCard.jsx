import React from 'react';
import { Link } from 'react-router-dom';
import { PlayLargeIcon } from '~/assets/icons';
import classNames from 'classnames/bind';
import styles from '~/styles/components/LibraryItemCard.module.scss';

const cx = classNames.bind(styles);

const LibraryItemCard = (props) => {
    const {
        imgUrl = 'https://i.scdn.co/image/ab67616d00001e0227c1a17d71ecaf008c1357e7',
        title = 'Fake Love',
        type = 'album',
        author = 'BTS',
        showMore = true,
        addedDate = 'Sep 22, 2023',
        played = 'Oct 14, 2023',
    } = props;

    return (
        <div className={cx('library-item-card')}>
            <div className={cx('library-item-card-info')}>
                <div className={cx('library-item-img-wrapper')}>
                    <img 
                        draggable="false" 
                        loading="lazy" 
                        src={imgUrl} 
                        alt="" 
                        className={cx('library-item-img')} 
                    />
                    <span className={cx('play-icon-wrapper')}><PlayLargeIcon /></span>
                </div>
                <div className={cx('library-item-info-text')}>
                    <span className={cx('library-item-title')}>{title}</span>
                    <div className={cx('library-item-sub-title')}>
                        <span className={cx('library-item-type')}>{type}</span>
                        <span className={cx('library-item-author')}>{author}</span>
                    </div>
                </div>
            </div>
           {showMore && <>
                <span className={cx('library-item-added-date')}>{addedDate}</span>
                <span className={cx('library-item-played')}>{played}</span>
           </>}
        </div>
    );
};

export default LibraryItemCard;