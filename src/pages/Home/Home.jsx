import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchUserTopItems } from '~/redux/slices/userTopItemsSlice';
import { fetchEpisodes } from '~/redux/slices/episodesSlice';
import { PlayIcon } from '~/assets/icons';
import MediaSection from '~/components/MediaSection/MediaSection';
import ContentFooter from '~/components/ContentFooter/ContentFooter';
import Button from '~/components/Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/pages/Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch(); 
    const { accessToken } = useSelector((state) => state.auth);
    const topItems = useSelector((state) => state.userTopItems.items); 
    const topItemsStatus = useSelector((state) => state.userTopItems.status); 
    const topItemsError = useSelector((state) => state.userTopItems.error);

    const episode = useSelector((state) => state.episodes.episode); 

    // useEffect(() => { 
    //   dispatch(fetchUserTopItems({accessToken, type: 'artists'})); 
    // }, [accessToken, dispatch]); 

    // useEffect(() => { 
    //   dispatch(fetchEpisodes({accessToken, id: '1VhbJb7HoPfpdq6MzrkoPp'})); 
    // }, [accessToken, dispatch]); 

    const getHeaderButton = (text, active = true) => {
        return (
          <Button 
            variant={active ? "background-base" : "non-active"}
            borderRadius="rounded"
            size="size-small"
            padding="4px 12px"
            hoverEffect={["hover-none-scale"]} 
          >{text}</Button>
        )
    };

    const getTopItem = (imgUrl, name) => {
        return (
          <div className={cx("item-wrapper")}>
            <img 
              src={imgUrl} 
              alt={`${name} avatar`} 
              className={cx("item-img")} 
              loading='lazy'
            />
            <div className={cx("item-details")}>
              <span className={cx("item-name")}>{name}</span>
              <span className={cx("item-btn-wrapper")}>
                <Button 
                  hasIcon 
                  icon={<PlayIcon />} 
                  borderRadius="circle" 
                  variant="primary" 
                  size="size-small" 
                  padding="8px" 
                />
              </span>
            </div>
          </div>
        )
    };
    
    return (
      <div className={cx('home-page')}>
        <header className={cx("home-page-header-buttons")}>
            {getHeaderButton('All')}
            {getHeaderButton('Music', false)}
            {getHeaderButton('Podcasts', false)}
        </header>
        <div className={cx('home-page-content')}>
          <section className={cx("content-top-items")}>
            {getTopItem('https://i.scdn.co/image/ab67616d0000b273837c410cf75e723672455329', 'Liked Songs')}
            {getTopItem('https://i.scdn.co/image/ab67616d0000b273837c410cf75e723672455329', 'Liked Songs')}
            {getTopItem('https://i.scdn.co/image/ab67616d0000b273837c410cf75e723672455329', 'Liked Songs')}
            {getTopItem('https://i.scdn.co/image/ab67616d0000b273837c410cf75e723672455329', 'Liked Songs')}
          </section>

          <MediaSection />
        </div>
        <ContentFooter />
      </div>
    );
}
  
export default Home;