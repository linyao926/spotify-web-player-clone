import React, { useState, useRef } from 'react';
import { SearchIcon, BrowseIcon, DismissIcon } from '~/assets/icons/icons';
import classNames from 'classnames/bind';
import styles from '~/styles/components/SearchBox.module.scss';

const cx = classNames.bind(styles);

function SearchBox (props) {
    const {
        size = 'medium',  // small | medium | large
        onSearch = () => {},
    } = props;

    const [inputValue, setInputValue] = useState('');

    const inputRef = useRef(null);

    const handleSearchIconClick = () => {
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
        onSearch(e.target.value); 
    };
    
    const handleClear = () => {
        setInputValue('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch(inputValue);  
        }
    };

    return (
        <div className={cx('search-box', size)}>
            <div className={cx("search-icon")} onClick={handleSearchIconClick}>
                <SearchIcon />
            </div>
            
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="What do you want to play?"
            />
            
            {inputValue && (
                <div className={cx("clear-icon")} onClick={handleClear}>
                    <DismissIcon />
                </div>
            )}
            
            <div className={cx("browse-icon", inputValue ? 'hidden' : '')}>
                <BrowseIcon />
            </div>
        </div>
    )
};

export default SearchBox;