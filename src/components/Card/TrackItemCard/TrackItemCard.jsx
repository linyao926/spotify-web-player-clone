import React from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon, OptionIcon, AddToLibraryIcon } from '~/assets/icons';
import Button from '~/components/Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/TrackItemCard.module.scss';

const cx = classNames.bind(styles);

const TrackItemCard = (props) => {
    const {
        templateColumns = "default",
        routeLink = '/',
        title = 'Fake Love',
        author = 'BTS',
        imgUrl = 'https://i.scdn.co/image/ab67616d00001e0227c1a17d71ecaf008c1357e7',
        trackIndex = 1,
    } = props;

    return (
        <Link 
            className={cx('track-item-card', templateColumns)}
            to={routeLink}
        >
            <span>{trackIndex}</span>
            <div className={cx('track-item-card-info')}>
                <div className={cx('track-item-card-img-wrapper')}>
                    <img 
                        draggable="false" 
                        loading="lazy" 
                        src={imgUrl} 
                        alt="" 
                        className={cx('track-item-card-img')} 
                    />
                    {(templateColumns === "two-cols") && <span></span>}
                </div>
                <div className={cx('track-item-card-info')}>
                    <span className={cx('track-item-card-title')}>{title}</span>
                    <div className={cx('track-item-card-subtitle')}>
                        <span className={cx('track-item-card-type')}>{type}</span>
                        {author && <span className={cx('track-item-card-author')}>{author}</span>}
                    </div>
                </div>
            </div>
            
            {/* <span className={cx("play-btn-wrapper")}>
                <Button 
                    hasIcon 
                    icon={<PlayIcon />} 
                    borderRadius="circle" 
                    variant="primary" 
                    size="size-base" 
                    iconSize="medium-icon"
                    padding="8px" 
                    withBoxshadow
                />
            </span> */}
        </Link>
    );
};

export default TrackItemCard;