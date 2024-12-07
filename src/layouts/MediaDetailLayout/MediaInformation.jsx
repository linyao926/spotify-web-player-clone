import { Link } from 'react-router';
import { formatMillisecondsToMinutes, formatToYear } from '~/utils/timeUtils';
import ResponsiveTitle from '~/components/ResponsiveTitle/ResponsiveTitle';
import classNames from 'classnames/bind';
import styles from '~/styles/layouts/MediaDetailLayout.module.scss';

const cx = classNames.bind(styles);

const MediaInformation = (props) => {
    const {
        type = '',
        title = '',
        description = '',
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
        <div className={cx('media-information-container')}>
            <span className={cx('media-information-type')}>{type === 'track' ? 'song' : type}</span>
            <ResponsiveTitle 
                title={title}
                sidebarWidth={72} 
                extraComponentWidth={300} 
                isExtraComponentVisible={false} 
                clickFunction={() => {
                    if (isEditable) {
                        dispatch(openModal({id: 'edit-playlist'}))
                    }
                }}
            />
            {description && <div>{description}</div>}
            <div className={cx('media-information-subtitles')}>
            {[
            authorImgUrl && (
                <img
                    key={'author_img'}
                    src={authorImgUrl}
                    alt={`${authorName} avatar`}
                    className={cx('media-information-author-img')}
                />
            ),
            authorName && (
                <Link 
                    to={type === 'playlist' ? `/user/${authorId}` : `/artist/${authorId}`}
                    key={'author_name'} 
                    className={cx('media-information-author')}
                >{authorName}</Link>
            ),
            publicPlaylists > 0 && (
                <span key={'public_playlists'} style={{ fontSize: '1rem', color: 'var(--text-base)' }}>
                    {publicPlaylists} Public Playlists
                </span>
            ),
            followingCount > 0 && (
                <span key={'following'} style={{ fontSize: '1rem', color: 'var(--text-base)' }}>
                    {followingCount} Following
                </span>
            ),
            followerCount && (
                <span key={'follower'} style={{ fontSize: '1rem', color: 'var(--text-base)' }}>
                    {followerCount} followers
                </span>
            ),
            albumName && (
                <Link 
                    to={`/album/${albumId}`}
                    key={'album_name'} 
                    className={cx('media-information-album')}
                >{albumName}</Link>
            ),
            releaseDate && <span key={'release_date'}>{formatToYear(releaseDate)}</span>,
            duration && <span key={'duration'}>{formatMillisecondsToMinutes(duration)}</span>,
            trackCount > 0 && (
                <span key={'track_count'} className={cx('media-stats')}>
                    <span>{`${trackCount} songs`}</span>
                    {totalDuration && <span>{totalDuration}</span>}
                </span>
            ),].filter(Boolean)}
            </div>
        </div>
    );
};

export default MediaInformation;