import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '~/redux/slices/uiSlice';
import { SearchIcon, LibrarySearchIcon, BrowseIcon, FillBrowseIcon, DismissIcon } from '~/assets/icons/icons';
import classNames from 'classnames/bind';
import styles from '~/styles/components/SearchBox.module.scss';

const cx = classNames.bind(styles);

function SearchBox (props) {
    const {
        size = 'medium',  // small | medium | large
        placeholder = '',
        showBrowse = false,
        onSearch = () => {},
        setIsBlur,
        inputIsClickFocus,
        clickFunction,
    } = props;

    const [inputValue, setInputValue] = useState('');
    const [inputIsFocus, setInputIsFocus] = useState(false);
    
    const { accessToken } = useSelector((state) => state.auth);

    const location = useLocation();
    const isSearchPage = location.pathname === '/search';

    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (inputIsClickFocus) {
            inputRef.current.focus();
        } 
    }, [inputIsClickFocus])

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
        <div className={cx('search-box', size)}
            onClick={() => clickFunction && clickFunction(inputRef)}
        >
            <div className={cx("search-icon")}>
                {size === 'small' ? <LibrarySearchIcon /> : <SearchIcon />}
            </div>
            
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                // onFocus={() => {
                //     setInputIsFocus(true);
                // }}
                onBlur={() => setIsBlur(false)}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
            
            {inputValue && (
                <div className={cx("clear-icon")} onClick={handleClear}>
                    <DismissIcon />
                </div>
            )}
            
            {showBrowse && <div className={cx("browse-icon", inputValue ? 'hidden' : '', isSearchPage && 'active')}
                onClick={() => {
                    accessToken ? navigate("/search") : dispatch(openModal({id: 'login-prompt'}))
                }}
            >
                {isSearchPage ? <FillBrowseIcon /> : <BrowseIcon />}
            </div>}
        </div>
    )
};

export default SearchBox;