import React, { useState, useRef, useEffect } from 'react';
import { FillLibraryIcon, PlusIcon, MusicalNotePlusIcon } from '~/assets/icons/icons';
import Button from '../Button/Button';
import { openSubContext, closeSubContext } from '~/services/utils.js';
import SubContextMenu from '../SubContextMenu/SubContextMenu';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Sidebar.module.scss';

const cx = classNames.bind(styles);

function SidebarHeader (props) {
    const createPlaylistMenu = [{
        name: "Create a new playlist",
        iconLeft: <MusicalNotePlusIcon />,
        active: false,
        toggle: false, 
        // onClick: toggleLibrary, 
    }];

    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [isSubcontextOpen, setIsSubcontextOpen] = useState(false);
    
    const handleOpenMenuClick = (event) => openSubContext(event, "bottom-right", setPosition, setIsSubcontextOpen);

    const handleCloseMenuClick = () => closeSubContext(setIsSubcontextOpen);

    return (
        <header className={cx('sidebar-header')}>
            <Button
                hasIcon
                iconPosition="icon-left"
                icon={<FillLibraryIcon />}
                borderRadius="rounded"
                variant="transparent"
                size="size-medium"
                padding="4px 8px"
                hoverEffect={["hover-none-scale"]}
            >
                Your Library
            </Button>
            <div className={cx('btn-wrapper')}>
                <Button 
                    hasIcon
                    icon={<PlusIcon />}
                    borderRadius="circle"
                    variant="transparent"
                    size="size-small"
                    padding="8px"
                    hoverEffect={["hover-none-scale", "hover-button-highlight"]}
                    clickFunction={isSubcontextOpen ? handleCloseMenuClick : handleOpenMenuClick}
                />
                {isSubcontextOpen && <SubContextMenu 
                    items={createPlaylistMenu} 
                    position={position} 
                    alignRight
                />}
            </div>
        </header>
    )
};

export default SidebarHeader;