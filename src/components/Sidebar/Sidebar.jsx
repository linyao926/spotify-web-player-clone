import React, { useState, useEffect } from 'react';
import { useSubContext } from '~/hooks/useSubContext';
import { useSelector } from 'react-redux';
import {  
    PlusIcon, 
    MusicalNotePlusIcon, 
} from '~/assets/icons/icons';
import SidebarHeader from './SidebarHeader';
import CreatePlaylistPrompt from './CreatePlaylistPrompt';
import Library from '../Library/Library';
import SidebarFooter from './SidebarFooter';
import ResizeBar from './ResizeBar';
import Button from '../Button/Button';
import SubContextMenu from '../SubContextMenu/SubContextMenu';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Sidebar.module.scss';

const cx = classNames.bind(styles);

const SIDEBAR_LOCAL_STORAGE_KEY = 'sidebarWidthState';

function Sidebar (props) {
    const { handleOpenSubContext, handleCloseSubContext } = useSubContext();

    const { accessToken } = useSelector((state) => state.auth);
    const isSubContextOpen = useSelector((state) => state.ui.subContext.contexts['create-playlist'].isOpen);
    const position = useSelector((state) => state.position);
    const library = useSelector((state) => state['library']);

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
    }, [sidebarWidth]);

    useEffect(() => {
        const sidebarState = {
          sidebarWidth,
          isCollapsed,
          isShowMore,
        };

        localStorage.setItem(SIDEBAR_LOCAL_STORAGE_KEY, JSON.stringify(sidebarState));
    }, [sidebarWidth, isCollapsed, isShowMore]);

    const createPlaylistMenu = [{
        name: "Create a new playlist",
        iconLeft: <MusicalNotePlusIcon />,
    }];

    document.documentElement.style.setProperty('--left-sidebar-width', sidebarWidth);

    const CreatePlaylistBtn = () => {
        let positionType = isCollapsed ? 'bottom-left' : 'bottom-right';
        return (
            <div className={cx('btn-wrapper')}>
                <Button 
                    hasIcon
                    icon={<PlusIcon />}
                    borderRadius="circle"
                    variant="transparent"
                    size="size-small"
                    padding="8px"
                    hoverEffect={["hover-none-scale", "hover-button-highlight"]}
                    clickFunction={ 
                        isSubContextOpen 
                        ? () => handleCloseSubContext('create-playlist')
                        : (event) => handleOpenSubContext(event, 'create-playlist', positionType)
                    }
                />
                {isSubContextOpen && <SubContextMenu 
                    items={createPlaylistMenu} 
                    position={position} 
                    alignRight={!isCollapsed}
                />}
            </div>
        );
    };
    
    return (
        <aside className={cx('sidebar', isCollapsed && 'collapsed')} style={{ width: sidebarWidth }}>
            <SidebarHeader 
                sidebarWidth={sidebarWidth}
                setSidebarWidth={setSidebarWidth}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isShowMore={isShowMore}
                setIsShowMore={setIsShowMore}
                createPlaylistBtn={<CreatePlaylistBtn />}
            />
            <div className={cx('sidebar-content')}>
                {isCollapsed 
                    ? <CreatePlaylistBtn /> 
                    : (hasItems 
                        ? <Library 
                            playlists={library.playlists}
                            albums={library.albums}
                            artists={library.artists}
                            likedTracks={library.likedTracks}
                        /> 
                        : <CreatePlaylistPrompt />)
                }
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