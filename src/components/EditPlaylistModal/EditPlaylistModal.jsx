import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '~/redux/slices/uiSlice';
import { uploadImageToPlaylist } from '~/redux/slices/myPlaylistSlice';
import { DismissIcon, InfoIcon} from '~/assets/icons/icons';
import CoverWrapper from './CoverWrapper';
import FormWrapper from './FormWrapper';
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
        description = '',
        id = '',
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
                    <CoverWrapper 
                        dispatch={dispatch}
                        coverUrl = {coverUrl}
                        coverFallback = {coverFallback}
                        id = {id}
                    />
                    <FormWrapper 
                        formData={formData}
                        setFormData={setFormData}
                        setAlertMessage={setAlertMessage}
                        setHasChanges={setHasChanges}
                        setOpenNotification={setOpenNotification}
                    />
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