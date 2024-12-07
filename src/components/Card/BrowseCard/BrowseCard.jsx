import React from 'react';
import { Link } from "react-router";
import classNames from 'classnames/bind';
import styles from '~/styles/components/BrowseCard.module.scss';

const cx = classNames.bind(styles);

const BrowseCard = (props) => {
    const {
        routeLink = '/',
        title = 'Dance/Electronic',
        imgUrl = 'https://i.scdn.co/image/ab67616d00001e0227c1a17d71ecaf008c1357e7',
    } = props;

    return (
        <Link 
            className={cx('browse-card')}
            to={routeLink}
        >
            <span className={cx('browse-card-title')}>{title}</span>
            <div className={cx('browse-card-img-wrapper')}>
                <img 
                    draggable="false" 
                    loading="lazy" 
                    src={imgUrl} 
                    alt="" 
                    className={cx('browse-card-img')} 
                />
            </div>
        </Link>
    );
};

export default BrowseCard;