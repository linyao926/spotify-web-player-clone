import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux'; 
import { useSubContext } from '~/hooks/useSubContext';
import { PlayLargeIcon } from '~/assets/icons';
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
        contextMenu,
    } = props;

    const navigate = useNavigate();
    const isSubContextOpen = useSelector((state) => state.ui.subContext.contexts['library-item-menu'].isOpen);
    const contextMenuId = useSelector((state) => state.ui.subContext.contexts['library-item-menu'].id);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const { handleOpenSubContext, handleCloseSubContext } = useSubContext();

    useEffect(() => {
        document.addEventListener("contextmenu", handleClickOutside);
        return () => {
          document.removeEventListener("contextmenu", handleClickOutside);
        };
    }, []);

    const handleRightClick = (event) => {
        event.preventDefault(); 
        if (isSubContextOpen && contextMenuId === id) {
            handleCloseSubContext('library-item-menu');
        } else {
            handleOpenSubContext(event, 'library-item-menu', 'bottom-right', id)
        }
        setPosition({ left: event.clientX, top: event.clientY });
    };

    const handleClickOutside = (event) => {
        event.preventDefault();
        handleCloseSubContext('library-item-menu');
    };

    if (collapse) {
        return (
            <div className={cx('library-item-card', viewAs)}
                onClick={() => {
                    navigate(routeLink);
                }}
                onContextMenu={handleRightClick}
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
                        position={position} 
                        isFixed
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
            onContextMenu={handleRightClick}
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
                        <span className={cx('library-item-type')}>{type}</span>
                        <span className={cx('library-item-author')}>{author}</span>
                    </div>
                </div>
                : <div className={cx('library-item-sub-title')}>
                    <span className={cx('library-item-title')}>{title}</span>
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
                    position={position} 
                    isFixed
                />
            )}
        </div>
    );
};

export default LibraryItemCard;