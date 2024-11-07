import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon, BrowseIcon, FillBrowseIcon, DismissIcon } from '~/assets/icons/icons';
import SidebarHeader from './SidebarHeader';
import SidebarFooter from './SidebarFooter';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar (props) {
    return (
        <aside className={cx('sidebar')}>
            <SidebarHeader />
            <div className={cx('sidebar-content')}>
                <section className={cx('create-playlist-prompt')}>
                    <div className={cx('create-playlist-prompt-text')}>
                        <span className={cx('create-playlist-prompt-text__title')}>
                            Create your first playlist
                        </span>
                        <span className={cx('create-playlist-prompt-text__subtitle')}>
                            It's easy, we'll help you
                        </span>
                    </div>
                    <Button 
                        variant="background-base"
                        size="size-small"
                        borderRadius="rounded"
                        padding="4px 16px"
                    >Create playlist</Button>
                </section>
            </div>
            <SidebarFooter />
        </aside>
    )
};

export default Sidebar;