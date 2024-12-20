import React, { useEffect } from 'react';
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux'; 
import { useSubContext } from '~/hooks/useSubContext';
import { PlayLargeIcon, PinnedIcon } from '~/assets/icons';
import { formatDate } from '~/utils/timeUtils';
import Tooltip from '../../Tooltip/Tooltip';
import SubContextMenu from '~/components/SubContextMenu/SubContextMenu';
import classNames from 'classnames/bind';
import styles from '~/styles/components/LibraryItemCard.module.scss';

const cx = classNames.bind(styles);

const LibraryItemCard = (props) => {
    const {
        id,
        routeLink = '', 
        imgUrl = '',
        imgFallback = '',
        imgCircle = false,
        title = '',
        type = '',
        author = '',
        showMore = false,
        collapse = false,
        viewAs = 'list',
        addedDate = '',
        played = '',
        contextMenu = [],
        isPinned = false,
    } = props;

    const navigate = useNavigate();
    const isSubContextOpen = useSelector((state) => state.ui.subContext.contexts['library-card-menu'].isOpen);
    const contextMenuId = useSelector((state) => state.ui.subContext.contexts['library-card-menu'].id);

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

    if (collapse) {
        return (
            <div className={cx('library-item-card', viewAs)}
                onClick={() => {
                    navigate(routeLink);
                }}
                onContextMenu={(event) => handleOpenCardMenu(event, 'library-card-menu', id)}
            >
                <div className={cx('library-item-card-info')}>
                    <Tooltip content={<div className={cx('library-item-info-text')}>
                            <span className={cx('library-item-title')}>{title}</span>
                            <div className={cx('library-item-sub-title')}>
                                <span className={cx('library-item-type')}>{type}</span>
                                <span className={cx('library-item-author')}>{author}</span>
                            </div>
                        </div>} 
                        position = "right"
                        isSubdued
                    >
                        <div className={cx('library-item-img-wrapper')}>
                            {imgUrl 
                            ? <img 
                                draggable="false" 
                                loading="lazy" 
                                src={imgUrl} 
                                alt="" 
                                className={cx('library-item-img', imgCircle && 'circle')} 
                            />
                            : <span className={cx('library-item-img', 'fallback', imgCircle && 'circle', 'img-fallback')}>{imgFallback}</span>
                            }
                            <span className={cx('play-icon-wrapper')}><PlayLargeIcon /></span>
                        </div>
                    </Tooltip>
                </div>
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
            </div>
        );
    }

    return (
        <div className={cx('library-item-card', viewAs)}
            onClick={() => {
                navigate(routeLink);
            }}
            onContextMenu={(event) => handleOpenCardMenu(event, 'library-card-menu', id)}
        >
            <div className={cx('library-item-card-info')}>
                {viewAs === 'list' && <div className={cx('library-item-img-wrapper')}>
                    {imgUrl 
                    ? <img 
                        draggable="false" 
                        loading="lazy" 
                        src={imgUrl} 
                        alt="" 
                        className={cx('library-item-img', imgCircle && 'circle')} 
                    />
                    : <span className={cx('library-item-img', 'fallback', imgCircle && 'circle', 'img-fallback')}>{imgFallback}</span>
                    }
                    <span className={cx('play-icon-wrapper')}><PlayLargeIcon /></span>
                </div>}
                {viewAs === 'list' ? <div className={cx('library-item-info-text')}>
                    <span className={cx('library-item-title')}>{title}</span>
                    <div className={cx('library-item-sub-title')}>
                        <span className={cx('library-item-type', isPinned && 'pinned')}>
                            <span>{isPinned && <PinnedIcon />}</span>
                            {type}
                        </span>
                        <span className={cx('library-item-author')}>{author}</span>
                    </div>
                </div>
                : <div className={cx('library-item-sub-title')}>
                    <span className={cx('library-item-title', isPinned && 'pinned')}>
                        {isPinned && <PinnedIcon />}
                        <span>{title}</span>
                    </span>
                    <span className={cx('library-item-type')}>{type}</span>
                </div>}
            </div>
           {showMore && <>
                <span className={cx('library-item-added-date')}>{formatDate(addedDate)}</span>
                <span className={cx('library-item-played')}>{played && formatDate(played)}</span>
           </>}
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
        </div>
    );
};

export default LibraryItemCard;