import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '~/redux/slices/uiSlice';
import { selectAlbumData, fetchAlbumData } from '~/redux/slices/albumDataSlice';
import useDynamicColumns from '~/hooks/useDynamicColumns';
import { DurationRepresentIcon } from '~/assets/icons';
import {
    trackContextMenu,
    queueTrackContextMenu
} from '~/constants/subContextItems';
import TrackItemCard from '~/components/Card/TrackItemCard/TrackItemCard';
import TrackCreditModal from '../TrackCreditModal/TrackCreditModal';
import classNames from 'classnames/bind';
import styles from '~/styles/components/TrackListSection.module.scss';

const cx = classNames.bind(styles);

const TrackListSection = React.forwardRef((props, ref) => {
    const {
        headerType = 'bar',
        title = '',
        subtitle = '',
        subtitlePosition = 'bottom',
        data,
        viewAs = 'list',
        showAlbum = true,
        showArtist = true,
        showAddedDate = false,
        initialColumns = 5,
        isFixed = false,
        isVisible = true,
        nonIndex = false,
        related = false,
        seeMore = false,
        showAll = false,
        showAddToLibrary,
        showExpand,
        inQueue = false,
        inArtist = false,
        artistId = '',
    } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const headerRef = useRef(null);

    const { accessToken } = useSelector((state) => state.auth);
    const albumData = useSelector(selectAlbumData);
    const isCreditOpen = useSelector((state) => state.ui.modal['track-credit'].isOpen);

    const [albumId, setAlbumId] = useState('');
    const [isFullList, setIsFullList] = useState(false);
    const [creditModalState, setCreditModalState] = useState({
        title: '',
        performed: '',
        sourceTrack: ''
    });  

    const { currentColumns, templateColumns } = useDynamicColumns(headerRef, initialColumns, true);

    useEffect(() => {
        if (accessToken && albumId.length > 0) {
            dispatch(fetchAlbumData({accessToken, id: albumId}));
        }
    }, [accessToken, dispatch, albumId]);

    const trackListItems = data.map((item, index) => {
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

        if (related) {
            if ((index > 4 && index < 10) || (index > 14 && index < 19)) return;
        }

        if (!isFullList) {
            if (index > 4) return;
        }

        if (showAll) {
            if (index > 3) return;
        }

        const trackItem = {
            ...item,
            time_added: new Date().toISOString(),
            time_played: null,
        };

        let contextMenu = trackContextMenu(trackItem, 'ADD', dispatch, !showAlbum, inArtist, authors);

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

        if (inArtist) {
            const filteredAuthors = authors.filter(author => author.id !== artistId);
            if (filteredAuthors.length > 0) {
                contextMenu = trackContextMenu(trackItem, 'ADD', dispatch, !showAlbum, false, filteredAuthors);
            }
        }

        if (inQueue) {
            contextMenu = queueTrackContextMenu(trackItem, 'ADD', dispatch, authors);
        }

        return (
            <TrackItemCard 
                id={element.id}
                key={element.id}
                routeLink = {`/track/${element.id}`}
                trackIndex = {index + 1}
                imgUrl = {element.album.images[0].url}
                title = {element.name}
                authors = {authors}
                album = {element.album.name}
                addedDate = {item['added_at']}
                duration = {element['duration_ms']}
                showIndex={!nonIndex}
                showArtist={showArtist}
                showAlbum = {showAlbum}
                showAddedDate = {showAddedDate}
                initialColumns = {initialColumns}
                viewAs = {viewAs}
                showAddToLibrary={showAddToLibrary}
                showExpand={showExpand}
                contextMenu={contextMenu}
            />
        )
    });

    return (
        <section className={cx('track-list')} 
            ref={ref} 
        >
            {headerType === 'bar' && <header 
                className={cx('header-bar', templateColumns, isFixed && 'fixed', !isVisible && 'hidden')}
                ref={headerRef}            
            >
                {!nonIndex && <span className={cx('header-index')}>#</span>}
                <span>Title</span>
                {viewAs === 'compact' && currentColumns >= 4 && <span>Artist</span>}
                {(currentColumns >= 5 || (viewAs === 'list' && currentColumns >= 4)) && showAlbum && <span>Album</span>}
                {(currentColumns >= 6 || (viewAs === 'list' && currentColumns >= 5)) && showAddedDate && <span>Date added</span>}
                <span className={cx('header-duration')}><DurationRepresentIcon /></span>
            </header>}
            {headerType === 'title' && <header className={cx('header-title')}>
                <div className={cx('header-title-wrapper', subtitlePosition)}>
                    <span>{title}</span>
                    <span className={cx('header-subtitle')}>{subtitle}</span>
                </div>
                {showAll && <span className={cx('header-show-more-btn', 'show-more-btn')}>Show all</span>}
            </header>}
            <div className={cx('track-list-content')}>
                {trackListItems}
            </div>
            {seeMore && <span 
                className={cx('show-more-btn')}
                onClick={() => setIsFullList(!isFullList)}
            >
                {isFullList ? 'Show less' : 'See more'}
            </span>}
            {isCreditOpen && albumData.label && (
                <TrackCreditModal 
                    title = {creditModalState.title}
                    performed = {creditModalState.performed}
                    sourceTrack = {creditModalState.sourceTrack}
                />
            )}
        </section>
    );
});

export default TrackListSection;