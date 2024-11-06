import React, { useState } from 'react';
import { FaSearch, FaTimes, FaArrowRight } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from '~/styles/components/SearchBox.module.scss';

const cx = classNames.bind(styles);

function SearchBox (props) {
    const {
        size = 'medium',  // small | medium | large
        onSearch = () => {},
    } = props;

    const [inputValue, setInputValue] = useState('');

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
            <div className="search-icon">
                <FaSearch />
            </div>
            
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
            />
            
            {inputValue && (
                <div className="clear-icon" onClick={handleClear}>
                    <FaTimes />
                </div>
            )}
            
            <div className={`divider ${inputValue ? 'hidden' : ''}`}></div>
            
            <div className={`browse-icon ${inputValue ? 'hidden' : ''}`}>
                <FaArrowRight />
            </div>
        </div>
    )
};

export default SearchBox;