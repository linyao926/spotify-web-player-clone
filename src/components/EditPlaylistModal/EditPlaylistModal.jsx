import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '~/redux/slices/uiSlice';
import { DismissIcon, InfoIcon, EditIcon } from '~/assets/icons/icons';
import Button from '../Button/Button';
import AlertMessage from '../AlertMessage/AlertMessage';
import classNames from 'classnames/bind';
import styles from '~/styles/components/EditPlaylistModal.module.scss';

const cx = classNames.bind(styles);

const EditPlaylistModal = (props) => {
    const {
        coverUrl = '',
        coverFallback = '',
        title = '',
        description = ''
    } = props;
    const dispatch = useDispatch();

    const [alertMessage, setAlertMessage] = useState({
        message: '',
        type: '',
    });
    const [formData, setFormData] = useState({
        playlistName: title,
        playlistDescription: description
    });
    const [hasChanges, setHasChanges] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);

    useEffect(() => {
        if (formData.playlistName.length === 0) {
            setAlertMessage({
                message: "Playlist name is required.",
                type: 'error'
            });
            setOpenNotification(true);
        } else {
            setOpenNotification(false);
        }
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setHasChanges(true);
    };

    const handleClose = () => {
        if (hasChanges) {
            setAlertMessage({
                message: "Press save to keep changes you've made.",
                type: ''
            });
            setOpenNotification(true);
            setHasChanges(false);
        } else {
            dispatch(closeModal({id: 'edit-playlist'}));
        }
    };

    const handleSave = (event) => {
        if (formData.playlistName.length > 0) {

        }
    }

    return (
        <div className={cx('edit-playlist')}
            onClick={handleClose}
        >
            <div className={cx('edit-playlist-container')}
                onClick={(event) => event.stopPropagation()}
            >
                <header>
                    <h3>Edit details</h3>
                    <span className={cx("close-btn-wrapper")}>
                        <Button 
                            hasIcon
                            icon={<DismissIcon />}
                            size="size-small"
                            variant="transparent"
                            borderRadius="circle"
                            padding="0"
                            hoverEffect={["hover-none-scale", "hover-button-tinted-base"]} 
                            clickFunction={handleClose}
                        />
                    </span>
                </header>
                {openNotification && <div className={cx('alert-message-wrapper')}>
                    <AlertMessage 
                        icon={<InfoIcon />}
                        message={alertMessage.message}
                        type={alertMessage.type}
                        fontSize="small"
                    />
                </div>}
                <div className={cx('edit-playlist-content')}>
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
                    </div>
                    <div className={cx('form-wrapper')}>
                        <label htmlFor="playlist-name"
                            className={cx('label-for-input')}
                        >
                            <span>Name</span>
                            <input 
                                id="playlits-name"
                                type="text" 
                                maxLength="100" 
                                placeholder="Add a name"
                                name="playlistName" 
                                value={formData.playlistName}
                                onChange={handleInputChange}
                                required
                                className={cx(formData.playlistName.length === 0 && 'error')}
                            />
                        </label>
                        <label htmlFor="playlist-description"
                            className={cx('label-for-textarea')}
                        >
                            <span>Description</span>
                            <textarea 
                                id="playlist-description"
                                maxLength="300" 
                                rows="3" 
                                placeholder="Add an optional description"
                                name="playlistDescription"
                                value={formData.playlistDescription}
                                onChange={handleInputChange}
                            ></textarea>
                        </label>
                    </div>
                </div>
                <span className={cx("save-btn-wrapper")}>
                    <Button
                        size="size-base"
                        variant="background-base"
                        borderRadius="rounded"
                        clickFunction={handleSave}
                    >Save</Button>
                </span>
                
                <span className={cx('upload-image-consent')}>By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</span>
            </div>
        </div>
    );
};

export default EditPlaylistModal;