import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomSwiper from './CustomSwiper';
import NormalCard from '~/components/Card/NormalCard/NormalCard';
import { PlayLargeIcon, PrevIcon, NextIcon } from '~/assets/icons';
import Button from '~/components/Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/MediaSection.module.scss';

const cx = classNames.bind(styles);

const MediaSection = (props) => {
    const {
        title = 'Recently played',
        routeLink = '/',
        showAll = true,
    } = props;

    const slidesData = Array(10).fill(<NormalCard />);

    const [isFirstSwiperSlide, setIsFirstSwiperSlide] = useState(true);
    const [isLastSwiperSlide, setIsLastSwiperSlide] = useState(false);
    const [slidesPerView, setSlidesPerView] = useState(5);
    const [slidesOffsetBefore, setSlidesOffsetBefore] = useState(40);
    const [swiperHeight, setSwiperHeight] = useState(null);
    const [swiperBtnTop, setSwiperBtnTop] = useState(null);
    const [slideWidth, setSlideWidth] = useState(200);

    useEffect(() => {
        if (!isFirstSwiperSlide) {
            setSlidesOffsetBefore(0);
        } else {
            setSlidesOffsetBefore(40);
        }
    }, [isFirstSwiperSlide]);
    
    useEffect(() => {
        if (swiperHeight) {
            setSwiperBtnTop(swiperHeight / 2 + 32);
        }
    }, [swiperHeight]);

    const swiperRef = useRef(null);

    const handleNextClick = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext(); 
        }
    };

    const handlePrevClick = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev(); 
        }
    };

    const swiperBtnStyle = (first = false, last = false) => ({
        transition: 'all 0.3s',
        top: swiperBtnTop && `${swiperBtnTop}px`,
        opacity: (first || last) ? '0' : '1',
    });
    
    return (
        <section className={cx('media-section')}>
            <header className={cx('media-section-header')}>
                <Link className={cx('media-section-header-title')}
                      to={routeLink}
                >{title}</Link>
                {showAll && <Link className={cx('media-section-header-sub-title')}
                      to={routeLink}
                >Show all</Link>}
            </header>
            <div className={cx('swiper-wrap')}
                style={{
                    marginLeft: !isFirstSwiperSlide ? `-${slideWidth -40}px` : '-40px',
                }}
            >
                <CustomSwiper 
                    slidesData={slidesData}
                    slidesPerView={slidesPerView}
                    slidesOffsetBefore={slidesOffsetBefore}
                    setIsFirstSwiperSlide={setIsFirstSwiperSlide}
                    setIsLastSwiperSlide={setIsLastSwiperSlide}
                    setSwiperHeight={setSwiperHeight}
                    setSlideWidth={setSlideWidth}
                    swiperRefFromParent={swiperRef}
                />
                <span className={cx('swiper-button-prev')}
                    onClick={handlePrevClick}
                    style={swiperBtnStyle(isFirstSwiperSlide, false)}
                >
                    <Button 
                        hasIcon
                        icon={<PrevIcon />}
                        size="size-small"
                        variant="dark-background"
                        borderRadius="circle"
                        padding="0"
                    />
                </span>
                <span className={cx('swiper-button-next')}
                    onClick={handleNextClick}
                    style={swiperBtnStyle(false, isLastSwiperSlide)}
                >
                    <Button 
                        hasIcon
                        icon={<NextIcon />}
                        size="size-small"
                        variant="dark-background"
                        borderRadius="circle"
                        padding="0"
                    />
                </span>
            </div>
        </section>
    );
};

export default MediaSection;