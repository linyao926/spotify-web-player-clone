import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { register } from 'swiper/element/bundle';
import { SwiperSlide } from 'swiper/react';
import 'swiper/scss';

const CustomSwiper = (props) => {
    const {
        bodyContentWidth = 418,
        slidesData = [],
        slidesPerView = 4,
        slidesOffsetBefore = 40,
        setIsFirstSwiperSlide,
        setIsLastSwiperSlide,
        setSwiperHeight,
        setSlideWidth,
        swiperRefFromParent,
    } = props;

    const swiperRef = useRef(null);

    useEffect(() => {
        // Register Swiper web component
        register();

        if (swiperRefFromParent) {
            swiperRefFromParent.current = {
                slideNext: () => swiperRef.current?.swiper.slideNext(),
                slidePrev: () => swiperRef.current?.swiper.slidePrev(),
            };
        }

        // Add event listener
        swiperRef.current.addEventListener('swiperslidechange', (e) => {
            // console.log(e.detail);

            setSlideWidth(e.detail[0].slidesSizesGrid[0]);

            if (e.detail[0].activeIndex > 0) {
                setIsFirstSwiperSlide(false);
            } else {
                setIsFirstSwiperSlide(true);
            }

            if (e.detail[0].activeIndex === e.detail[0].slides.length - slidesPerView) {
                setIsLastSwiperSlide(true);
            } else {
                setIsLastSwiperSlide(false);
            }
        });

        // Object with parameters
        const params = {
            slidesPerView: slidesPerView,
            // breakpoints: {
            //     768: {
            //         slidesPerView: 4,
            //     },
            // },
            spaceBetween: 0,
            slidesOffsetBefore: slidesOffsetBefore,
        };

        // Assign it to swiper element
        Object.assign(swiperRef.current, params);

        // initialize swiper
        swiperRef.current.initialize();
    }, [slidesOffsetBefore, slidesPerView]);

    useEffect(() => {
        if (swiperRef.current) {
            setSwiperHeight(swiperRef.current.clientHeight);
        }
    });

    return (
        <swiper-container init="false" ref={swiperRef}>
            {slidesData.map((slide, index) => (
                <SwiperSlide key={`slide_${index}`}>
                    {slide}
                </SwiperSlide>
            ))}
        </swiper-container>
    );
};

export default CustomSwiper;