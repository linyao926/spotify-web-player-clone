import React from 'react';
import { Link, useNavigate } from "react-router";
import { PlayLargeIcon } from '~/assets/icons';
import Button from '~/components/Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/NormalCard.module.scss';

const cx = classNames.bind(styles);

const NormalCard = (props) => {
    const {
        imgCircle = false,
        imgUrl = '',
        imgFallback = '',
        title,
        subtitle,
        routeLink = '/search',
        disableTextHover = false,
    } = props;

    const navigate = useNavigate();

    return (
        <div className={cx('normal-card')}
            onClick={() => navigate(routeLink)}
        >
            <div className={cx('normal-card-top')}>
                {imgUrl 
                    ? <img 
                        draggable="false" 
                        loading="lazy" 
                        src={imgUrl} 
                        alt="" 
                        className={cx('normal-card-img', imgCircle && 'circle')} 
                    />
                    : <span className={cx('normal-card-img', imgCircle && 'circle', 'fallback')}>{imgFallback}</span>
                }
                <div className={cx('play-btn-wrapper')}>
                    <Button 
                        hasIcon 
                        icon={<PlayLargeIcon />} 
                        borderRadius="circle" 
                        variant="primary" 
                        size="size-base" 
                        iconSize="medium-icon"
                        padding="8px" 
                    />
                </div>
            </div>
            <div className={cx('normal-card-bottom', disableTextHover && 'disable-hover')}>
                <Link className={cx('normal-card-title')}
                    to="/"
                >{title}</Link>
                <Link 
                    draggable="false" dir="auto" 
                    to="/artist/1qpe09vYC83Kbgro8hv4HN"
                >{subtitle}</Link>
            </div>
        </div>
    );
};

export default NormalCard;