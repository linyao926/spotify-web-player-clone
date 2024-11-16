import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useSubContext } from '~/hooks/useSubContext';
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
    }];

    const isSubContextOpen = useSelector((state) => state.ui.subContext.contexts['create-playlist'].isOpen);
    const position = useSelector((state) => state.position);

    const { handleOpenSubContext, handleCloseSubContext } = useSubContext();
    
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
                    clickFunction={ 
                        isSubContextOpen 
                        ? (event) => handleCloseSubContext('create-playlist')
                        : (event) => handleOpenSubContext(event, 'create-playlist')
                    }
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