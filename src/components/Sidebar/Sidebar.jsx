import React, { useState } from 'react';
import SidebarHeader from './SidebarHeader';
import CreatePlaylistPrompt from './CreatePlaylistPrompt';
import SidebarFooter from './SidebarFooter';
import ResizeBar from './ResizeBar';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar (props) {
    const [sidebarWidth, setSidebarWidth] = useState(280);

    return (
        <aside className={cx('sidebar')} style={{ width: sidebarWidth }}>
            <SidebarHeader />
            <div className={cx('sidebar-content')}>
                <CreatePlaylistPrompt />
            </div>
            <SidebarFooter />
            <ResizeBar
                sidebarWidth={sidebarWidth}
                setSidebarWidth={setSidebarWidth}
            />
        </aside>
    )
};

export default Sidebar;