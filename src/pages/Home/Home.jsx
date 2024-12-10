import React, { useRef, useState } from 'react';
import { useNavigate, useLoaderData } from "react-router";
import useExtractColors from "~/hooks/useExtractColors";
import ScrollWrapper from '~/components/ScrollWrapper/ScrollWrapper';
import { PlayIcon } from '~/assets/icons';
import FilterBar from '~/components/FilterBar/FilterBar';
import MediaSection from '~/components/MediaSection/MediaSection';
import ContentFooter from '~/components/ContentFooter/ContentFooter';
import Button from '~/components/Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/pages/Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const { 
      recentlyPlayed, 
      newReleases, 
      topArtists, 
      topTracks, 
      recommendedToday, 
      popularplaylist 
    } = useLoaderData();

    const [isTransparent, setIsTransparent] = useState(true);
    const [trigger, setTrigger] = useState(false);
    const [currentUrl, setCurrentUrl] = useState(null);

    const containerRef = useRef(null);
    const headerBGRef = useRef(null);

    const { backgroundBase } = useExtractColors(currentUrl);
    let navigate = useNavigate();

    const layoutScrollHandler = (scrollY) => {
        if (!containerRef.current || !headerBGRef.current) return;

        const headerBGRect = headerBGRef.current.getBoundingClientRect();

        if (scrollY > headerBGRect.bottom - 120) {
          setIsTransparent(false);
          setTrigger(false);
        } else if (scrollY > headerBGRect.bottom / 2 - 120) {
          setTrigger(true);
          setIsTransparent(true);
        } 
        
        if (scrollY < headerBGRect.bottom - 120)  {
          setIsTransparent(true);
        }
    };

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

    const getTopItem = (item) => {
        return (
          <div className={cx("item-wrapper")}
            onMouseEnter={() => setCurrentUrl(item?.images ? item?.images[0].url : item?.album.images[0]?.url)}
            onMouseLeave={() => setCurrentUrl(topTracks[0]?.album?.images[0]?.url)}
            onClick={() => {
              navigate(`/${item?.type}/${item?.id}`);
            }}
          >
            <img 
              src={item?.images ? item?.images[0].url : item?.album.images[0]?.url} 
              alt={`${item?.name} avatar`} 
              className={cx("item-img")} 
              loading='lazy'
            />
            <div className={cx("item-details")}>
              <span className={cx("item-name")}>{item?.name}</span>
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
          <ScrollWrapper target={containerRef}
            layoutScrollHandler={layoutScrollHandler}
          />
          <div className={cx('home-page')} ref={containerRef}>
            <div className={cx('home-page-header-background')}
              style={{
                backgroundColor: backgroundBase,
              }}
              ref={headerBGRef}
            ></div>
            <header className={cx("home-page-header-buttons")}>
                <div className={cx("home-page-header-buttons-bg")}
                  style={{
                    backgroundColor: backgroundBase,
                    opacity: isTransparent ? (trigger ? '0.5' : '0') : '1',
                  }}
                ></div>
                <FilterBar
                  filters={[
                    { value: 'music', label: 'Music' },
                    { value: 'podcast', label: 'Podcasts' }
                  ]}
                  onFilterChange={(filter) => console.log('Filter changed to:', filter)}
                  hasAll
                  isLibrary={false}
                />
            </header>
            <div className={cx('home-page-content')} >
              {<section className={cx("content-top-items")}>
                {getTopItem(topArtists[0])}
                {getTopItem(topArtists[1])}
                {getTopItem(topTracks[0])}
                {getTopItem(topTracks[1])}
              </section>}

              {/* {recentlyPlayed.length > 0 && <MediaSection 
                  data={recentlyPlayed}
                  type="track"
                  title='Recently played'
                  routeLink = '/genre/recently-played'
              />} */}

              {/* {recommendedToday.length > 0 && <MediaSection 
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
              />} */}

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