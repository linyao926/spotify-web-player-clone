import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openSubContext, closeSubContext } from '~/redux/slices/uiSlice';
import { setPosition } from '~/redux/slices/positionSlice';
import { FillLibraryIcon, PlusIcon, MusicalNotePlusIcon } from '~/assets/icons/icons';
import Button from '../Button/Button';
import SubContextMenu from '../SubContextMenu/SubContextMenu';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Sidebar.module.scss';

const cx = classNames.bind(styles);

function SidebarHeader (props) {
    const createPlaylistMenu = [{
        name: "Create a new playlist",
        iconLeft: <MusicalNotePlusIcon />,
        // onClick: toggleLibrary, 
    }];

    const isSubContextOpen = useSelector((state) => state.ui.subContext.isOpen);
    const position = useSelector((state) => state.position);
    
    const dispatch = useDispatch(); 

    const handleOpenSubContext = (event) => {
        event.stopPropagation();
        const boundingRect = event.currentTarget.getBoundingClientRect();
        dispatch(setPosition({ 
            positionType: 'bottom-right', 
            boundingRect: {
                height: boundingRect.height,
                width: boundingRect.width
            } 
        }));
        dispatch(openSubContext());
    };
    const handleCloseSubContext = () => dispatch(closeSubContext());
    
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
                    clickFunction={isSubContextOpen ? handleCloseSubContext : (event) => handleOpenSubContext(event)}
                />
                {isSubContextOpen && <SubContextMenu 
                    items={createPlaylistMenu} 
                    position={position} 
                    alignRight
                />}
            </div>
        </header>
    )
};

export default SidebarHeader;