import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useQueueHandler } from '~/hooks/useQueueHandler';
import { useSubContext } from '~/hooks/useSubContext';
import useExtractColors from "~/hooks/useExtractColors";
import { 
    ItemActiveIcon, 
} from '~/assets/icons';
import { trackListViewAsSubContext } from '~/constants/subContextItems';
import Header from './Header';
import ActionsBar from './ActionsBar';
import ScrollWrapper from '~/components/ScrollWrapper/ScrollWrapper';
import ContentFooter from '~/components/ContentFooter/ContentFooter';
import PlayButton from '~/components/PlayButton/PlayButton';
import EditPlaylistModal from '~/components/EditPlaylistModal/EditPlaylistModal';
import classNames from 'classnames/bind';
import styles from '~/styles/layouts/MediaDetailLayout.module.scss';

const cx = classNames.bind(styles);

const MediaDetailLayout = React.forwardRef((props, ref) => {
    const {
        id = '',
        coverUrl = '',
        coverFallback = '',
        type = '',
        title = '',
        description = '',
        authorImgUrl,
        authorName = '',
        authorId = '',
        albumName = '',
        albumId = '',
        releaseDate = '',
        duration = '',
        trackCount = '',
        totalDuration = '',
        publicPlaylists = '',
        followingCount = '',
        followerCount = '',
        isEditable = false,
        canPlay = true,
        canFollow = false,
        canAddToLibrary = false,
        canShowOptions = false,
        canViewAs = false,
        contentScrollHandler,
        coverIsCircle,
        children,
    } = props;

    const dispatch = useDispatch(); 
    const viewMode = useSelector((state) => state.ui.viewMode);
    const isSubContextOpen = useSelector((state) => state.ui.subContext['track-list-view-as'].isOpen);
    const isEditOpen = useSelector((state) => state.ui.modal['edit-playlist'].isOpen);
    const position = useSelector((state) => state.position);
    const queuePlaylist = useSelector((state) => state['queue'].queueData);
    const itemIsPlaying = useSelector((state) => state['queue'].itemIsPlaying);

    const { backgroundBase } = useExtractColors(coverUrl);
    const { handleOpenSubContext, handleCloseSubContext } = useSubContext();
    const { handlePlayClick } = useQueueHandler({ type, id, title, coverUrl });

    const [isInLibrary, setIsInLibrary] = useState(false);
    const [trackListSubContext, setTrackListSubContext] = useState(trackListViewAsSubContext);
    const [isFixed, setIsFixed] = useState(false);

    const headerRef = useRef(null);

    useEffect(() => {
        const updatedTrackListSubContext = trackListSubContext.map((item) => {
            if (item.value === viewMode) {
                return {
                    ...item,
                    iconRight: <ItemActiveIcon />,
                    active: true
                };
            } else {
                return {
                    ...item,
                    iconRight: null,
                    active: false
                };
            }
        });
    
        setTrackListSubContext(updatedTrackListSubContext);
    }, [viewMode]);

    const layoutScrollHandler = (scrollY) => {
        if (!ref.current || !headerRef.current) return;

        const headerRect = headerRef.current.getBoundingClientRect();

        if (scrollY > headerRect.bottom) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    };

    return (
      <>
        <ScrollWrapper target={ref} 
            contentScrollHandler={contentScrollHandler} 
            layoutScrollHandler={layoutScrollHandler}
        />
        <div className={cx('media-detail-layout')} ref={ref}>
            <Header
                coverUrl={coverUrl}
                coverFallback={coverFallback}
                isEditable={isEditable}
                backgroundBase={backgroundBase}
                coverIsCircle={coverIsCircle}
                title={title}
                description={description}
                dispatch={dispatch}
                type = {type}
                authorImgUrl = {authorImgUrl}
                authorName = {authorName}
                authorId = {authorId}
                albumName = {albumName}
                albumId = {albumId}
                releaseDate = {releaseDate}
                duration = {duration}
                trackCount = {trackCount}
                totalDuration = {totalDuration}
                publicPlaylists = {publicPlaylists}
                followingCount = {followingCount}
                followerCount = {followerCount}
            />
            <div className={cx('media-detail-content')}>
                <div className={cx('media-detail-actions-background')}
                    style={{
                        backgroundColor: backgroundBase,
                    }}
                ></div>
                <ActionsBar
                    id={id}
                    handlePlayClick={handlePlayClick}
                    queuePlaylist={queuePlaylist}
                    itemIsPlaying={itemIsPlaying}
                    canPlay={canPlay}
                    canFollow={canFollow}
                    canAddToLibrary={canAddToLibrary}
                    canShowOptions={canShowOptions}
                    canViewAs={canViewAs}
                    title={title}
                    trackListSubContext={trackListSubContext}
                    isSubContextOpen={isSubContextOpen}
                    position={position}
                    handleOpenSubContext={handleOpenSubContext}
                    handleCloseSubContext={handleCloseSubContext}
                    isInLibrary={isInLibrary}
                    setIsInLibrary={setIsInLibrary}
                />
                {children}
            </div>
            <ContentFooter />
            {isFixed && <div className={cx('layout-header-fixed')}
                style={{
                    backgroundColor: backgroundBase,
                }}
            >
                <div className={cx('layout-header-fixed-background')}
                    style={{
                        backgroundColor: backgroundBase,
                    }}
                ></div>
                {canPlay && <div className={cx('btn-wrapper')}>
                    <PlayButton size={48} title={title} 
                        clickFunction={(event) => handlePlayClick(event)}
                        itemIsPlaying={itemIsPlaying ? queuePlaylist.id === id : false}
                    /> 
                </div>}
                <h3 className={cx('layout-header-fixed-title')}>{title}</h3>
            </div>}
            {isEditOpen && (
                <EditPlaylistModal
                    coverUrl={coverUrl}
                    coverFallback={coverFallback}
                    title={title}
                    description={description}
                    id={id}
                />
            )}
        </div>
      </>
    );
});

export default MediaDetailLayout;