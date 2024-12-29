import React from 'react';
import { Link } from 'react-router-dom';
import {  
  ShuffleIcon,
  RemoveFromIcon,
  AddToLibraryIcon,
} from '~/assets/icons/icons';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/PlayingBar.module.scss';

const cx = classNames.bind(styles);

function PlayingInfo(props) {
    const {
      infoData = {},
    } = props;

    function isObjectEmpty(obj) {
      return obj && typeof obj === 'object' && Object.keys(obj).length === 0;
    }
    
    if (isObjectEmpty(infoData) || infoData === null) {
        return (<div className={cx('now-playing-info')}></div>)
    } else if (infoData) {
        const artistsList = infoData.artists.map(artist => (
          <Link key={artist.id} 
            className={cx('info-artist')}
            to={`/artist/${artist.id}`}
          >{artist.name}</Link>
        ));

        return (<div className={cx('now-playing-info')}>
            <img className={cx('info-cover')} 
              src={infoData.album.images[0].url}
              alt=''
            />
            <div className={cx('info-content')}>
              <Link className={cx('album')}
                to={`/album/${infoData.album.id}`}
              >{infoData.album.name}</Link>
              <span className={cx('info-artists-wrapper')}>
                {artistsList}
              </span>
            </div>
            <span className={cx('info-icon-wrapper')}>
                {true ? <AddToLibraryIcon /> : <RemoveFromIcon />}
            </span>
        </div>)
    }
}
  
export default PlayingInfo;