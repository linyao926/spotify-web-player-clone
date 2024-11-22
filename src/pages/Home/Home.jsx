import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { 
  fetchHomeData, 
  selectRecentlyPlayed, 
  selectRecommendedToday, 
  selectPopularPlaylist, 
  selectNewReleases,
  selectTopArtists,
  selectTopTracks,
} from '~/redux/slices/homeDataSlice';
import ScrollWrapper from '~/components/ScrollWrapper/ScrollWrapper';
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
    const recentlyPlayed = useSelector(selectRecentlyPlayed);
    const recommendedToday = useSelector(selectRecommendedToday);
    const popularplaylist = useSelector(selectPopularPlaylist);
    const newReleases = useSelector(selectNewReleases);
    const topArtists = useSelector(selectTopArtists);
    const topTracks = useSelector(selectTopTracks);
    const loading = useSelector((state) => state.home.loading);
    const error = useSelector((state) => state.home.error);

    const contentRef = useRef(null);

    useEffect(() => {
      if (accessToken) {
        dispatch(fetchHomeData(accessToken));
      }
    }, [accessToken, dispatch]);

    // console.log(topTracks)

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
        <>
          <ScrollWrapper target={contentRef} />
          <div className={cx('home-page')} ref={contentRef}>
            <header className={cx("home-page-header-buttons")}>
                {getHeaderButton('All')}
                {getHeaderButton('Music', false)}
                {getHeaderButton('Podcasts', false)}
            </header>
            <div className={cx('home-page-content')}>
              <section className={cx("content-top-items")}>
                {getTopItem(topArtists[0]?.images[0]?.url, topArtists[0]?.name)}
                {getTopItem(topArtists[1]?.images[0]?.url, topArtists[1]?.name)}
                {getTopItem(topTracks[0]?.album?.images[0]?.url, topTracks[0]?.name)}
                {getTopItem(topTracks[1]?.album?.images[0]?.url, topTracks[1]?.name)}
              </section>

              {recentlyPlayed.length > 0 && <MediaSection 
                  data={recentlyPlayed}
                  type="track"
                  title='Recently played'
                  routeLink = '/genre/recently-played'
              />}

              {recommendedToday.length > 0 && <MediaSection 
                  data={recommendedToday}
                  type="album"
                  title='Recommended for today'
                  routeLink = '/section/recommended-today'
              />}

              {popularplaylist.length > 0 && <MediaSection 
                  data={popularplaylist}
                  type="playlist"
                  title='PopularPlaylist'
                  routeLink = '/section/popularplaylist'
              />}

              {newReleases.length > 0 && <MediaSection 
                  data={newReleases}
                  type="album"
                  title='New Releases'
                  routeLink = '/section/new-releases'
              />}
            </div>
            <ContentFooter />
          </div>
        </>
    );
}
  
export default Home;