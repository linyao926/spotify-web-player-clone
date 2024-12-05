import React from 'react';
import { DismissIcon, InfoIcon, EditIcon } from '~/assets/icons/icons';
import Button from '~/components/Button/Button';
import SearchBox from '~/components/SearchBox/SearchBox';
import classNames from 'classnames/bind';
import styles from '~/styles/pages/MyPlaylist.module.scss';

const cx = classNames.bind(styles);

function FindMoreForPlaylist(props) {
    const {
        clickFunction
    } = props;

    const handleSearch = (query) => {
        console.log("Searching for:", query);
    };

    return (
        <section className={cx('find-more')}>
            <div className={cx('find-more-header')}>
                <div className={cx("search-box-wrapper")}>
                    <h2>Let's find something for your playlist</h2>
                    <div className={cx('search-box')}>
                        <SearchBox 
                            size="medium"
                            onSearch={handleSearch}
                            placeholder="Search for songs or episodes"
                        />
                    </div>
                </div>
                <span className={cx("close-btn-wrapper")}>
                    <Button 
                        hasIcon
                        icon={<DismissIcon />}
                        size="size-base"
                        variant="transparent"
                        borderRadius="circle"
                        iconSize="medium-icon"
                        padding="0"
                        hoverEffect={["hover-none-scale", "hover-button-tinted-base"]} 
                        clickFunction={clickFunction}
                    />
                </span>
            </div>
            <div className={cx('find-more-content')}>
                
            </div>
        </section>
    );
};

export default FindMoreForPlaylist;