import React, { useRef } from 'react';
import { useLoaderData } from "react-router";
import { useGetId } from '~/hooks/useGetId';
import MediaDetailLayout from '~/layouts/MediaDetailLayout/MediaDetailLayout';
import TrackListSection from '~/components/TrackListSection/TrackListSection';
import MediaSection from '~/components/MediaSection/MediaSection';

function Artist(props) {
    const {
        
    } = props;

    const { id } = useGetId();

    const { artistInfo, artistAlbums, artistTopTracks } = useLoaderData();

    const mediaLayoutRef = useRef(null);
    const childRef = useRef(null);

    return (
        <MediaDetailLayout
            id={id}
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
                inArtist
                artistId = {id}
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