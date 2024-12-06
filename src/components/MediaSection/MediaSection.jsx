import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NormalCard from '~/components/Card/NormalCard/NormalCard';
import SwiperWrap from './SwiperWrap';
import Button from '~/components/Button/Button';
import { mapToNormalCardData } from '~/utils/dataMapper';
import classNames from 'classnames/bind';
import styles from '~/styles/components/MediaSection.module.scss';

const cx = classNames.bind(styles);

const MediaSection = (props) => {
    const {
        title = '',
        routeLink = '/',
        showAll = true,
        data = [],
        type = '',
        isSwiper = false,
    } = props;

    const containerRef = useRef(null);

    const [columnCount, setColumnCount] = useState(5);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const adjustColumns = (width) => {
            let count;
            if (width > 1063) {
                count = 6
            } else if (width > 907) {
                count = 5;
            } else if (width > 727) {
                count = 4;
            } else if (width > 549) {
                count = 3;
            } else {
                count = 2;
            }
            setColumnCount(count);
        };

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                adjustColumns(entry.contentRect.width);
            }
        });

        observer.observe(container);

        return () => observer.disconnect();
    }, [containerRef, columnCount]);

    const slidesData = data.map((item, index) => {
        let el;
        if (item[type]) {
            el = item[type];
        } else {
            el = item;
        }

        if (!isSwiper) {
            if (index > columnCount - 1) return;
        }

        const mappedData = mapToNormalCardData(el, type);

        return (
          <NormalCard
            key={el.id}
            imgCircle={mappedData.imgCircle}
            imgUrl={mappedData.imgUrl}
            title={mappedData.title}
            subtitle={mappedData.subtitle}
            routeLink={mappedData.routeLink}
          />
        );
    });
    
    return (
        <section className={cx('media-section')} ref={containerRef}>
            <header className={cx('media-section-header')}>
                <Link className={cx('media-section-header-title')}
                      to={routeLink}
                >{title}</Link>
                {showAll && slidesData.length > columnCount && <Link className={cx('media-section-header-sub-title')}
                      to={routeLink}
                >Show all</Link>}
            </header>
            {isSwiper 
            ? <SwiperWrap data={slidesData} />
            : <div className={cx('grid-wrapper')}>
                {slidesData}
            </div>
            }
        </section>
    );
};

export default MediaSection;