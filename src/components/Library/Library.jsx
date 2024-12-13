import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import FilterBar from '~/components/FilterBar/FilterBar';
import LibrarySearch from "./LibrarySearch";
import LibraryOptions from "./LibraryOptions";
import LibraryContent from "./LibraryContent";
import Button from '~/components/Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Library.module.scss';

const cx = classNames.bind(styles);

const Library = (props) => {
    const {
        playlists = [],
        artists = [],
        albums = [],
        likedTracks = [],
        isCollapsed = false,
        isShowMore = false,
    } = props;

    const options = useSelector((state) => state.ui['library-options']);

    const [filters, setFilters] = useState([]);
    const [searchBoxVisible, setSearchBoxVisible] = useState(false);
    const [libraryItems, setLibraryItems] = useState([]);

    useEffect(() => {
        const result = [];

        if (playlists.length > 0 || likedTracks.length > 0) {
            result.push({ value: 'playlist', label: 'Playlists' })
        } 

        if (artists.length > 0) {
            result.push({ value: 'artist', label: 'Artists' })
        } 

        if (albums.length > 0) {
            result.push({ value: 'album', label: 'Albums' })
        } 

        setFilters(result);
    }, [playlists, artists, albums, likedTracks]);

    return (
        <section className={cx('library')}>
            {!isCollapsed && <header className={cx('library-header', isShowMore && 'flex-row')}>
                <div className={cx('filter-bar-wrapper')}>
                    <FilterBar
                        filters={filters}
                        onFilterChange={(filter) => console.log('Filter changed to:', filter)}
                        hasAll={false}
                        isLibrary={true}
                    />
                </div>
                <div className={cx('library-toolbar')}>
                    <LibrarySearch 
                        searchBoxVisible={searchBoxVisible}
                        setSearchBoxVisible={setSearchBoxVisible}
                    />
                    <LibraryOptions 
                        searchBoxVisible={searchBoxVisible}
                        options={options}
                    />
                </div>
            </header>}
            {isShowMore && <div className={cx('library-content-header')}>
                <span>Title</span>
                <span>Date Added</span>
                <span>Played</span>
            </div>}
            <LibraryContent 
                albums={albums}
                artists={artists}
                playlists={playlists}
                likedTracks={likedTracks}
                filters={filters}
                libraryItems={libraryItems}
                setLibraryItems={setLibraryItems}
                options={options}
                isShowMore={isShowMore}
                isCollapsed={isCollapsed}
            />
        </section>
    )
};

export default Library;