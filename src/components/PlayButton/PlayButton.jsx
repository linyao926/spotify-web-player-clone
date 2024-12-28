import React from 'react';
import { PlayLargeIcon, PlayIcon, PauseLargeIcon, PauseIcon } from '~/assets/icons';
import Tooltip from '~/components/Tooltip/Tooltip';
import Button from '~/components/Button/Button';

const PlayButton = (props) => {
    const {
        size = 48, 
        title = '',
        withBoxShadow = false,
        data,
        clickFunction,
        itemIsPlaying = false,
    } = props;

    const handlePlay = (event) => {
        if (clickFunction) {
            clickFunction(event);
        }
    };

    const sizes = {
        32: 'size-small',
        48: 'size-base',
        56: 'size-large',
    };

    const padding = {
        32: '8px',
        48: '8px',
        56: '0',
    };

    const icon = {
        32: itemIsPlaying ? <PauseLargeIcon /> : <PlayLargeIcon />,
        48: itemIsPlaying ? <PauseLargeIcon /> : <PlayLargeIcon />,
        56: itemIsPlaying ? <PauseIcon /> : <PlayIcon />,
    };

    return (
        <Tooltip content={`Play ${title}`} 
            position = "top"
        >
            <Button 
                hasIcon 
                icon={icon[size]} 
                borderRadius="circle" 
                variant="primary" 
                size={sizes[size]} 
                iconSize={size !== 32 ? "medium-icon" : ''}
                padding={padding[size]} 
                withBoxShadow={withBoxShadow}
                clickFunction={handlePlay}
            />
        </Tooltip>
    )
};

export default PlayButton;