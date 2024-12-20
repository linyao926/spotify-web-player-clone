import React, { useRef, useEffect, useState } from 'react';
import { PrevIcon, NextIcon } from '~/assets/icons';
import CustomSwiper from './CustomSwiper';
import NormalCard from '~/components/Card/NormalCard/NormalCard';
import Button from '~/components/Button/Button';
import { mapToNormalCardData } from '~/utils/dataMapper';
import classNames from 'classnames/bind';
import styles from '~/styles/components/MediaSection.module.scss';

const cx = classNames.bind(styles);

const SwiperWrap = (props) => {
    const {
        data = [],
    } = props;

    const [isFirstSwiperSlide, setIsFirstSwiperSlide] = useState(true);
    const [isLastSwiperSlide, setIsLastSwiperSlide] = useState(false);
    const [slidesPerView, setSlidesPerView] = useState(5);
    const [slidesOffsetBefore, setSlidesOffsetBefore] = useState(40);
    const [swiperHeight, setSwiperHeight] = useState(null);
    const [swiperBtnTop, setSwiperBtnTop] = useState(null);
    const [slideWidth, setSlideWidth] = useState(200);
    const [marginContent, setMarginContent] = useState(40);

    const swiperRef = useRef(null);

    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        const spacingValue = rootStyles.getPropertyValue('--content-spacing').trim();
        const spacingCardValue = rootStyles.getPropertyValue('--padding-normal-card').trim();
        const result = parseInt(spacingValue, 10) + parseInt(spacingCardValue, 10);
        setMarginContent(result);
    }, []);

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

    const swiperBtnStyle = {
        transition: 'all 0.3s',
        top: swiperBtnTop && `${swiperBtnTop}px`,
    };
    
    return (
        <div className={cx('swiper-wrap')}
            style={{
                marginLeft: !isFirstSwiperSlide ? `-${slideWidth - marginContent}px` : `-${marginContent}px`,
            }}
        >
            <CustomSwiper 
                slidesData={data}
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
                style={{
                    ...swiperBtnStyle, 
                    opacity: isFirstSwiperSlide ? 0 : 1,
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
                onClick={handleNextClick}
                style={{
                    ...swiperBtnStyle, 
                    opacity: isLastSwiperSlide ? 0 : 1,
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
    );
};

export default SwiperWrap;