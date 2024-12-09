import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '~/styles/components/EditPlaylistModal.module.scss';

const cx = classNames.bind(styles);

const FormWrapper = (props) => {
    const {
        formData, 
        setFormData,
        setAlertMessage,
        setHasChanges,
        setOpenNotification,
        id,
    } = props;

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
        const changeFormData = () => {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
            setHasChanges(true);
        };

        if (name === 'playlistName') {
            if (value.length <= 100) {
                changeFormData();
            }
        } else if (value.length <= 300) {
            changeFormData();
        }
    };

    return (
        <div className={cx('form-wrapper')}>
            <label htmlFor="playlist-name"
                className={cx('label-for-input')}
            >
                <div>
                    <span>Name</span>
                    <span className={cx('word-count')}>{formData.playlistName.length}/100</span>
                </div>
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
                <div>
                    <span>Description</span>
                    <span className={cx('word-count')}>{formData.playlistDescription.length}/300</span>
                </div>
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
    );
};

export default FormWrapper;