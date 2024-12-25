import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { closeSubContext } from '~/redux/slices/uiSlice';
import { selectTrackItemsData, fetchTrackItemsData } from '~/redux/slices/trackItemsDataSlice';
import { DismissIcon, QueueIcon } from '~/assets/icons/icons';
import Button from '../Button/Button';
import TrackItemCard from '../Card/TrackItemCard/TrackItemCard';
import {
    trackContextMenu,
    queueTrackContextMenu
} from '~/constants/subContextItems';
import { selectAlbumData, fetchAlbumData } from '~/redux/slices/albumDataSlice';
import classNames from 'classnames/bind';
import styles from '~/styles/components/QueuePanel.module.scss';

const cx = classNames.bind(styles);

function QueuePanelContent (props) {
    const {
        nowPlaying = {},
        nextFrom = [],
        nextQueue = [],
        title = '',
        playlistId = '',
        playlistType = '',
    } = props;

    const dispatch = useDispatch(); 
    const { accessToken } = useSelector((state) => state.auth);
    const trackItems = useSelector(selectTrackItemsData);
    useEffect(() => {
        if (accessToken) {
            dispatch(fetchTrackItemsData({accessToken, type: playlistType, id: playlistId}));
        }
    }, [accessToken, dispatch]);

    const getTrackListItem = (list) => {
        const result = list.map((item, index) => {
            let element;
            if (item.track) {
                element = item.track;
            } else {
                element = item;
            }
            const authors = element.artists.map(artist => (
                {
                    name: artist.name, 
                    id: artist.id,
                    onClick: () => navigate(`/artist/${artist.id}`)
                }
            ));
    
            const trackItem = {
                ...item,
                time_added: new Date().toISOString(),
                time_played: null,
            };
    
            let contextMenu = trackContextMenu(trackItem, 'ADD', dispatch);
    
            contextMenu.map((obj) => {
                if (obj.name.includes('Go to album')) {
                    obj.onClick = () => navigate(`/album/${element.album.id}`); 
                }
    
                if (obj.name.includes('credits')) {
                    obj.onClick = () => {
                        setAlbumId(element.album.id);
                        if (albumData.label) {
                            setCreditModalState({
                                title: element.name,
                                performed: element.artists.map(artist => artist.name),
                                sourceTrack: albumData.label,
                            })
                        }
                        dispatch(openModal({name: 'track-credit'}))
                    };
                }
    
                return obj; 
            });
    
            // if (inQueue) {
            //     contextMenu = queueTrackContextMenu(trackItem, 'ADD', dispatch, authors);
            // }
    
            return (
                <TrackItemCard 
                    id={element.id}
                    key={element.id}
                    routeLink = {`/track/${element.id}`}
                    trackIndex = {index + 1}
                    imgUrl = {''}
                    title = {element.name}
                    authors = {authors}
                    showIndex={false}
                    showOptionOnly
                    initialColumns = {2}
                    contextMenu={contextMenu}
                />
            )
        });

        return result;
    }

    return (
        <div className={cx('queue-panel-content')}>
            {true && <div className={cx('now-playling')}>
                <span className={cx('content-header-title')}>Now playing</span>
            </div>}
            {true && <div className={cx('next-in-queue')}>
                <div className={cx('next-in-queue-header')}>
                    <span className={cx('content-header-title')}>Next in queue</span>
                    <span className={cx('clear-btn-wrapper')}>
                        <Button size="size-small"
                            variant="transparent"
                            padding="0"
                        >Clear queue</Button>
                    </span>
                </div>
                <div className={cx('content-tracks')}>
                    {/* {getTrackListItem(trackItems)} */}
                </div>
            </div>}
            {true && <div className={cx('next-from')}>
                <span className={cx('content-header-title')}>
                    Next from: 
                    <Link to={`/${playlistType}/${playlistId}`}>{title}</Link>
                </span>
                <div className={cx('content-tracks')}>
                    {/* {getTrackListItem(trackItems)} */}
                </div>
            </div>}
        </div>
    )
};

export default QueuePanelContent;