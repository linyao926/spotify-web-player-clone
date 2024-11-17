import React, { useState } from 'react';
import {  
  ShuffleIcon,
  PreviousIcon,
  PauseIcon,
  NextIcon,
  RepeatIcon,
} from '~/assets/icons/icons';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/PlayingBar.module.scss';

const cx = classNames.bind(styles);

function PlayerControls() {
    const [progress, setProgress] = useState(0);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setProgress(value); 
    };

    const createIconButton = (icon) => { 
        return ( 
            <Button 
                hasIcon 
                icon={icon} 
                borderRadius="circle" 
                variant="transparent" 
                size="size-small" 
                padding="8px" 
                hoverEffect={["hover-none-scale"]} 
                disableButton
            /> 
        ); 
    };

    return (
        <div className={cx('player-controls')}>
            <div className={cx('general-controls')}>
                {createIconButton(<ShuffleIcon />)}
                {createIconButton(<PreviousIcon />)}
                <span className={cx('playpause-wrapper')}>
                    {createIconButton(<PauseIcon />)}
                </span>
                {createIconButton(<NextIcon />)}
                {createIconButton(<RepeatIcon />)}
            </div>
            <div className={cx('playback')}>
                <div className={cx("playback-position")}>-:--</div>
                <div className={cx("playback-progressbar")}>
                    <label className={cx("hidden-visually")}>
                        Change progress
                        <input 
                            disabled="" 
                            type="range" 
                            min="0" 
                            max="100" 
                            step="1" 
                            value={progress}
                            onChange={handleInputChange}
                        />
                    </label>
                    <div className={cx("progress-bar-background")}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className={cx("playback-duration")}>-:--</div>
            </div>
        </div>
    );
}
  
export default PlayerControls;