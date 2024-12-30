import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    togglePlayPause,
    toggleShuffle, 
    toggleRepeat,
    playPrevious, 
    playNext 
} from '~/redux/slices/queueSlice';
import {  
  ShuffleIcon,
  PreviousTrackIcon,
  PlayIcon,
  PauseIcon,
  NextTrackIcon,
  RepeatIcon,
  RepeatOneIcon,
} from '~/assets/icons/icons';
import { formatMillisecondsToMinutes } from '~/utils/timeUtils';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/PlayingBar.module.scss';

const cx = classNames.bind(styles);

function PlayerControls(props) {
    const {
        trackPlayingData,
    } = props;

    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.auth);
    const itemIsPlaying = useSelector((state) => state['queue'].itemIsPlaying);
    const isShuffle = useSelector((state) => state.queue.isShuffle);
    const repeatMode = useSelector((state) => state.queue.repeatMode);

    const [progress, setProgress] = useState(0);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setProgress(value); 
    };

    const createIconButton = (icon, clickFunction) => { 
        return ( 
            <Button 
                hasIcon 
                icon={icon} 
                borderRadius="circle" 
                variant="transparent" 
                size="size-small" 
                padding="8px" 
                hoverEffect={["hover-none-scale"]} 
                disableButton={!trackPlayingData}
                clickFunction={clickFunction}
            /> 
        ); 
    };

    return (
        <div className={cx('player-controls')}>
            <div className={cx('general-controls')}>
                <div className={cx('btn-wrapper', (trackPlayingData && isShuffle) && 'active')}>
                    {createIconButton(<ShuffleIcon />, () => dispatch(toggleShuffle()))}
                </div>
                {createIconButton(<PreviousTrackIcon />, () => dispatch(playPrevious()))}
                <span className={cx('playpause-wrapper', trackPlayingData && 'playing')}>
                    {createIconButton(trackPlayingData ? (itemIsPlaying ? <PauseIcon /> : <PlayIcon />) : <PauseIcon />, () => dispatch(togglePlayPause()))}
                </span>
                {createIconButton(<NextTrackIcon />, () => dispatch(playNext()))}
                <div className={cx('btn-wrapper', (trackPlayingData && repeatMode) && 'active')}>
                    {createIconButton(trackPlayingData ? (repeatMode === 2 ? <RepeatOneIcon /> : <RepeatIcon />) : <RepeatIcon />, () => dispatch(toggleRepeat()))}
                </div>
            </div>
            <div className={cx('playback')}>
                <div className={cx("playback-position")}>{trackPlayingData ? '0:00' : '-:--'}</div>
                <div className={cx("playback-progressbar")}>
                    <div 
                        className={cx("range-slider-background")}
                        style={{ width: `${progress}%` }}
                    ></div>
                    <div 
                        className={cx("range-slider-thumb")} 
                        style={{ left: `${progress}%` }} 
                    ></div>
                    <label className={cx("hidden-visually")}> 
                        Change progress 
                        <input 
                            className={cx('range-slider')}
                            disabled="" 
                            type="range" 
                            min="0" 
                            max="100" 
                            step="1" 
                            value={progress}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div className={cx("playback-duration")}>{trackPlayingData ? formatMillisecondsToMinutes(trackPlayingData['duration_ms']) : '-:--'}</div>
            </div>
        </div>
    );
}
  
export default PlayerControls;