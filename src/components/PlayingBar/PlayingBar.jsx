import React from 'react';
import {  
  ShuffleIcon,
  PreviousIcon,
} from '~/assets/icons/icons';
import PlayingInfo from './PlayingInfo';
import PlayerControls from './PlayerControls';
import PlayingBarActions from './PlayingBarActions';
import classNames from 'classnames/bind';
import styles from '~/styles/components/PlayingBar.module.scss';

const cx = classNames.bind(styles);

function PlayingBar() {
    return (
      <footer className={cx('playing-bar-wrapper')}>
        <div className={cx('playing-bar')}>
            <PlayingInfo />
            <PlayerControls />
            <PlayingBarActions />
        </div>
      </footer>
    );
}
  
export default PlayingBar;