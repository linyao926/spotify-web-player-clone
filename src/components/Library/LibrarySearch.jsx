import React, { useEffect, useState, useRef } from "react";
import { LibrarySearchIcon, ListIcon } from '~/assets/icons';
import SearchBox from '~/components/SearchBox/SearchBox';
import Button from '~/components/Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Library.module.scss';

const cx = classNames.bind(styles);

const LibrarySearch = (props) => {
    const {
        playlists = [],
        artists = [],
        albums = [],
        likedTracks = [],
        searchBoxVisible,
        setSearchBoxVisible
    } = props;

    const [isBlur, setIsBlur] = useState(true);

    useEffect(() => {
        if (!isBlur && searchBoxVisible) {
            setSearchBoxVisible(false);
            setIsBlur(true);
        }
    }, [isBlur])

    const handleSearch = (query) => {
        console.log("Searching for:", query);
    };

    return (
        <div className={cx('library-search-wrapper')}>
            <div className={cx('btn-wrapper')}
                onClick={() => {
                    setSearchBoxVisible(true);
                }}
                style={{
                    opacity: !searchBoxVisible ? '1' : '0',
                }}
            >
                <Button 
                    hasIcon
                    icon={<LibrarySearchIcon />}
                    variant="transparent"
                    borderRadius="circle"
                    size="size-small"
                    padding="0"
                    hoverEffect={["hover-none-scale", "hover-button-highlight"]} 
                />
            </div>
            <div className={cx('search-box-wrapper')}
                style={{
                    opacity: searchBoxVisible ? '1' : '0',
                    width: searchBoxVisible ? '188px' : '32px',
                }}
            >
                <SearchBox 
                    size="small"
                    onSearch={handleSearch}
                    placeholder="Search in your library"
                    inputIsClickFocus={searchBoxVisible}
                    setIsBlur={setIsBlur}
                />
            </div>
        </div>
    )
};

export default LibrarySearch;