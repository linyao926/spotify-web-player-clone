import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { 
    fetchArtistData, 
    selectArtistInfo,
    selectArtistAlbums,
    selectArtistTopTracks,
} from '~/redux/slices/artistSlice';
import MediaDetailLayout from '~/layouts/MediaDetailLayout/MediaDetailLayout';
import TrackListSection from '~/components/TrackListSection/TrackListSection';
import MediaSection from '~/components/MediaSection/MediaSection';

function Artist(props) {
    const {
        
    } = props;

    const dispatch = useDispatch(); 
    const { accessToken } = useSelector((state) => state.auth);
    const artistInfo = useSelector(selectArtistInfo);
    const artistAlbums = useSelector(selectArtistAlbums);
    const artistTopTracks = useSelector(selectArtistTopTracks);

    const mediaLayoutRef = useRef(null);
    const childRef = useRef(null);

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchArtistData({
                accessToken, 
                id: '3DOEOdwUYFkuzw2fQV5TDi'
            }));
        }
    }, [accessToken, dispatch]);

    return (
        <MediaDetailLayout
            coverUrl = {artistInfo?.images && artistInfo?.images[0].url}
            // coverFallback = {<ArtistFallbackIcon />}
            title = {artistInfo?.name}
            followerCount={artistInfo?.followers && artistInfo?.followers.total}
            coverIsCircle
            canFollow
            canShowOptions
            ref={mediaLayoutRef}
        >
            {artistTopTracks.tracks && <TrackListSection 
                data={artistTopTracks.tracks}
                initialColumns={4}
                ref={childRef}
                showAlbum
                headerType="title"
                title="Popular"
                seeMore
            />}
            {artistAlbums.items && <MediaSection 
                data={artistAlbums.items}
                type="album"
                title={`Discography`}
                showAll
                routeLink = {`/artist/${artistInfo.id}/discography/all`}
            />}
        </MediaDetailLayout>
    );
}
  
export default Artist;