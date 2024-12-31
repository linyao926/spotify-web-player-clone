import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAlbumData, fetchAlbumData } from '~/redux/slices/albumDataSlice';
import { openModal } from '~/redux/slices/uiSlice';
import { getArtistsOfTrack } from '~/utils/trackHandler';
import {
    trackContextMenu,
    queueTrackContextMenu
} from '~/constants/subContextItems';
import Button from '../Button/Button';
import TrackItemCard from '../Card/TrackItemCard/TrackItemCard';
import TrackCreditModal from '../TrackCreditModal/TrackCreditModal';
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
    const albumData = useSelector(selectAlbumData);
    const isCreditOpen = useSelector((state) => state.ui.modal['track-credit'].isOpen);

    const navigate = useNavigate();

    const [albumId, setAlbumId] = useState('');
    const [creditModalState, setCreditModalState] = useState({
        title: '',
        performed: [''],
        sourceTrack: ''
    }); 

    useEffect(() => {
        if (accessToken && albumId.length > 0) {
            dispatch(fetchAlbumData({accessToken, id: albumId}));
        }
    }, [accessToken, dispatch, albumId]);

    const getTrackListItem = (list, isNextQueue = false, isNextFrom = false) => {
        const result = list.map((item, index) => {
            const authors = getArtistsOfTrack(item.artists);

            const trackItem = {
                ...item,
                time_added: new Date().toISOString(),
                time_played: null,
            };
    
            let contextMenu = trackContextMenu(trackItem, 'ADD', dispatch, false, false, authors);

            if (isNextQueue) {
                contextMenu = queueTrackContextMenu(trackItem, 'ADD', dispatch, authors);
            }
        
            contextMenu.map((obj) => {
                if (obj.name.includes('Go to album')) {
                    obj.onClick = () => navigate(`/album/${item.album.id}`); 
                }
    
                if (obj.name.includes('credits')) {
                    obj.onClick = () => {
                        setAlbumId(item.album.id);
                        if (albumData.label) {
                            setCreditModalState({
                                title: item.name,
                                performed: item.artists.map(artist => artist.name),
                                sourceTrack: albumData.label,
                            })
                        }
                        dispatch(openModal({name: 'track-credit'}))
                    };
                }
    
                return obj; 
            }); 
    
            return (
                <TrackItemCard 
                    id={item.id}
                    key={`${isNextFrom && 'next-from'}-${isNextQueue && 'next-queue'}-${index}-${item.id}`}
                    routeLink = {`/track/${item.id}`}
                    imgUrl = {item.album.images[0].url}
                    title = {item.name}
                    authors = {authors}
                    showIndex={false}
                    showOptionOnly
                    initialColumns = {2}
                    contextMenu={contextMenu}
                    displayInNextQueue={isNextQueue}
                    displayInNextFrom={isNextFrom}
                />
            )
        });

        return result;
    };

    return (
        <div className={cx('queue-panel-content')}>
            {nowPlaying && <div className={cx('now-playling')}>
                <span className={cx('content-header-title')}>Now playing</span>
                {getTrackListItem([nowPlaying])}
            </div>}
            {nextQueue.length > 0 && <div className={cx('next-in-queue')}>
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
                    {getTrackListItem(nextQueue, true)}
                </div>
            </div>}
            {nextFrom.length > 0 && <div className={cx('next-from')}>
                <span className={cx('content-header-title')}>
                    Next from: 
                    <Link to={`/${playlistType}/${playlistId}`}>{title}</Link>
                </span>
                <div className={cx('content-tracks')}>
                    {getTrackListItem(nextFrom, false, true)}
                </div>
            </div>}
            {isCreditOpen && albumData.label && (
                <TrackCreditModal 
                    title = {creditModalState.title}
                    performed = {creditModalState.performed}
                    sourceTrack = {creditModalState.sourceTrack}
                />
            )}
        </div>
    )
};

export default QueuePanelContent;