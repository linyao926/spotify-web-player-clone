import React from 'react';
import { useNavigate } from "react-router";
import { PlayLargeIcon } from '~/assets/icons';
import { formatDate } from '~/utils/timeUtils';
import classNames from 'classnames/bind';
import styles from '~/styles/components/LibraryItemCard.module.scss';

const cx = classNames.bind(styles);

const LibraryItemCard = (props) => {
    const {
        routeLink = '', 
        imgUrl = '',
        imgFallback = '',
        imgCircle = false,
        title = '',
        type = '',
        author = '',
        showMore = false,
        addedDate = '',
        played = '',
    } = props;

    const navigate = useNavigate();

    return (
        <div className={cx('library-item-card')}
            onClick={() => navigate(routeLink)}
        >
            <div className={cx('library-item-card-info')}>
                <div className={cx('library-item-img-wrapper')}>
                    {imgUrl 
                    ? <img 
                        draggable="false" 
                        loading="lazy" 
                        src={imgUrl} 
                        alt="" 
                        className={cx('library-item-img', imgCircle && 'circle')} 
                    />
                    : <span className={cx('library-item-img', 'fallback', imgCircle && 'circle', 'img-fallback')}>{imgFallback}</span>
                    }
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
                <span className={cx('library-item-added-date')}>{formatDate(addedDate)}</span>
                <span className={cx('library-item-played')}>{played && formatDate(played)}</span>
           </>}
        </div>
    );
};

export default LibraryItemCard;