import React, { useEffect, useState, useRef } from "react";
import { SearchIcon, ListIcon } from '~/assets/icons';
import FilterBar from '~/components/FilterBar/FilterBar';
import LibraryItemCard from '~/components/Card/LibraryItemCard/LibraryItemCard';
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
    } = props;
    return (
        <section className={cx('library')}>
            <header className={cx('library-header')}>
                <FilterBar
                    filters={[
                        { value: 'playlist', label: 'Playlists' },
                        { value: 'artist', label: 'Artists' },
                        { value: 'album', label: 'Albums' },
                    ]}
                    onFilterChange={(filter) => console.log('Filter changed to:', filter)}
                    hasAll={false}
                    isLibrary={true}
                />
                <div className={cx('library-toolbar')}>
                    <div className={cx('library-toolbar-search-wrapper')}>
                        <Button 
                            hasIcon
                            icon={<SearchIcon />}
                            variant="transparent"
                            borderRadius="circle"
                            size="size-small"
                            padding="0"
                            hoverEffect={["hover-none-scale", "hover-button-highlight"]} 
                        />
                    </div>
                    <div className={cx('library-toolbar-options')}>
                        <Button 
                            hasIcon
                            icon={<ListIcon />}
                            iconPosition="icon-right"
                            variant="transparent"
                            borderRadius="rounded"
                            size="size-small"
                            padding="0"
                        >Recents</Button>
                    </div>
                </div>
            </header>
            <div className={cx('library-content')}>

            </div>
        </section>
    )
};

export default Library;