import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '~/redux/slices/uiSlice';
import { SearchIcon, BrowseIcon, FillBrowseIcon, DismissIcon } from '~/assets/icons/icons';
import classNames from 'classnames/bind';
import styles from '~/styles/components/SearchBox.module.scss';

const cx = classNames.bind(styles);

function SearchBox (props) {
    const {
        size = 'medium',  // small | medium | large
        onSearch = () => {},
    } = props;

    const [inputValue, setInputValue] = useState('');
    const [inputIsFocus, setInputIsFocus] = useState(false);
    
    const { accessToken } = useSelector((state) => state.auth);

    const location = useLocation();
    const isSearchPage = location.pathname === '/search';

    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleSearchIconClick = () => {
        accessToken ? navigate("/search") : dispatch(openModal());
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
                onFocus={() => {
                    accessToken ? navigate("/search") : dispatch(openModal());
                    setInputIsFocus(true);
                }}
                onBlur={() => setInputIsFocus(false)}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="What do you want to play?"
            />
            
            {inputValue && (
                <div className={cx("clear-icon")} onClick={handleClear}>
                    <DismissIcon />
                </div>
            )}
            
            <div className={cx("browse-icon", inputValue ? 'hidden' : '', isSearchPage && 'active')}
                onClick={() => {
                    accessToken ? navigate("/search") : dispatch(openModal())
                }}
            >
                {isSearchPage ? <FillBrowseIcon /> : <BrowseIcon />}
            </div>
        </div>
    )
};

export default SearchBox;