import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon, BrowseIcon, FillBrowseIcon, DismissIcon } from '~/assets/icons/icons';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Sidebar.module.scss';

const cx = classNames.bind(styles);

function SidebarFooter (props) {
    return (
        <div className={cx('sidebar-footer')}>
            sidebar footer
        </div>
    )
};

export default SidebarFooter;