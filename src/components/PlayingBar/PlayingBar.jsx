import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayer, fetchPlaybackState } from '~/redux/slices/playerSlice';
import { initializeSpotifyPlayer } from "~/utils/spotifyPlayer";
import PlayingInfo from './PlayingInfo';
import PlayerControls from './PlayerControls';
import PlayingBarActions from './PlayingBarActions';
import classNames from 'classnames/bind';
import styles from '~/styles/components/PlayingBar.module.scss';

const cx = classNames.bind(styles);

function PlayingBar() {    
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.auth);
    const nowPlaying = useSelector((state) => state['queue'].nowPlaying);
    const queuePlaylist = useSelector((state) => state['queue'].queueData);
    const itemIsPlaying = useSelector((state) => state['queue'].itemIsPlaying);
    const playbackState = useSelector((state) => state.player.playbackState);

    useEffect(() => {
      if (accessToken) {
        const setActiveDevice = async (deviceId, accessToken) => {
          try {
            await fetch("https://api.spotify.com/v1/me/player", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                device_ids: [deviceId],
                play: true,
              }),
            });
            console.log("Active device set successfully");
          } catch (error) {
            console.error("Failed to set active device", error);
          }
        };
  
        initializeSpotifyPlayer(accessToken, setActiveDevice);
      }
    }, [accessToken]);

    useEffect(() => {
        if (accessToken && nowPlaying) {
          dispatch(fetchPlayer({
            accessToken,
            uri: nowPlaying.uri,
          }));
          dispatch(fetchPlaybackState({ accessToken }));
        }
    }, [accessToken, nowPlaying, dispatch]);

    useEffect(() => {
      let intervalId;
  
      if (nowPlaying && playbackState && playbackState.is_playing) {
        intervalId = setInterval(() => {
          dispatch(fetchPlaybackState({ accessToken }));
        }, 1000);
      } else if (intervalId) {
        clearInterval(intervalId);
      } 
  
      return () => clearInterval(intervalId);
    }, [dispatch, playbackState, accessToken]);

    return (
      <footer className={cx('playing-bar-wrapper')}>
        <div className={cx('playing-bar')}>
            <PlayingInfo infoData={nowPlaying} />
            <PlayerControls 
              trackPlayingData = {nowPlaying} 
              playbackState={playbackState}             
            />
            <PlayingBarActions hasTrackPlay={nowPlaying} />
        </div>
      </footer>
    );
}
  
export default PlayingBar;