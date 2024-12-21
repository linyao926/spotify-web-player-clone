import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux'; 
import { useSubContext } from '~/hooks/useSubContext';
import { selectTrackItemsData, fetchTrackItemsData } from '~/redux/slices/trackItemsDataSlice';
import { PlayLargeIcon, PinnedIcon } from '~/assets/icons';
import {
    playlistContextMenu,
    myPlaylistContextMenu,
    albumContextMenu,
    artistContextMenu,
} from '~/constants/subContextItems';
import Button from '~/components/Button/Button';
import SubContextMenu from '~/components/SubContextMenu/SubContextMenu';
import classNames from 'classnames/bind';
import styles from '~/styles/components/NormalCard.module.scss';

const cx = classNames.bind(styles);

const NormalCard = (props) => {
    const {
        id = '',
        imgCircle = false,
        imgUrl = '',
        imgFallback = '',
        title,
        releaseDate = '',
        description = '',
        authorName,
        routeLink = '/search',
        disableTextHover = false,
        libraryContextMenu = [], 
        type = '',
        album_type = '',
        author = [],
        trackTotal = 0,
        isPinned = false,
        showType = false,
        showAuthor = false,
        showDate = false,
    } = props;

    const navigate = useNavigate();
    const isSubContextOpen = useSelector((state) => state.ui.subContext['normal-card-menu'].isOpen);
    const contextMenuId = useSelector((state) => state.ui.subContext['normal-card-menu'].id);

    const { 
        positionFixed,
        handleOpenCardMenu, 
        handleCloseCardMenu,
        positionFromBottom,
        positionFromRight, 
        setMenuHeight,
        setMenuWidth, 
    } = useSubContext();

    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.auth);
    const trackItems = useSelector(selectTrackItemsData);

    const [subContext, setSubContext] = useState([]);
    const [item, setItem] = useState({});

    useEffect(() => {
        setItem({
            id: id,
            name: title,
            authorName: author.name ? author.name : author['display_name'],
            authorId: author && author.id,
            type: type,
            album_type: type === 'album' ? album_type : '',
            tracks: { items: trackItems },
            description: '',
            track_total: trackItems ? trackItems.length : 0,
            imageUrl: imgUrl,
            time_added: new Date().toISOString(),
            time_played: null,
        })
    }, [trackItems]);

    useEffect(() => {
        let initialSubContext = playlistContextMenu(item, 'ADD', dispatch);

        if (item.type === 'album') {
            initialSubContext = albumContextMenu(item, 'ADD', dispatch);
        } else if (item.type === 'artist') {
            initialSubContext = artistContextMenu(item, 'ADD', dispatch);
        } 
        setSubContext(initialSubContext);
    }, [trackItems]);

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchTrackItemsData({accessToken, type, id}));
        }
    }, [accessToken, dispatch]);

    useEffect(() => {
        document.addEventListener("contextmenu", handleCloseCardMenu);
        return () => {
            document.removeEventListener("contextmenu", handleCloseCardMenu);
        };
    }, []);

    return (
        <div className={cx('normal-card')}
            onClick={() => navigate(routeLink)}
            onContextMenu={(event) => handleOpenCardMenu(event, 'normal-card-menu', id)}
        >
            <div className={cx('normal-card-top')}>
                {imgUrl 
                    ? <img 
                        draggable="false" 
                        loading="lazy" 
                        src={imgUrl} 
                        alt="" 
                        className={cx('normal-card-img', imgCircle && 'circle')} 
                    />
                    : <span className={cx('normal-card-img', imgCircle && 'circle', 'fallback')}>{imgFallback}</span>
                }
                <div className={cx('play-btn-wrapper')}>
                    <Button 
                        hasIcon 
                        icon={<PlayLargeIcon />} 
                        borderRadius="circle" 
                        variant="primary" 
                        size="size-base" 
                        iconSize="medium-icon"
                        padding="8px" 
                    />
                </div>
            </div>
            <div className={cx('normal-card-bottom', disableTextHover && 'disable-hover')}>
                <Link className={cx('normal-card-title')}
                    to="/"
                >{title}</Link>
                <div className={cx('normal-card-sub-title')}>
                    {showDate && <span className={cx('normal-card-release')}>{releaseDate}</span>}
                    {showType && <span className={cx('normal-card-type', isPinned && 'pinned')}>
                        <span>{isPinned && <PinnedIcon />}</span>   
                        {type === 'album' ? album_type : type}
                    </span>}
                    {showAuthor && <span className={cx('normal-card-author')}>{type === 'playlist' ? `By ${authorName}` : authorName}</span>}
                </div>
            </div>
            {isSubContextOpen && contextMenuId === id &&  (
                <SubContextMenu 
                    items={libraryContextMenu.length > 0 ? libraryContextMenu : subContext} 
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

export default NormalCard;