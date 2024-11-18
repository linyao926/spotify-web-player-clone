import React, { useState, useEffect } from 'react';
import {  
  NowPlayingViewIcon,
  QueueIcon,
  VolumeLowIcon,
  VolumeMediumIcon,
  VolumeHighIcon,
  VolumeOffIcon
} from '~/assets/icons/icons';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/PlayingBar.module.scss';

const cx = classNames.bind(styles);

function PlayingBarActions() {
    const [volumeValue, setVolumeValue] = useState(100);
    const [previousVolumeValue, setPreviousVolumeValue] = useState(100);
    const [volumeIcon, setVolumeIcon] = useState(<VolumeHighIcon />);

    useEffect(() => {
      const volume = Number(volumeValue);
      if (volume === 0) { 
        setVolumeIcon(<VolumeOffIcon />); 
      } else if (volume <= 1/3 * 100) { 
        setVolumeIcon(<VolumeLowIcon />); 
      } else if (volume >= 2/3 * 100) { 
        setVolumeIcon(<VolumeHighIcon />); 
      } else { 
        setVolumeIcon(<VolumeMediumIcon />);
      };
    }, [volumeValue]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setVolumeValue(value); 
    };

    const handleMuteClick = () => {
      const volume = Number(volumeValue);
      if (volume === 0) {
        setVolumeValue(previousVolumeValue || 30);
      } else {
        setPreviousVolumeValue(volumeValue);
        setVolumeValue(0);
      }
    };

    const createIconButton = (icon, disable = false, clickFunction = null) => { 
        return ( 
            <Button 
                hasIcon 
                icon={icon} 
                borderRadius="circle" 
                variant="transparent" 
                size="size-small" 
                padding="8px" 
                hoverEffect={["hover-none-scale"]} 
                disableButton={disable}
                clickFunction={clickFunction}
            /> 
        ); 
    };

    return (
        <div className={cx('playing-bar-actions')}>
          {createIconButton(<NowPlayingViewIcon />, true)}
          {createIconButton(<QueueIcon />)}
          <div className={cx('volume')}>
            {createIconButton(volumeIcon, false, handleMuteClick)}
            <div className={cx("volume-bar")}>
                <div 
                    className={cx("range-slider-background")}
                    style={{ width: `${volumeValue}%` }}
                ></div>
                <div 
                    className={cx("range-slider-thumb")} 
                    style={{ left: `${volumeValue}%` }} 
                ></div>
                <label className={cx("hidden-visually")}> 
                    Change volume value 
                    <input 
                        className={cx('range-slider')}
                        disabled="" 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="1" 
                        value={volumeValue}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
          </div>
        </div>
    );
}
  
export default PlayingBarActions;