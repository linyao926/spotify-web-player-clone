import React from 'react';
import { uploadImageToPlaylist } from '~/redux/slices/myPlaylistSlice';
import { EditIcon } from '~/assets/icons/icons';
import classNames from 'classnames/bind';
import styles from '~/styles/components/EditPlaylistModal.module.scss';

const cx = classNames.bind(styles);

const CoverWrapper = (props) => {
    const {
        dispatch,
        coverUrl = '',
        coverFallback = '',
        id = '',
    } = props;

    const handleUploadImage = (playlistId, file) => {
        const reader = new FileReader();
        reader.onload = () => {
          dispatch(uploadImageToPlaylist({ playlistId, imageUrl: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className={cx('cover-img-wrapper')}>
            {coverUrl 
            ? <img className={cx('cover-img')} alt='cover' src={coverUrl} />
            : <span className={cx('cover-img-fallback')}>{coverFallback}</span>
            }
            <div className={cx('photo-edit-section')} 
                onClick={() => dispatch(openModal({id: 'edit-playlist'}))}
            >
                <EditIcon />
                <span>Choose photo</span>
            </div>
            <input
                type="file"
                onChange={(e) => handleUploadImage(id, e.target.files[0])}
                className={cx('input-upload-img')}
            />
        </div>
    );
};

export default CoverWrapper;