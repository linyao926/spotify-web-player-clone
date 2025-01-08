import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { updateProgress } from '~/redux/slices/playerSlice';
import { seekPlaybackThunk } from '~/redux/slices/playerSlice';
import classNames from 'classnames/bind';
import styles from '~/styles/components/PlayingBar.module.scss';

const cx = classNames.bind(styles);

const ProgressBar = (props) => {
    const { 
        playbackState,
    } = props;

    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.auth);
    const [progress, setProgress] = useState(playbackState['progress_ms'] || 0);

    useEffect(() => {
        if (
          playbackState &&
          playbackState.is_playing &&
          playbackState.item &&
          playbackState.item.duration_ms
        ) {
          const duration = playbackState.item.duration_ms;
          const currentProgress = playbackState.progress_ms;
          const percentage = (currentProgress / duration) * 100;
          setProgress(percentage);
        } else {
          setProgress(0);
        }
    }, [playbackState]);

    const handleSeek = (e) => {
        const newProgressMs = parseInt(e.target.value, 10); 
        dispatch(seekPlaybackThunk({token: accessToken, progressMs: newProgressMs})); 
    };

    const duration = playbackState?.item?.duration_ms || 0;

    // console.log(progress)

    return (
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
                    type="range"
                    min="0"
                    max="100%"
                    step="1"
                    value={progress}
                    onChange={handleSeek}
                />
            </label>
        </div>
    );
};

export default ProgressBar;
