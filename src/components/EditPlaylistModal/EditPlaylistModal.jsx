import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '~/redux/slices/uiSlice';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/EditPlaylistModal.module.scss';

const cx = classNames.bind(styles);

const EditPlaylistModal = () => {
    const dispatch = useDispatch();

    return (
        <div className={cx('edit-playlist')}>
            <div className={cx('edit-playlist-container')}>
                <header>
                    <h3>Edit details</h3>
                    <Button 
                        size="size-small"
                        variant="transparent"
                        borderRadius="circle"
                        clickFunction={() => dispatch(closeModal())}
                    >Close</Button>
                </header>
                <div className={cx('edit-playlist-content')}>
                    <div className={cx('content-img-wrapper')} >
                        <img className={cx('content-img')} />
                    </div>
                    <div>
                        <input 
                            type="text" 
                            maxLength="100" 
                            placeholder="Playlist name"
                        />
                        <textarea 
                            maxLength="300" 
                            rows="3" 
                            placeholder="Add an optional description"
                        ></textarea>
                    </div>
                </div>
                <Button
                    size="size-base"
                    variant="transparent"
                    borderRadius="rounded"
                >Save</Button>
                <span className={cx('upload-image-consent')}>By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</span>
            </div>
        </div>
    );
};

export default EditPlaylistModal;