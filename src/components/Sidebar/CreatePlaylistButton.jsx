import React from 'react';
import useCreatePlaylist from '~/hooks/useCreatePlaylist';
import {  
    PlusIcon, 
    MusicalNotePlusIcon, 
} from '~/assets/icons/icons';
import Button from '../Button/Button';
import SubContextMenu from '../SubContextMenu/SubContextMenu';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Sidebar.module.scss';

const cx = classNames.bind(styles);

function CreatePlaylistButton (props) {
    const {
        isSubContextOpen = false,
        isCollapsed = false,
        position,
        handleCloseSubContext,
        handleOpenSubContext,
    } = props;
    const createPlaylistMenu = [{
        name: "Create a new playlist",
        iconLeft: <MusicalNotePlusIcon />,
        onClick: () => handleCreatePlaylist(),
    }];

    const { handleCreatePlaylist } = useCreatePlaylist();
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
    )
};

export default CreatePlaylistButton;