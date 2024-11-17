import React from 'react';
import {  
  ShuffleIcon,
} from '~/assets/icons/icons';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/PlayingBar.module.scss';

const cx = classNames.bind(styles);

function PlayingInfo() {
    return (
        <div className={cx('now-playing-info')}></div>
    );
}
  
export default PlayingInfo;