import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { 
  fetchBrowseData, 
  selectBrowseData
} from '~/redux/slices/browseDataSlice';
import { openModal } from '~/redux/slices/uiSlice';
import { 
    PlayIcon, 
    PlayLargeIcon,
    AddToLibraryIcon, 
    RemoveLibraryIcon, 
    OptionIcon, 
    ItemActiveIcon, 
    EditIcon,
} from '~/assets/icons';
import ScrollWrapper from '~/components/ScrollWrapper/ScrollWrapper';
import ResponsiveTitle from '~/components/ResponsiveTitle/ResponsiveTitle';
import ContentFooter from '~/components/ContentFooter/ContentFooter';
import Button from '~/components/Button/Button';
import EditPlaylistModal from '~/components/EditPlaylistModal/EditPlaylistModal';
import { useSubContext } from '~/hooks/useSubContext';
import { trackListViewAsSubContext } from '~/constants/subContextItems';
import SubContextMenu from '~/components/SubContextMenu/SubContextMenu';
import classNames from 'classnames/bind';
import styles from '~/styles/layouts/MediaDetailLayout.module.scss';

const cx = classNames.bind(styles);

const MediaDetailLayout = React.forwardRef((props, ref) => {
    const {
        coverUrl = '',
        coverFallback = '',
        type = 'playlist',
        title = 'Playlist 2024',
        description = '',
        authorImgUrl,
        authorName = 'linyao926',
        albumName = 'GNZ48',
        releaseDate = '2024',
        duration = '3:19',
        trackCount = '13',
        totalDuration = '49 min 16 sec',
        followerCount = '7,239,676',
        isEditable = false,
        canPlay = true,
        canFollow = false,
        canAddToLibrary = true,
        canShowOptions = true,
        canViewAs = false,
        contentScrollHandler,
        children,
    } = props;

    const dispatch = useDispatch(); 
    const { accessToken } = useSelector((state) => state.auth);
    const viewMode = useSelector((state) => state.ui.viewMode);
    const isSubContextOpen = useSelector((state) => state.ui.subContext.contexts['track-list-view-as'].isOpen);
    const isEditOpen = useSelector((state) => state.ui.modal['edit-playlist'].isOpen);
    const position = useSelector((state) => state.position);
    const { handleOpenSubContext, handleCloseSubContext } = useSubContext();

    const [isInLibrary, setIsInLibrary] = useState(true);
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

    const currentView = trackListViewAsSubContext.find(
        (item) => item.value === viewMode
    );

    return (
      <>
        <ScrollWrapper target={ref} 
            contentScrollHandler={contentScrollHandler} 
            layoutScrollHandler={layoutScrollHandler}
        />
        <div className={cx('media-detail-layout')} ref={ref}>
            <header className={cx('media-detail-header')}
                ref={headerRef}
            >
                <div className={cx('header-background')}></div>
                <div className={cx('gradient-overlay')}></div>
                <div className={cx('cover-img-container')}>
                    {coverUrl 
                    ? <img className={cx('cover-img')} alt='cover' src={coverUrl} />
                    : <span className={cx('cover-img-fallback')}>{coverFallback}</span>
                    }
                    {isEditable && <div className={cx('photo-edit-section')} 
                        onClick={() => dispatch(openModal({id: 'edit-playlist'}))}
                    >
                        <EditIcon />
                        <span>Choose photo</span>
                    </div>}
                </div>
                <div className={cx('media-information-container')}>
                    <span className={cx('media-information-type')}>{type}</span>
                    <ResponsiveTitle 
                        title={title}
                        sidebarWidth={72} 
                        extraComponentWidth={300} 
                        isExtraComponentVisible={false} 
                        clickFunction={() => {
                            if (isEditable) {
                                dispatch(openModal({id: 'edit-playlist'}))
                            }
                        }}
                    />
                    {description && <div>{description}</div>}
                    <div className={cx('media-information-subtitles')}>
                        {authorImgUrl && <img src={authorImgUrl} alt={`${authorName} avatar`}
                            className={cx('media-information-author-img')}
                        />}
                        {authorName && <span className={cx('media-information-author')}>{authorName}</span>}
                        {followerCount && <span>{followerCount}</span>}
                        {albumName && <span className={cx('media-information-album')}>{albumName}</span>}
                        {releaseDate && <span>{releaseDate}</span>}
                        {duration && <span>{duration}</span>}
                        {trackCount && totalDuration && <span className={cx('media-stats')}>
                            <span>{trackCount} songs</span>
                            <span>{totalDuration}</span>
                        </span>}
                    </div>
                </div>
            </header>
            <div className={cx('media-detail-content')}>
                <div className={cx('media-detail-actions-background')}></div>
                <div className={cx('media-detail-actions')}>
                    <div className={cx('media-detail-actions-left')}>
                        {canPlay && <div className={cx('btn-wrapper')}>
                            <Button 
                                hasIcon 
                                icon={<PlayIcon />} 
                                borderRadius="circle" 
                                variant="primary" 
                                size="size-large"
                                iconSize="medium-icon" 
                                padding="0px" 
                            />    
                        </div>}
                        {canFollow && <div className={cx('btn-wrapper')}>
                            <Button
                                borderRadius="rounded" 
                                variant="transparent" 
                                withBorder
                                size="size-small"
                                padding="3px 15px" 
                            >Following</Button>
                        </div>}
                        {canAddToLibrary && <div className={cx('btn-wrapper')}>
                            <Button 
                                hasIcon 
                                icon={isInLibrary ? <RemoveLibraryIcon /> : <AddToLibraryIcon />} 
                                borderRadius="circle" 
                                variant="transparent" 
                                size="size-medium" 
                                padding="0px" 
                                iconSize="large-icon"
                                color={isInLibrary && 'primary-color'}
                            />
                        </div>}
                        {canShowOptions && <Button 
                            hasIcon 
                            icon={<OptionIcon />} 
                            borderRadius="circle" 
                            variant="transparent" 
                            size="size-medium" 
                            padding="0px" 
                            iconSize="large-icon"
                        />}
                    </div>
                    {canViewAs && <div className={cx('view-as-dropdown')}
                        onClick={
                            isSubContextOpen 
                            ? () => handleCloseSubContext('track-list-view-as')
                            : (event) => handleOpenSubContext(event, 'track-list-view-as', 'bottom-right')
                        }
                    >
                        <span className={cx('view-as-dropdown-btn')}>
                            {currentView?.name} {currentView?.iconLeft}
                        </span>
                        {isSubContextOpen && <SubContextMenu 
                            items={trackListSubContext} 
                            position={position} 
                            alignRight
                        />}
                    </div>}
                </div>
                {children}
            </div>
            <ContentFooter />
            {isFixed && <div className={cx('layout-header-fixed')}>
                <div className={cx('layout-header-fixed-background')}></div>
                {canPlay && <div className={cx('btn-wrapper')}>
                    <Button 
                        hasIcon 
                        icon={<PlayLargeIcon />} 
                        borderRadius="circle" 
                        variant="primary" 
                        size="size-base"
                        iconSize="medium-icon" 
                        padding="0px" 
                    />    
                </div>}
                <h3 className={cx('layout-header-fixed-title')}>{title}</h3>
            </div>}
            {isEditOpen && <EditPlaylistModal 
                coverUrl = {coverUrl}
                coverFallback = {coverFallback}
                title = {title}
                description = {description}
            />}
        </div>
      </>
    );
});

export default MediaDetailLayout;