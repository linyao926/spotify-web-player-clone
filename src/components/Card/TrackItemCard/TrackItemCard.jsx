import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router";
import { useDispatch, useSelector } from 'react-redux'; 
import { useQueueHandler } from '~/hooks/useQueueHandler';
import { useSubContext } from '~/hooks/useSubContext';
import useDynamicColumns from '~/hooks/useDynamicColumns';
import { PlayLargeIcon, PauseLargeIcon } from '~/assets/icons';
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
        parent = {},
        viewAs = 'list',
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
        showOptionOnly = false,
        displayInNextQueue = false,
        displayInNextFrom = false,
        displayInContentPage = false,
    } = props;

    const containerRef = useRef(null);
    const { currentColumns, templateColumns } = useDynamicColumns(containerRef, initialColumns, showIndex);
    const { handlePlayClick } = useQueueHandler({ 
        type: parent.type, 
        id: parent.id, 
        title: parent.title, 
        coverUrl: parent.cover,
        trackId: id,
        data: parent.data ? parent.data : [],
        inNext: {
            nextQueue: displayInNextQueue,
            nextFrom: displayInNextFrom,
        }
    });

    const dispatch = useDispatch();
    const isSubContextOpen = useSelector((state) => state.ui.subContext['normal-card-menu'].isOpen);
    const contextMenuId = useSelector((state) => state.ui.subContext['normal-card-menu'].id);
    const queuePlaylist = useSelector((state) => state['queue'].queueData);
    const itemIsPlaying = useSelector((state) => state['queue'].itemIsPlaying);
    const nowPlaying = useSelector((state) => state['queue'].nowPlaying);

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

    const authorList = authors.map(author => (
        <span key={author.id} className={cx('track-item-card-author')}>{author.name}</span>
    ));

    const uniqueId = `${displayInNextQueue ? 'next-queue' : displayInNextFrom ? 'next-from' : displayInContentPage ? 'content-page' : 'normal'}-${id}`;

    return (
        <Link 
            className={cx('track-item-card', templateColumns, viewAs)}
            to={routeLink}
            ref={containerRef}
            onContextMenu={(event) => handleOpenCardMenu(event, 'normal-card-menu', uniqueId)}
        >
            {showIndex && (
                <div className={cx('track-item-index', 'show-play-icon', (!displayInNextFrom && itemIsPlaying && nowPlaying && nowPlaying.id === id) && 'playing')}>
                    <span>{trackIndex}</span>
                    <span className={cx('play-icon-wrapper')}
                        onClick={(event) => handlePlayClick(event)}
                    >{(itemIsPlaying && nowPlaying && nowPlaying.id === id) ? <PauseLargeIcon /> : <PlayLargeIcon />}</span>
                </div>
            )}
            {viewAs === 'list' 
                ? <TrackItemCardInfo 
                    id={id}
                    imgUrl={imgUrl}
                    title={title}
                    authors={authorList}
                    showIndex={showIndex}
                    showArtist={showArtist}
                    handlePlayClick={handlePlayClick}
                    queuePlaylist={queuePlaylist}
                    itemIsPlaying={itemIsPlaying}
                    nowPlaying={nowPlaying}
                    displayInNextFrom={displayInNextFrom}
                /> 
                : <>
                    <span className={cx('track-item-card-title')}>{title}</span>
                    {showArtist && currentColumns >= 4 && <span className={cx('track-item-card-author-wrapper')}>{authorList}</span>}
                </>
            }
            {((currentColumns >= 5 || (viewAs === 'list' && currentColumns >= 4))) && showAlbum && <span className={cx('track-item-album')}>{album}</span>}
            {(currentColumns >= 6 || (viewAs === 'list' && currentColumns >= 5)) && showAddedDate && <span className={cx('track-item-added-date')}>{formatDate(addedDate)}</span>}
            {!showAddToLibrary 
                ? <TrackItemCardActions 
                    duration={formatMillisecondsToMinutes(duration)}
                    showOptionOnly={showOptionOnly}
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
            {isSubContextOpen && contextMenuId === uniqueId &&  (
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