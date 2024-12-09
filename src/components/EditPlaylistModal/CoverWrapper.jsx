import React from 'react';
import { EditIcon } from '~/assets/icons/icons';
import classNames from 'classnames/bind';
import styles from '~/styles/components/EditPlaylistModal.module.scss';

const cx = classNames.bind(styles);

const CoverWrapper = (props) => {
    const {
        newCoverImage = '',
        coverFallback = '',
        handleUploadImage,
    } = props;

    return (
        <div className={cx('cover-img-wrapper')}>
            {newCoverImage 
            ? <img className={cx('cover-img')} alt='cover' src={newCoverImage} />
            : <span className={cx('cover-img-fallback')}>{coverFallback}</span>
            }
            <div className={cx('photo-edit-section')}>
                <EditIcon />
                <span>Choose photo</span>
            </div>
            <input
                type="file"
                onChange={(e) => handleUploadImage(e.target.files[0])}
                className={cx('input-upload-img')}
            />
        </div>
    );
};

export default CoverWrapper;