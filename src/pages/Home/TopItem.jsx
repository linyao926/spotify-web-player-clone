import React from 'react';
import { useSelector } from 'react-redux'; 
import { useQueueHandler } from '~/hooks/useQueueHandler';
import images from '~/assets/images';
import PlayButton from '../../components/PlayButton/PlayButton';
import classNames from 'classnames/bind';
import styles from '~/styles/pages/Home.module.scss';

const cx = classNames.bind(styles);

function TopItem (props) {
    const { 
      id,
      title,
      coverUrl,
      type,
      topTracks, 
      setCurrentUrl,
      navigate,
    } = props;

    const playbackState = useSelector((state) => state.player.playbackState);

    const { handlePlayClick } = useQueueHandler({ type, id, title, coverUrl, progress_ms: playbackState ? playbackState.progress_ms : 0 });

    const queuePlaylist = useSelector((state) => state['queue'].queueData);
    const itemIsPlaying = useSelector((state) => state['queue'].itemIsPlaying);
    
    return (
        <div className={cx("item-wrapper")}
            onMouseEnter={() => {
                if (setCurrentUrl) {
                    setCurrentUrl(coverUrl)
                }
            }}
            onMouseLeave={() => {
                if (setCurrentUrl) {
                    setCurrentUrl(topTracks[0]?.album?.images[0]?.url)
                }
            }}
            onClick={() => {
                navigate(`/${type}/${id}`);
            }}
        >
          <img 
            src={coverUrl} 
            alt={`${title} avatar`} 
            className={cx("item-img")} 
            loading='lazy'
          />
          <div className={cx("item-details")}>
            <span className={cx("item-name")}>{title}</span>
            <span className={cx("item-btn-wrapper", (itemIsPlaying && queuePlaylist.id === id) && 'playing')}>
              <span className={cx("play-btn-wrapper")}>
                <PlayButton size={32} title={title} 
                    clickFunction={(event) => handlePlayClick(event)}
                    itemIsPlaying={itemIsPlaying ? queuePlaylist.id === id : false}
                />
              </span>
              {(itemIsPlaying && queuePlaylist.id === id) && <img alt="" src={images['EqualizerGreenIcon']} />}
            </span>
          </div>
        </div>
    );
}
  
export default TopItem;