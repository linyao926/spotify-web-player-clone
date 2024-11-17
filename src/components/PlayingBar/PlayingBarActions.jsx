import React from 'react';
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
    return (
        <div className={cx('playing-bar-actions')}></div>
    );
}
  
export default PlayingBarActions;