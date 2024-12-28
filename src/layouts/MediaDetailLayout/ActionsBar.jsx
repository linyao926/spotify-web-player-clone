import React from 'react';
import { 
    AddToLibraryIcon, 
    RemoveLibraryIcon, 
    OptionIcon, 
} from '~/assets/icons';
import Button from '~/components/Button/Button';
import PlayButton from '~/components/PlayButton/PlayButton';
import SubContextMenu from '~/components/SubContextMenu/SubContextMenu';
import classNames from 'classnames/bind';
import styles from '~/styles/layouts/MediaDetailLayout.module.scss';

const cx = classNames.bind(styles);

const ActionsBar = (props) => {
    const {
        id,
        handlePlayClick,
        queuePlaylist,
        itemIsPlaying,
        canPlay,
        canFollow,
        canAddToLibrary,
        canShowOptions,
        canViewAs,
        title,
        trackListSubContext,
        isSubContextOpen,
        position,
        handleOpenSubContext,
        handleCloseSubContext,
        isInLibrary,
        setIsInLibrary,
    } = props;
    
    const currentView = trackListSubContext.find((item) => item.active);
    const handleOpenMenuClick = (event) => {
        if (isSubContextOpen) {
            handleCloseSubContext('track-list-view-as');
        } else {
            handleOpenSubContext(event, 'track-list-view-as', 'bottom-right');
        }
    };

    return (
        <div className={cx('media-detail-actions')}>
            <div className={cx('media-detail-actions-left')}>
                {canPlay && (
                    <div className={cx('btn-wrapper')}>
                        <PlayButton size={56} title={title} 
                            clickFunction={(event) => handlePlayClick(event)}
                            itemIsPlaying={itemIsPlaying ? queuePlaylist.id === id : false}
                        />
                    </div>
                )}
                {canFollow && (
                    <div className={cx('btn-wrapper')}>
                        <Button
                            borderRadius="rounded"
                            variant="transparent"
                            withBorder
                            size="size-small"
                            padding="3px 15px"
                        >
                            Following
                        </Button>
                    </div>
                )}
                {canAddToLibrary && (
                    <div className={cx('btn-wrapper')}>
                        <Button
                            hasIcon
                            icon={isInLibrary ? <RemoveLibraryIcon /> : <AddToLibraryIcon />}
                            borderRadius="circle"
                            variant="transparent"
                            size="size-medium"
                            padding="0px"
                            iconSize="large-icon"
                            color={isInLibrary && 'primary-color'}
                            onClick={() => setIsInLibrary(!isInLibrary)}
                        />
                    </div>
                )}
                {canShowOptions && (
                    <Button
                        hasIcon
                        icon={<OptionIcon />}
                        borderRadius="circle"
                        variant="transparent"
                        size="size-medium"
                        padding="0px"
                        iconSize="large-icon"
                    />
                )}
            </div>
            {canViewAs && (
                <div
                    className={cx('view-as-dropdown')}
                    onClick={(event) => handleOpenMenuClick(event)}
                >
                    <span className={cx('view-as-dropdown-btn')}>
                        {currentView?.name} {currentView?.iconLeft}
                    </span>
                    {isSubContextOpen && (
                        <SubContextMenu
                            items={trackListSubContext}
                            position={position}
                            alignRight
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default ActionsBar;