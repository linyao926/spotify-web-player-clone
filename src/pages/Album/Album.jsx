import React, { useRef, useState } from 'react';
import { useLoaderData } from "react-router";
import { useGetId } from '~/hooks/useGetId';
import MediaDetailLayout from '~/layouts/MediaDetailLayout/MediaDetailLayout';
import TrackListSection from '~/components/TrackListSection/TrackListSection';
import MediaSection from '~/components/MediaSection/MediaSection';
import { contentScrollHandler } from '~/utils/eventHandler';
import classNames from 'classnames/bind';
import styles from '~/styles/pages/Album.module.scss';

const cx = classNames.bind(styles);

function Album(props) {
    const {
        viewAs = 'list',
    } = props;

    const { id } = useGetId();

    const [isFixed, setIsFixed] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const { albumInfo, albumItems, relatedTrack } = useLoaderData();

    const mediaLayoutRef = useRef(null);
    const childRef = useRef(null);
    
    const handleScroll = (scrollY) => contentScrollHandler(scrollY, mediaLayoutRef, childRef, setIsFixed, setIsVisible);

    return (
        <MediaDetailLayout
            id={id}
            coverUrl = {albumInfo?.images && albumInfo?.images[0].url}
            // coverFallback = {<AlbumFallbackIcon />}
            type = {albumInfo["album_type"]}
            title = {albumInfo?.name}
            authorImgUrl={albumInfo?.artists && albumInfo.artists.images[0].url}
            authorName = {albumInfo?.artists && albumInfo.artists.name}
            authorId = {albumInfo?.artists && albumInfo?.artists.id}
            trackCount = {albumInfo && albumInfo['track_total']}
            totalDuration = '49 min 16 sec'
            canAddToLibrary
            canShowOptions
            canViewAs
            ref={mediaLayoutRef}
            contentScrollHandler={handleScroll}
        >
            <TrackListSection 
                data={albumItems}
                viewAs={viewAs}
                initialColumns={viewAs === 'list' ? 3 : 4}
                ref={childRef}
                isFixed={isFixed}
                isVisible={isVisible}
                showAlbum={false}
                parent={{
                    cover: albumInfo?.images && albumInfo?.images[0].url,
                    id: id,
                    title: albumInfo?.name,
                    type: 'album',
                }}
            />
            <div className={cx("release-info")}>
                <span>{new Date(albumInfo.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })}</span>
                {albumInfo.copyrights.map((copyright, index) => (
                    <span key={index}>
                    {copyright.type === "C" ? "©" : "℗"} {copyright.text}
                    </span>
                ))}
            </div>
            {/* {relatedTrack.tracks && relatedTrack.tracks.length > 0 && <MediaSection 
                data={relatedTrack.tracks}
                type="track"
                title={`More by ${albumInfo && albumInfo.artists && albumInfo.artists.name}`}
                routeLink = {`/artist/${albumInfo.artists.id}/discography`}
            />} */}
        </MediaDetailLayout>
    );
}
  
export default Album;