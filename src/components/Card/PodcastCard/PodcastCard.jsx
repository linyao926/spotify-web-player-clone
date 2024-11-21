import React from 'react';
import { Link } from 'react-router-dom';
import { PlayLargeIcon, AddToLibraryIcon, OptionIcon } from '~/assets/icons';
import Button from '~/components/Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/PodcastCard.module.scss';

const cx = classNames.bind(styles);

const PodcastCard = (props) => {
    const {
        routeLink = '/',
        title = 'Tây Du Ký - Ngô Thừa Ân E100 - End',
        authorName = 'Truyện dài - Truyện ngắn',
        postedDate = 'Sep 18',
        duration = '41 min 50 sec',
        descriptionText = 'Tây Du Ký - Ngô Thừa Ân E100 - End Cảm ơn các bạn đã ủng hộ kênh Podcast, mọi thông tin xin liên hệ qua email: locla29993@gmail.com Các bạn có thể donate ủng hộ qua:  - Vietcombank: 1024284304 CTK Ngo Xuan Loc - Paypal: https://paypal.me/locla299',
        imgUrl = 'https://i.scdn.co/image/ab67616d00001e0227c1a17d71ecaf008c1357e7',
        thumbnail = 'https://i.scdn.co/image/ab6765630000f68d51615a100f8f3702c49b2910'
    } = props;

    return (
        <div className={cx('podcast-card')}>
            <div className={cx('podcast-card-background')}></div>
            <div className={cx('podcast-card-mark')}></div>
            <header className={cx('podcast-card-info')}>
                <span className={cx('podcast-card-title')}>{title}</span>
                <div className={cx('podcast-card-sub-title')}>
                    <span>Episode</span>
                    <span className={cx('podcast-card-author')}>{authorName}</span>
                </div>
            </header>
            <div className={cx('podcast-card-img-wrapper')}>
                <img 
                    draggable="false" 
                    loading="lazy" 
                    src={imgUrl} 
                    alt="" 
                    className={cx('podcast-card-img')} 
                />
                {thumbnail && <img 
                    draggable="false" 
                    loading="lazy" 
                    src={thumbnail} 
                    alt="" 
                    className={cx('podcast-card-thumbnail')} 
                />}
            </div>
            <div className={cx('podcast-card-description')}>
                <span className={cx('podcast-card-posted-date')}>{postedDate}</span>
                <span className={cx('podcast-card-duration')}>{duration}</span>
                <span className={cx('podcast-card-description-text')}>{descriptionText}</span>
            </div>

            <footer className={cx('podcast-card-actions')}>
                <Button 
                  hasIcon 
                  icon={<OptionIcon />} 
                  borderRadius="circle" 
                  variant="transparent" 
                  size="size-medium" 
                  padding="8px" 
                  iconSize="large-icon"
                />
                <Button 
                  hasIcon 
                  icon={<AddToLibraryIcon />} 
                  borderRadius="circle" 
                  variant="transparent" 
                  size="size-medium" 
                  padding="8px" 
                  iconSize="large-icon"
                />
                <Button 
                  hasIcon 
                  icon={<PlayLargeIcon />} 
                  borderRadius="circle" 
                  variant="background-base" 
                  size="size-base" 
                  iconSize="medium-icon"
                  padding="8px" 
                  withBoxshadow
                />
            </footer>
        </div>
    );
};

export default PodcastCard;