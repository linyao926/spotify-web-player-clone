import React, { useRef, useEffect, useState } from 'react';
import { Link } from "react-router";
import { useDispatch } from 'react-redux';
import { useWindowSize } from 'react-use';
import NormalCard from '~/components/Card/NormalCard/NormalCard';
import SwiperWrap from './SwiperWrap';
import {
    playlistContextMenu,
    myPlaylistContextMenu,
    albumContextMenu,
    artistContextMenu,
} from '~/constants/subContextItems';
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

    const dispatch = useDispatch();
    const containerRef = useRef(null);
    const { width } = useWindowSize();

    const [columnCount, setColumnCount] = useState(5);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const adjustColumns = (contentWidth, paddingLeft, paddingRight) => {
            const width = contentWidth + paddingLeft + paddingRight;
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
                const computedStyle = window.getComputedStyle(entry.target);
                const paddingLeft = parseFloat(computedStyle.paddingLeft);
                const paddingRight = parseFloat(computedStyle.paddingRight);
                
                adjustColumns(entry.contentRect.width, paddingLeft, paddingRight);
            }
        });

        observer.observe(container);

        return () => observer.disconnect();
    }, [containerRef, columnCount, width]);

    const slidesData = data.map((item, index) => {
        let el;
        if (item[type]) {
            el = item[type];
        } else {
            el = item;
        }

        let contextMenu = playlistContextMenu(item.id, 'ADD', dispatch);

        if (item.type === 'album') {
            contextMenu = albumContextMenu(item.id, 'ADD', dispatch);
        } else if (item.type === 'artist') {
            contextMenu = artistContextMenu(item.id, 'ADD', dispatch);
        }

        if (!isSwiper) {
            if (index > columnCount - 1) return;
        }

        const mappedData = mapToNormalCardData(el, type);

        return (
          <NormalCard
            key={el.id}
            id={el.id}
            imgCircle={mappedData.imgCircle}
            imgUrl={mappedData.imgUrl}
            title={mappedData.title}
            subtitle={mappedData.subtitle}
            routeLink={`/${type}/${el.id}`}
            contextMenu = {contextMenu}
            type={type}
            author={el.artists ? el.artists[0] : null}
            trackTotal={el['total_tracks'] ? el['total_tracks'] : 10}
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