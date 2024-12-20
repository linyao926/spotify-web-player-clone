import React, { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import { useSubContext } from '~/hooks/useSubContext';
import { useSelector } from 'react-redux';
import SidebarHeader from './SidebarHeader';
import CreatePlaylistButton from './CreatePlaylistButton';
import CreatePlaylistPrompt from './CreatePlaylistPrompt';
import Library from '../Library/Library';
import SidebarFooter from './SidebarFooter';
import ResizeBar from './ResizeBar';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Sidebar.module.scss';

const cx = classNames.bind(styles);

const SIDEBAR_LOCAL_STORAGE_KEY = 'sidebarWidthState';

function Sidebar () {
    const { handleOpenSubContext, handleCloseSubContext } = useSubContext();
    const { width } = useWindowSize();

    const { accessToken } = useSelector((state) => state.auth);
    const isSubContextOpen = useSelector((state) => state.ui.subContext.contexts['create-playlist'].isOpen);
    const position = useSelector((state) => state.position);
    const library = useSelector((state) => state['library']);

    // console.log(library)

    const initialState = JSON.parse(localStorage.getItem(SIDEBAR_LOCAL_STORAGE_KEY)) || {
        sidebarWidth: 280,
        isCollapsed: false,
        isShowMore: false,
    };

    const [sidebarWidth, setSidebarWidth] = useState(initialState.sidebarWidth);
    const [isCollapsed, setIsCollapsed] = useState(initialState.isCollapsed);
    const [isShowMore, setIsShowMore] = useState(initialState.isShowMore);
    const [hasItems, setHasItems] = useState(false);

    useEffect(() => {
        const checkHasItems = Object.values(library).some(array => array.length > 0);
        setHasItems(checkHasItems);
    }, [library]);

    useEffect(() => {
        if (sidebarWidth >= 584) {
            setIsShowMore(true);
            setIsCollapsed(false);
        } else if (sidebarWidth <= 420 && sidebarWidth >= 280) {
            setIsShowMore(false);
            setIsCollapsed(false);
        } else if (sidebarWidth === 72) {
            setIsShowMore(false);
            setIsCollapsed(true);
        }
    }, [sidebarWidth, width]);

    useEffect(() => {
        const sidebarState = {
          sidebarWidth,
          isCollapsed,
          isShowMore,
        };

        localStorage.setItem(SIDEBAR_LOCAL_STORAGE_KEY, JSON.stringify(sidebarState));
    }, [sidebarWidth, isCollapsed, isShowMore]);

    document.documentElement.style.setProperty('--left-sidebar-width', sidebarWidth);
    
    return (
        <aside className={cx('sidebar', isCollapsed && 'collapsed')} style={{ width: sidebarWidth }}>
            <SidebarHeader 
                sidebarWidth={sidebarWidth}
                setSidebarWidth={setSidebarWidth}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isShowMore={isShowMore}
                setIsShowMore={setIsShowMore}
                createPlaylistBtn={<CreatePlaylistButton 
                    isSubContextOpen={isSubContextOpen}
                    isCollapsed={isCollapsed}
                    position={position}
                    handleCloseSubContext={handleCloseSubContext}
                    handleOpenSubContext={handleOpenSubContext}
                />}
            />
            <div className={cx('sidebar-content')}>
                {accessToken && (hasItems 
                    ? <Library 
                        playlists={library.playlists}
                        albums={library.albums}
                        artists={library.artists}
                        likedTracks={library.likedTracks}
                        pinnedIds={library.pinnedIds}
                        isCollapsed={isCollapsed}
                        isShowMore={isShowMore}
                    /> 
                    : (isCollapsed
                        ? <CreatePlaylistButton 
                            isSubContextOpen={isSubContextOpen}
                            isCollapsed={isCollapsed}
                            position={position}
                            handleCloseSubContext={handleCloseSubContext}
                            handleOpenSubContext={handleOpenSubContext}
                        />  
                        : <div className={cx('create-playlist-prompt-wrapper')}>
                            <CreatePlaylistPrompt />
                        </div>)
                )}
                {!accessToken && (
                    <div className={cx('create-playlist-prompt-wrapper')}>
                        <CreatePlaylistPrompt />
                    </div>
                )}
            </div>
            {!accessToken && <SidebarFooter />}
            <ResizeBar
                sidebarWidth={sidebarWidth}
                setSidebarWidth={setSidebarWidth}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isShowMore={isShowMore}
                setIsShowMore={setIsShowMore}
            />
        </aside>
    )
};

export default Sidebar;