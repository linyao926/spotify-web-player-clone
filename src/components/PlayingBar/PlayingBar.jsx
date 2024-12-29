import React from 'react';
import { useSelector } from 'react-redux';
import PlayingInfo from './PlayingInfo';
import PlayerControls from './PlayerControls';
import PlayingBarActions from './PlayingBarActions';
import classNames from 'classnames/bind';
import styles from '~/styles/components/PlayingBar.module.scss';

const cx = classNames.bind(styles);

function PlayingBar() {
    const nowPlaying = useSelector((state) => state['queue'].nowPlaying);
    const queuePlaylist = useSelector((state) => state['queue'].queueData);
    const itemIsPlaying = useSelector((state) => state['queue'].itemIsPlaying);

    console.log(nowPlaying)

    return (
      <footer className={cx('playing-bar-wrapper')}>
        <div className={cx('playing-bar')}>
            <PlayingInfo infoData={nowPlaying} />
            <PlayerControls 
              itemIsPlaying={itemIsPlaying} 
              trackPlayingData = {nowPlaying}
            />
            <PlayingBarActions hasTrackPlay={nowPlaying} />
        </div>
      </footer>
    );
}
  
export default PlayingBar;