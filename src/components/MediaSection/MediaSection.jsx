import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper,  SwiperSlide } from 'swiper/react';
import NormalCard from '~/components/Card/NormalCard/NormalCard';
import { PlayLargeIcon, PrevIcon, NextIcon } from '~/assets/icons';
import Button from '~/components/Button/Button';
// Import Swiper styles
import 'swiper/scss';

import classNames from 'classnames/bind';
import styles from '~/styles/components/MediaSection.module.scss';

const cx = classNames.bind(styles);

const MediaSection = (props) => {
    const {
        title = 'Recently played',
        routeLink = '/',
        showAll = true,
    } = props;

    const swiperRef = useRef();

    const [isFirstSwiperSlide, setIsFirstSwiperSlide] = useState(true);
    const [isLastSwiperSlide, setIsLastSwiperSlide] = useState(false);
    const [slidesPerView, setSlidesPerView] = useState(5);

    const transitionStyle = {transition: 'all 0.3s'};
    
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
                    marginLeft: !isFirstSwiperSlide ? `-${swiperRef.current?.slidesSizesGrid[0] -40}px` : '-40px',
                    ...transitionStyle,
                }}
            >
                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={() => {
                        // console.log(swiperRef.current)
                        if (swiperRef.current.activeIndex > 0) {
                            setIsFirstSwiperSlide(false);
                        } else {
                            setIsFirstSwiperSlide(true);
                        }

                        if (swiperRef.current.activeIndex === swiperRef.current.slides.length - slidesPerView) {
                            setIsLastSwiperSlide(true);
                        } else {
                            setIsLastSwiperSlide(false);
                        }
                    }}
                    spaceBetween={0}
                    slidesPerView={slidesPerView}
                    slidesOffsetBefore={40}
                    // slidesOffsetAfter={swiperRef.current?.slidesSizesGrid[0] + 40}
                >
                    <SwiperSlide>
                        <NormalCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <NormalCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <NormalCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <NormalCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <NormalCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <NormalCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <NormalCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <NormalCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <NormalCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <NormalCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <NormalCard />
                    </SwiperSlide>
                </Swiper>
                <span className={cx('swiper-button-prev')}
                    onClick={() => swiperRef.current.slidePrev()}
                    style={{
                        top: `${swiperRef.current?.wrapperEl.clientHeight / 2 + 32}px`,
                        opacity: isFirstSwiperSlide ? '0' : '1',
                        ...transitionStyle,
                    }}
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
                    onClick={() => swiperRef.current.slideNext()}
                    style={{
                        top: swiperRef.current && `${swiperRef.current?.wrapperEl.clientHeight / 2 + 32}px`,
                        opacity: isLastSwiperSlide ? '0' : '1',
                        ...transitionStyle,
                    }}
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