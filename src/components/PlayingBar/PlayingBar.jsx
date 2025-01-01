import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayer } from '~/redux/slices/playerSlice';
import useSpotifyPlayer from '~/hooks/useSpotifyPlayer';
import PlayingInfo from './PlayingInfo';
import PlayerControls from './PlayerControls';
import PlayingBarActions from './PlayingBarActions';
import classNames from 'classnames/bind';
import styles from '~/styles/components/PlayingBar.module.scss';

const cx = classNames.bind(styles);

function PlayingBar() {
    const [player, setPlayer] = useState(undefined);
    
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.auth);
    const nowPlaying = useSelector((state) => state['queue'].nowPlaying);
    const queuePlaylist = useSelector((state) => state['queue'].queueData);
    const itemIsPlaying = useSelector((state) => state['queue'].itemIsPlaying);
    
    const { deviceId } = useSpotifyPlayer(accessToken);

    useEffect(() => {
        if (accessToken && nowPlaying) {
          dispatch(fetchPlayer({
            accessToken,
            uri: nowPlaying.uri,
            deviceId
          }));
        }
    }, [accessToken, nowPlaying]);

    return (
      <footer className={cx('playing-bar-wrapper')}>
        <div className={cx('playing-bar')}>
            <PlayingInfo infoData={nowPlaying} />
            <PlayerControls 
              trackPlayingData = {nowPlaying}
            />
            <PlayingBarActions hasTrackPlay={nowPlaying} />
        </div>
      </footer>
    );
}
  
export default PlayingBar;