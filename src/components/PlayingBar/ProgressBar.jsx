import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { updateProgress } from '~/redux/slices/playerSlice';
// import { seekToAPI } from '~/services/playerAPI';
import classNames from 'classnames/bind';
import styles from '~/styles/components/PlayingBar.module.scss';

const cx = classNames.bind(styles);

const ProgressBar = (props) => {
    const { player } = props;
    // const progress = useSelector((state) => state.player.progress);
    // const duration = useSelector((state) => state.player.duration);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const newProgress = e.target.value;
        const positionMs = (newProgress / 100) * duration;
        // dispatch(updateProgress(newProgress));
        // seekToAPI(positionMs);
    };

    const progress = 0;

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
                    max="100"
                    step="1"
                    value={progress}
                    onChange={handleInputChange}
                />
            </label>
        </div>
    );
};

export default ProgressBar;
