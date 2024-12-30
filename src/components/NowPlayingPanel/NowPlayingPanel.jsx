import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openPanel, closePanel } from '~/redux/slices/uiSlice';
import { closeSubContext } from '~/redux/slices/uiSlice';
import { selectAlbumData, fetchAlbumData } from '~/redux/slices/albumDataSlice';
import { updateContextMenuActions, getArtistsOfTrack } from '~/utils/trackHandler';
import { DismissIcon, OptionSmallIcon, RemoveFromIcon, ShareIcon } from '~/assets/icons/icons';
import { trackContextMenu } from '~/constants/subContextItems';
import Button from '../Button/Button';
import TrackItemCard from '../Card/TrackItemCard/TrackItemCard';
import TrackCreditModal from '../TrackCreditModal/TrackCreditModal';
import ScrollWrapper from '../ScrollWrapper/ScrollWrapper';
import classNames from 'classnames/bind';
import styles from '~/styles/components/NowPlayingPanel.module.scss';

const cx = classNames.bind(styles);

function NowPlayingPanel () {

    const dispatch = useDispatch(); 
    const { accessToken } = useSelector((state) => state.auth);
    const queuePlaylist = useSelector((state) => state['queue'].queueData);
    const nowPlaying = useSelector((state) => state['queue'].nowPlaying);
    const nextQueue = useSelector((state) => state['queue'].nextQueue);
    const nextFrom = useSelector((state) => state['queue'].nextFrom);
    const albumData = useSelector(selectAlbumData);
    const isCreditOpen = useSelector((state) => state.ui.modal['track-credit'].isOpen);

    const navigate = useNavigate();

    const [albumId, setAlbumId] = useState('');
    const [creditModalState, setCreditModalState] = useState({
        title: '',
        performed: '',
        sourceTrack: ''
    });

    useEffect(() => {
        if (accessToken && albumId.length > 0) {
            dispatch(fetchAlbumData({accessToken, id: albumId}));
        }
    }, [accessToken, dispatch, albumId]);

    // console.log(nextFrom)

    const containerRef = useRef(null);

    const getContextMenu = (item) => {
        const artists = getArtistsOfTrack(item.artists);

        const trackItem = {
            ...item,
            time_added: new Date().toISOString(),
            time_played: null,
        };

        let contextMenu = trackContextMenu(trackItem, 'ADD', dispatch, false, false, artists);
    
        contextMenu = updateContextMenuActions(contextMenu, navigate, setAlbumId, setCreditModalState, dispatch, albumData, item);

        return contextMenu;
    }

    return (
        <section className={cx('playing-panel')}
            onClick={() => dispatch(closeSubContext())}
        >
            <header className={cx('playing-panel-header')}>
                <Link to={`/${queuePlaylist.type}/${queuePlaylist.id}`}>{queuePlaylist.title}</Link>
                <div className={cx('panel-actions')}>
                    <span className={cx('option-btn-wrapper')}>
                        <Button 
                            hasIcon 
                            icon={<OptionSmallIcon />} 
                            borderRadius="circle" 
                            variant="transparent" 
                            size="size-small" 
                            padding="8px" 
                        />
                    </span>
                    <span className={cx("close-btn-wrapper")}>
                        <Button 
                            hasIcon
                            icon={<DismissIcon />}
                            size="size-small"
                            variant="transparent"
                            borderRadius="circle"
                            padding="0"
                            hoverEffect={["hover-none-scale", "hover-button-tinted-base"]} 
                            clickFunction={() => dispatch(closePanel({name: 'now-playing'}))}
                        />
                    </span>
                </div>
            </header>
            <ScrollWrapper target={containerRef} />
            <div className={cx('playing-panel-container')}
                ref={containerRef}
            >
                <div className={cx('playing-panel-content')}>
                    <div className={cx('playing-panel-now')}>
                        <img 
                            src={queuePlaylist.type === 'album' ? queuePlaylist.coverUrl : nowPlaying.album.images[0].url}
                            alt=""
                            className={cx('playing-panel-now-cover')}
                        />
                        <div className={cx('playing-panel-now-info')}>
                            <div className={cx('info-text')}>
                                <Link to={`/album/${nowPlaying.album.id}`}
                                    className={cx('info-title')}
                                >
                                    {nowPlaying.name}
                                </Link>
                                <div className={cx('info-artists-wrapper')}>
                                    {nowPlaying.artists.map(artist => (
                                        <Link 
                                            key={artist.id}
                                            to={`/artist/${artist.id}`}
                                        >{artist.name}</Link>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('info-actions')}>
                                <span className={cx("info-action-btn-wrapper")}>
                                    <Button 
                                        hasIcon
                                        icon={<ShareIcon />}
                                        size="size-small"
                                        variant="transparent"
                                        borderRadius="circle"
                                        padding="0"
                                        hoverEffect={[]} 
                                        clickFunction={() => {return}}
                                    />
                                </span>
                                <span className={cx("info-action-btn-wrapper")}>
                                    <Button 
                                        hasIcon
                                        icon={<RemoveFromIcon />}
                                        size="size-small"
                                        variant="transparent"
                                        borderRadius="circle"
                                        padding="0"
                                        hoverEffect={[]} 
                                        clickFunction={() => {return}}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                    {(nextQueue.length > 0 || nextFrom.length > 0) && <div className={cx('playing-panel-next')}>
                        <div className={cx('next-in-queue-header')}>
                            <span className={cx('next-title')}>Next in queue</span>
                            <span className={cx('open-btn-wrapper')}>
                                <Button size="size-small"
                                    variant="transparent"
                                    padding="0"
                                    clickFunction={() => {
                                        dispatch(openPanel({name: 'queue'}));
                                    }}
                                >Open queue</Button>
                            </span>
                        </div>
                        {nextQueue.length > 0 ? <TrackItemCard 
                            id={nextQueue[0].id}
                            key={nextQueue[0].id}
                            routeLink = {`/track/${nextQueue[0].id}`}
                            imgUrl = {nextQueue[0].album.images[0].url}
                            title = {nextQueue[0].name}
                            authors = {getArtistsOfTrack(nextQueue[0].artists)}
                            showIndex={false}
                            showOptionOnly
                            initialColumns = {2}
                            contextMenu={getContextMenu(nextQueue[0])}
                        /> : nextFrom.length > 0 && <TrackItemCard 
                            id={nextFrom[0].id}
                            key={nextFrom[0].id}
                            routeLink = {`/track/${nextFrom[0].id}`}
                            imgUrl = {nextFrom[0].album.images[0].url}
                            title = {nextFrom[0].name}
                            authors = {getArtistsOfTrack(nextFrom[0].artists)}
                            showIndex={false}
                            showOptionOnly
                            initialColumns = {2}
                            contextMenu={getContextMenu(nextFrom[0])}
                        />}
                    </div>}
                </div>
            </div>
            {isCreditOpen && albumData.label && (
                <TrackCreditModal 
                    title = {creditModalState.title}
                    performed = {creditModalState.performed}
                    sourceTrack = {creditModalState.sourceTrack}
                />
            )}
        </section>
    )
};

export default NowPlayingPanel;