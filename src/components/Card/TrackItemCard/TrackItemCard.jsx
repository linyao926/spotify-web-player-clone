import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router";
import { useDispatch, useSelector } from 'react-redux'; 
import { useSubContext } from '~/hooks/useSubContext';
import useDynamicColumns from '~/hooks/useDynamicColumns';
import { PlayLargeIcon } from '~/assets/icons';
import { formatDate, formatMillisecondsToMinutes } from '~/utils/timeUtils';
import TrackItemCardInfo from './TrackItemCardInfo';
import TrackItemCardActions from './TrackItemCardActions';
import Button from '~/components/Button/Button';
import SubContextMenu from '~/components/SubContextMenu/SubContextMenu';
import classNames from 'classnames/bind';
import styles from '~/styles/components/TrackItemCard.module.scss';

const cx = classNames.bind(styles);

const TrackItemCard = (props) => {
    const {
        id,
        viewAs,
        initialColumns = 5,
        routeLink = '/',
        trackIndex = 1,
        imgUrl = '',
        title = '',
        authors = [''],
        album = '',
        addedDate = '',
        duration = '',
        contextMenu = [],
        showIndex = false,
        showArtist = true,
        showAlbum = false,
        showAddedDate = false,
        showAddToLibrary = false,
        showExpand = false,
    } = props;

    const containerRef = useRef(null);
    const { currentColumns, templateColumns } = useDynamicColumns(containerRef, initialColumns, showIndex);

    const dispatch = useDispatch();
    const isSubContextOpen = useSelector((state) => state.ui.subContext.contexts['normal-card-menu'].isOpen);
    const contextMenuId = useSelector((state) => state.ui.subContext.contexts['normal-card-menu'].id);

    const { 
        positionFixed,
        handleOpenCardMenu, 
        handleCloseCardMenu,
        positionFromBottom,
        positionFromRight, 
        setMenuHeight,
        setMenuWidth, 
    } = useSubContext();

    useEffect(() => {
        document.addEventListener("contextmenu", handleCloseCardMenu);
        return () => {
            document.removeEventListener("contextmenu", handleCloseCardMenu);
        };
    }, []);

    const authorList = authors.map(authorName => (
        <span key={authorName} className={cx('track-item-card-author')}>{authorName}</span>
    ));

    return (
        <Link 
            className={cx('track-item-card', templateColumns, viewAs)}
            to={routeLink}
            ref={containerRef}
            onContextMenu={(event) => handleOpenCardMenu(event, 'normal-card-menu', id)}
        >
            {showIndex && (
                <div className={cx('track-item-index', 'show-play-icon')}>
                    <span>{trackIndex}</span>
                    <span className={cx('play-icon-wrapper')}><PlayLargeIcon /></span>
                </div>
            )}
            {viewAs === 'list' 
                ? <TrackItemCardInfo 
                    imgUrl={imgUrl}
                    title={title}
                    authors={authorList}
                    showIndex={showIndex}
                    showArtist={showArtist}
                /> 
                : <>
                    <span className={cx('track-item-card-title')}>{title}</span>
                    {showArtist && currentColumns >= 4 && <span className={cx('track-item-card-author-wrapper')}>{authorList}</span>}
                </>
            }
            {((currentColumns >= 5 || (viewAs === 'list' && currentColumns >= 4)) || initialColumns >= 3) && showAlbum && <span className={cx('track-item-album')}>{album}</span>}
            {(currentColumns >= 6 || (viewAs === 'list' && currentColumns >= 5)) && showAddedDate && <span className={cx('track-item-added-date')}>{formatDate(addedDate)}</span>}
            {!showAddToLibrary 
                ? <TrackItemCardActions 
                duration={formatMillisecondsToMinutes(duration)}
                />
                : <span className={cx('add-btn-wrapper')}>
                    <Button
                        size="size-small"
                        variant="transparent"
                        borderRadius="rounded"
                        withBorder
                        padding='3px 15px'
                    >Add</Button>
                </span>
            }
            {isSubContextOpen && contextMenuId === id &&  (
                <SubContextMenu 
                    items={contextMenu} 
                    position={positionFixed} 
                    isFixed
                    setMenuHeight={setMenuHeight}
                    setMenuWidth={setMenuWidth}
                    fromBottom={positionFromBottom}
                    fromRight={positionFromRight}
                />
            )}
        </Link>
    );
};

export default TrackItemCard;