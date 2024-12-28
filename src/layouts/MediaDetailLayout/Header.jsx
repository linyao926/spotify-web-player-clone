import React from 'react';
import { openModal } from '~/redux/slices/uiSlice';
import { EditIcon } from '~/assets/icons';
import MediaInformation from './MediaInformation';
import classNames from 'classnames/bind';
import styles from '~/styles/layouts/MediaDetailLayout.module.scss';

const cx = classNames.bind(styles);

const Header = (props) => {
    const { 
        coverUrl, 
        coverFallback, 
        isEditable, 
        backgroundBase, 
        coverIsCircle, 
        title, 
        description, 
        dispatch,
        type = '',
        authorImgUrl,
        authorName = '',
        authorId = '',
        albumName = '',
        albumId = '',
        releaseDate = '',
        duration = '',
        trackCount = '',
        totalDuration = '',
        publicPlaylists = '',
        followingCount = '',
        followerCount = '',
    } = props;
    return (
        <header className={cx('media-detail-header')}>
            <div
                className={cx('header-background')}
                style={{ backgroundColor: backgroundBase }}
            ></div>
            <div className={cx('gradient-overlay')}></div>
            <div className={cx('cover-img-container', coverIsCircle && 'cover-circle')}>
                {coverUrl ? (
                    <img
                        className={cx('cover-img', coverIsCircle && 'cover-circle')}
                        alt="cover"
                        src={coverUrl}
                    />
                ) : (
                    <span
                        className={cx('cover-img-fallback', isEditable && 'hide-cover', coverIsCircle && 'cover-circle')}
                    >
                        {coverFallback}
                    </span>
                )}
                {isEditable && (
                    <div
                        className={cx('photo-edit-section', coverIsCircle && 'cover-circle')}
                        onClick={() => dispatch(openModal({ name: 'edit-playlist' }))}
                    >
                        <EditIcon />
                        <span>Choose photo</span>
                    </div>
                )}
            </div>
            <MediaInformation
                type = {type}
                title = {title}
                description = {description}
                authorImgUrl = {authorImgUrl}
                authorName = {authorName}
                authorId = {authorId}
                albumName = {albumName}
                albumId = {albumId}
                releaseDate = {releaseDate}
                duration = {duration}
                trackCount = {trackCount}
                totalDuration = {totalDuration}
                publicPlaylists = {publicPlaylists}
                followingCount = {followingCount}
                followerCount = {followerCount}
                isEditable={isEditable}
                dispatch={dispatch}
                openModal = {openModal}
            />
        </header>
    );
};

export default Header;