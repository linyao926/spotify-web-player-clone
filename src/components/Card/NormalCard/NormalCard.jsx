import React from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon } from '~/assets/icons';
import Button from '~/components/Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/NormalCard.module.scss';

const cx = classNames.bind(styles);

const NormalCard = (props) => {
    const {
        imgCircle = false,
    } = props;

    return (
        <div className={cx('normal-card')}>
            <div className={cx('normal-card-top')}>
                <img 
                    draggable="false" 
                    loading="lazy" 
                    src="https://i.scdn.co/image/ab67616d00001e0227c1a17d71ecaf008c1357e7" 
                    alt="" 
                    className={cx('normal-card-img', imgCircle && 'circle')} 
                />
                <div className={cx('play-btn-wrapper')}>
                    <Button 
                        hasIcon 
                        icon={<PlayIcon />} 
                        borderRadius="circle" 
                        variant="primary" 
                        size="size-base" 
                        iconSize="medium-icon"
                        padding="8px" 
                    />
                </div>
            </div>
            <div className={cx('normal-card-bottom')}>
                <Link className={cx('normal-card-title')}
                    to="/"
                >虞兮叹</Link>
                <Link 
                    draggable="false" dir="auto" 
                    to="/artist/1qpe09vYC83Kbgro8hv4HN"
                >闻人听書_</Link>
            </div>
        </div>
    );
};

export default NormalCard;