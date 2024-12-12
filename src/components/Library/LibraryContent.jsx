import React, { useEffect, useState, useRef } from "react";
import LibraryItemCard from '~/components/Card/LibraryItemCard/LibraryItemCard';
import { 
    PlaylistFallbackIcon,
    UserFallbackIcon,
} from '~/assets/icons';
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
    } = props;

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

    // console.log(libraryItems)

    return (
        <div className={cx('library-content')}>
            {libraryItems.map(item => {
                let imgUrl, imgFallback = '', routeLink;

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
                } else if (item.images.url) {
                    imgUrl = item.images.url;
                } else imgUrl = '';

                if (item.type === 'artist') {
                    imgFallback = <UserFallbackIcon />;
                };

                return (
                    <LibraryItemCard 
                        key={item.id}
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
                    />
                )
            })}
        </div>
    )
};

export default LibraryContent;