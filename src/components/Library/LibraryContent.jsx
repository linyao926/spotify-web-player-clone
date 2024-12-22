import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addToPinnedIds, removeFromPinnedIds } from '~/redux/slices/librarySlice';
import { openModal } from '~/redux/slices/uiSlice';
import useCreatePlaylist from '~/hooks/useCreatePlaylist';
import LibraryItemCard from '~/components/Card/LibraryItemCard/LibraryItemCard';
import NormalCard from '~/components/Card/NormalCard/NormalCard';
import EditPlaylistModal from '~/components/EditPlaylistModal/EditPlaylistModal';
import { 
    PlaylistFallbackIcon,
    UserFallbackIcon,
    PinnedIcon,
    PinIcon,
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
        myPlaylists = [],
        artists = [],
        albums = [],
        likedTracks = [],
        pinnedIds = [],
        options,
        filters = [],
        libraryItems = [],
        setLibraryItems,
        isShowMore = false,
        isCollapsed = false,
        maxHeight = 0,
    } = props;

    const { handleCreatePlaylist } = useCreatePlaylist();
    const dispatch = useDispatch();
    const queue = useSelector((state) => state['queue']);
    const isEditOpen = useSelector((state) => state.ui.modal['edit-playlist'].isOpen);
    const [pinnedItems, setPinnedItems] = useState([]);
    const [editModalState, setEditModalState] = useState({
        coverUrl: '',
        coverFallback: '',
        title: '',
        description: '',
        id: ''
    });    

    const containerRef = useRef(null);

    const [likedTracksInfo, setLikedTracksInfo] = useState({
        id: 'collection/tracks',
        name: 'Liked Songs',
        authorName: `${likedTracks.length} songs`,
        type: 'playlist',
        tracks: { items: likedTracks },
        track_total: likedTracks ? likedTracks.length : 0,
        imageUrl: "https://misc.scdn.co/liked-songs/liked-songs-300.png",
        time_added: null,
        time_played: null,
        isLikedTracks: true,
    });

    useEffect(() => {
        if (likedTracks.length > 0) {
            setLikedTracksInfo({
                ...likedTracksInfo,
                tracks: { items: likedTracks },
                track_total: likedTracks ? likedTracks.length : 0,
                authorName: `${likedTracks.length} songs`,
            })
        }
    }, [likedTracks]);

    useEffect(() => {
        const sortBy = options['sort-by'];
        let sortedItems = [];

        if (sortBy === 'recents' || sortBy === 'alphabetical') {
            let combinedItems;

            if (likedTracks.length > 0) {
                combinedItems = [
                    ...playlists,
                    ...artists,
                    ...albums,
                    ...myPlaylists,
                    likedTracksInfo
                ];
            } else {
                combinedItems = [
                    ...playlists,
                    ...artists,
                    ...albums,
                    ...myPlaylists,
                ];
            }

            sortedItems = sortItems(combinedItems, sortBy);
        } else {
            const combinedItems = [
                ...playlists,
                ...artists,
                ...albums,
                ...myPlaylists,
            ];

            sortedItems = sortItems(combinedItems, sortBy);

            if (likedTracks.length > 0) {
                sortedItems.push(likedTracksInfo);
            }
        }

        const finalItems = new Set([
            ...sortedItems.filter((item) => pinnedIds.find((id) => id === item.id)),
            ...sortedItems.filter((item) => !pinnedItems.some((p) => p.id === item.id))
        ]);
    
        setLibraryItems(Array.from(finalItems));
    }, [playlists, artists, albums, myPlaylists, likedTracksInfo, options]);

    const handlePinItem = useCallback(
        (id) => {
            if (pinnedIds.some((pinned) => pinned === id)) {
                dispatch(removeFromPinnedIds(id)); 
            } else {
                dispatch(addToPinnedIds(id)); 
            }
        },
        [pinnedIds, dispatch] 
    );

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

        contextMenu = libraryPlaylistContextMenu(item.tracks.items, 'ADD', dispatch);

        routeLink = `/${item.type}/${item.id}`;

        if (item.isLikedTracks) {
            routeLink = `/${item.id}`;
        }

        if (item.isMyPlaylist) {
            imgFallback = <PlaylistFallbackIcon />;
            routeLink = `/my_playlist/${item.id}`;
            contextMenu = myPlaylistContextMenu(item.id, item.tracks.items, 'REMOVE', dispatch);
        };

        if (item.imageUrl) {
            imgUrl = item.imageUrl;
        } else imgUrl = '';

        if (item.type === 'artist') {
            imgFallback = <UserFallbackIcon />;
            contextMenu = libraryArtistContextMenu(item.tracks.items, dispatch);
        };

        if (item.type === 'album') {
            contextMenu = libraryAlbumContextMenu(item.tracks.items, dispatch);
        };

        contextMenu.map((obj) => {
            if (obj.name.includes('Pin')) {
                obj.onClick = () => handlePinItem(item.id); 
                obj.iconActive = pinnedIds.some((id) => id === item.id);
                if (obj.iconActive) {
                    obj.iconLeft = <PinnedIcon/>;
                    obj.name = `Unpin ${item.type}`;
                } else {
                    obj.name = `Pin ${item.type}`;
                    obj.iconLeft = <PinIcon />;
                }
            }

            if (obj.name.includes('Create')) {
                obj.onClick = () => handleCreatePlaylist(); 
            }

            if (obj.name.includes('Edit')) {
                obj.onClick = () => {
                    setEditModalState({
                        coverUrl: item.images.uploadUrl 
                        ? item.images.uploadUrl 
                        : (item.images.fallbackUrl 
                            ? item.images.fallbackUrl 
                            : null
                        ),
                        coverFallback: <PlaylistFallbackIcon />,
                        title: item.name,
                        description: item.description,
                        id: item.id,
                    })
                    dispatch(openModal({name: 'edit-playlist'}))
                }; 
            }

            return obj; 
        });

        if (options['view-mode'] === 'grid' && !isCollapsed) {
            return (
                <NormalCard
                    key={item.id}
                    id={item.id}
                    imgCircle={item.type === 'artist'}
                    imgUrl={imgUrl}
                    imgFallback = {imgFallback}
                    title={item.name}
                    authorName={item.authorName}
                    routeLink={routeLink}
                    disableTextHover
                    contextMenu={contextMenu}
                    type={item.type}
                    isPinned={pinnedIds.some((id) => id === item.id)}
                    album_type={item.type === 'album' ? item['album_type'] : null}
                    showType
                    showAuthor
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
                    isPinned={pinnedIds.some((id) => id === item.id)}
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
            {isEditOpen && <EditPlaylistModal 
                coverUrl = {editModalState.coverUrl}
                coverFallback = {editModalState.coverFallback}
                title = {editModalState.title}
                description = {editModalState.description}
                id={editModalState.id}
            />}
        </>
    )
};

export default LibraryContent;