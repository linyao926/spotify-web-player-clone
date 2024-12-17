import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import LibraryItemCard from '~/components/Card/LibraryItemCard/LibraryItemCard';
import NormalCard from '~/components/Card/NormalCard/NormalCard';
import { 
    PlaylistFallbackIcon,
    UserFallbackIcon,
} from '~/assets/icons';
import {
    libraryPlaylistContextMenu,
    myPlaylistContextMenu,
    libraryAlbumContextMenu,
    libraryArtistContextMenu,
} from '~/constants/subContextItems';
import ScrollWrapper from '~/components/ScrollWrapper/ScrollWrapper';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Library.module.scss';

const cx = classNames.bind(styles);

const LibraryContent = (props) => {
    const {
        playlists = [],
        artists = [],
        albums = [],
        likedTracks = [],
        options,
        filters = [],
        libraryItems = [],
        setLibraryItems,
        isShowMore = false,
        isCollapsed = false,
        maxHeight = 0,
    } = props;

    const dispatch = useDispatch();
    const containerRef = useRef(null);

    const [pinnedItems, setPinnedItems] = useState([]);
    const [likedTracksInfo, setLikedTracksInfo] = useState({
        id: 'collection/tracks',
        name: 'Liked Songs',
        authorName: `${libraryItems.length} songs`,
        type: 'playlist',
        tracks: { items: libraryItems },
        track_total: libraryItems ? libraryItems.length : 0,
        imageUrl: "https://misc.scdn.co/liked-songs/liked-songs-300.png",
        time_added: null,
        time_played: null,
        isLikedTracks: true,
    });

    useEffect(() => {
        if (likedTracks.length > 0) {
            setLikedTracksInfo({
                ...likedTracksInfo,
                tracks: { items: libraryItems },
                track_total: libraryItems ? libraryItems.length : 0,
                authorName: `${libraryItems.length} songs`,
            })
        }
    }, [likedTracks]);

    useEffect(() => {
        const sortBy = options['sort-by'];
        let result = [];

        if (sortBy === 'recents' || sortBy === 'alphabetical') {
            const combinedItems = [
                ...playlists,
                ...artists,
                ...albums,
                likedTracksInfo
            ];
            result = sortItems(combinedItems, sortBy);
        } else {
            const combinedItems = [
                ...playlists,
                ...artists,
                ...albums,
            ];
            result = sortItems(combinedItems, sortBy);
            result.push(likedTracksInfo);
        }
        setLibraryItems(result);
    }, [playlists, artists, albums, likedTracksInfo]);

    const handlePinItem = (item) => {
        setPinnedItems((prevPinned) => {
            if (prevPinned.find((p) => p.id === item.id)) {
                return prevPinned.filter((p) => p.id !== item.id);
            }
            return [...prevPinned, { ...item, isPinned: true }];
        });
    };

    const sortItems = (items, sortBy) => {
        return items.sort((a, b) => {
          let aTime = a.time_played || a.time_added; 
          let bTime = b.time_played || b.time_added;
          
          switch (sortBy) {
            case 'recents':
              return new Date(bTime) - new Date(aTime); 
            
            case 'recents added':
              return new Date(b.time_added) - new Date(a.time_added);
            
            case 'alphabetical':
              return a.name.localeCompare(b.name);

            case 'creator':
                return a.authorName.localeCompare(b.authorName);
      
            default:
              return 0;
          }
        });
    };

    const getItem = (item) => {
        let imgUrl, imgFallback = '', routeLink, contextMenu;

        contextMenu = libraryPlaylistContextMenu(item.id, 'ADD', dispatch);

        routeLink = `/${item.type}/${item.id}`;

        if (item.isLikedTracks) {
            routeLink = `/${item.id}`;
        }

        if (item.isMyPlaylist) {
            imgFallback = <PlaylistFallbackIcon />;
            routeLink = `/my_playlist/${item.id}`;
            contextMenu = myPlaylistContextMenu(item.id, 'REMOVE', dispatch);
        };

        if (item.imageUrl) {
            imgUrl = item.imageUrl;
        } else imgUrl = '';

        if (item.type === 'artist') {
            imgFallback = <UserFallbackIcon />;
            contextMenu = libraryArtistContextMenu(item.id, dispatch);
        };

        if (item.type === 'album') {
            contextMenu = libraryAlbumContextMenu(item.id, dispatch);
        };

        if (options['view-mode'] === 'grid' && !isCollapsed) {
            let subtitle = item.type;
            if (item.type !== 'artist') {
                subtitle = `${item.type} • ${item.authorName}`
            }

            return (
                <NormalCard
                    key={item.id}
                    id={item.id}
                    imgCircle={item.type === 'artist'}
                    imgUrl={imgUrl}
                    imgFallback = {imgFallback}
                    title={item.name}
                    subtitle={subtitle}
                    routeLink={routeLink}
                    disableTextHover
                    contextMenu={contextMenu}
                    type={item.type}
                />
            )
        } 
        if (options['view-mode'] !== 'grid' || (options['view-mode'] === 'grid' && isCollapsed)) {
            return (
                <LibraryItemCard 
                    key={item.id}
                    id={item.id}
                    routeLink={routeLink}
                    imgUrl = {imgUrl}
                    imgFallback = {imgFallback}
                    title = {item.name}
                    type = {item.type}
                    author = {item.authorName}
                    authorId = {item.authorId}
                    showMore = {isShowMore}
                    addedDate = {item['time_added']}
                    played = {item['time_played']}
                    viewAs = {options['view-mode']}
                    collapse={isCollapsed}
                    contextMenu={contextMenu}
                />
            )
        }
    };

    return (
        <>
            <ScrollWrapper target={containerRef} />
            <div className={cx('library-container')}
                ref={containerRef}
                style={{maxHeight: maxHeight + 12}}
            >
                <div className={cx('library-content', isCollapsed && 'collapse', options['view-mode'] === 'grid' && 'grid')}>
                    {libraryItems.map(item => getItem(item))}
                </div>
            </div>
        </>
    )
};

export default LibraryContent;