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
    } = props;

    const dispatch = useDispatch();

    const [pinnedItems, setPinnedItems] = useState([]);

    useEffect(() => {
        const sortBy = options['sort-by'];
        let result = [];

        if (sortBy === 'recents' || sortBy === 'alphabetical') {
            const combinedItems = [
                ...playlists,
                ...artists,
                ...albums,
                ...likedTracks
            ];
            result = sortItems(combinedItems, sortBy);
        } else {
            const combinedItems = [
                ...playlists,
                ...artists,
                ...albums,
            ];
            result = sortItems(combinedItems, sortBy);
            result.push(...likedTracks);
        }
        setLibraryItems(result);
    }, [playlists, artists, albums, likedTracks]);

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

        if (item.isMyPlaylist) {
            imgFallback = <PlaylistFallbackIcon />;
            routeLink = `/my_playlist/${item.id}`;
            if (item.images.uploadUrl) {
                imgUrl = item.images.uploadUrl;
            } else if (item.images.fallbackUrl) {
                imgUrl = item.images.fallbackUrl;
            } else {
                imgUrl = '';
            };
            contextMenu = myPlaylistContextMenu(item.id, 'REMOVE', dispatch);
        } else if (item.images.url) {
            imgUrl = item.images.url;
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
        <div className={cx('library-content', isCollapsed && 'collapse')}>
            {libraryItems.map(item => getItem(item))}
        </div>
    )
};

export default LibraryContent;