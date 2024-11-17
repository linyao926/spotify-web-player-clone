import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
    FillLibraryIcon, 
    ShowMoreIcon, 
    ShowLessIcon 
} from '~/assets/icons/icons';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Sidebar.module.scss';

const cx = classNames.bind(styles);

function SidebarHeader (props) {
    const {
        sidebarWidth, 
        setSidebarWidth, 
        isCollapsed, 
        setIsCollapsed, 
        isShowMore, 
        setIsShowMore,
        createPlaylistBtn
    } = props;
    
    const [previousWidth, setPreviousWidth] = useState(280);
    const screenWidth = window.innerWidth;
    
    // Constants
    const COLLAPSE_WIDTH = 72;
    const NORMAL_MIN_WIDTH = 280;
    const NORMAL_MAX_WIDTH = 420;
    const SHOW_MORE_MIN_WIDTH = 584;
    const SHOW_MORE_MAX_WIDTH = screenWidth - 416;
    
    const { accessToken } = useSelector((state) => state.auth);

    const toggleCollapse = () => {
        if (isCollapsed) {
            setSidebarWidth(previousWidth);
            setIsCollapsed(false);
        } else {
            setPreviousWidth(sidebarWidth); 
            setSidebarWidth(COLLAPSE_WIDTH);
            setIsCollapsed(true);
        }
    };
    
    const toggleShowMore = () => {
        if (isShowMore) {
            if (previousWidth > SHOW_MORE_MIN_WIDTH ) {
                setSidebarWidth(NORMAL_MAX_WIDTH);
            } else {
                setSidebarWidth(previousWidth);
            }
            setIsShowMore(false);
        } else {
            setPreviousWidth(sidebarWidth); 
            setSidebarWidth(SHOW_MORE_MIN_WIDTH);
            setIsShowMore(true);
        }
    };

    const isShowMoreVisible = SHOW_MORE_MAX_WIDTH >= SHOW_MORE_MIN_WIDTH;
    
    return (
        <header className={cx('sidebar-header', isCollapsed && 'collapsed')}>
            <Button
                hasIcon
                iconPosition="icon-left"
                icon={<FillLibraryIcon />}
                borderRadius={isCollapsed ? "circle" : "rounded"}
                variant="transparent"
                size="size-medium"
                padding="4px 8px"
                hoverEffect={["hover-none-scale"]}
                clickFunction={toggleCollapse}
            >
                {!isCollapsed && 'Your Library'}
            </Button>
            {!isCollapsed && <div className={cx('sidebar-header-actions')}>
                {createPlaylistBtn}
                {isShowMoreVisible && accessToken && <Button 
                    hasIcon
                    icon={isShowMore ? <ShowLessIcon /> : <ShowMoreIcon />}
                    borderRadius="circle"
                    variant="transparent"
                    size="size-small"
                    padding="8px"
                    hoverEffect={["hover-none-scale", "hover-button-highlight"]}
                    clickFunction={toggleShowMore}
                />}
            </div>}
        </header>
    )
};

export default SidebarHeader;