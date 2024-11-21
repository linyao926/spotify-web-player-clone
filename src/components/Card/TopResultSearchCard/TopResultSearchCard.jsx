import React from 'react';
import { Link } from 'react-router-dom';
import { PlayLargeIcon } from '~/assets/icons';
import Button from '~/components/Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/TopResultSearchCard.module.scss';

const cx = classNames.bind(styles);

const TopResultSearchCard = (props) => {
    const {
        imgCircle = false,
        routeLink = '/',
        title = 'Fake Love',
        type = 'song',
        author = 'BTS',
        imgUrl = 'https://i.scdn.co/image/ab67616d00001e0227c1a17d71ecaf008c1357e7',
    } = props;

    return (
        <Link 
            className={cx('top-result-card')}
            to={routeLink}
        >
            <div className={cx('top-result-card-img-wrapper', imgCircle && 'circle')}>
                <img 
                    draggable="false" 
                    loading="lazy" 
                    src={imgUrl} 
                    alt="" 
                    className={cx('top-result-card-img')} 
                />
            </div>
            <div className={cx('top-result-card-info')}>
                <span className={cx('top-result-card-title')}>{title}</span>
                <div className={cx('top-result-card-subtitle')}>
                    <span className={cx('top-result-card-type')}>{type}</span>
                    {author && <span className={cx('top-result-card-author')}>{author}</span>}
                </div>
            </div>
            <span className={cx("play-btn-wrapper")}>
                <Button 
                    hasIcon 
                    icon={<PlayLargeIcon />} 
                    borderRadius="circle" 
                    variant="primary" 
                    size="size-base" 
                    iconSize="medium-icon"
                    padding="8px" 
                    withBoxshadow
                />
            </span>
        </Link>
    );
};

export default TopResultSearchCard;