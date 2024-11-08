import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Sidebar.module.scss';

const cx = classNames.bind(styles);

function CreatePlaylistPrompt (props) {
    return (
        <section className={cx('create-playlist-prompt')}>
            <div className={cx('create-playlist-prompt-text')}>
                <span className={cx('create-playlist-prompt-text__title')}>
                    Create your first playlist
                </span>
                <span className={cx('create-playlist-prompt-text__subtitle')}>
                    It's easy, we'll help you
                </span>
            </div>
            <Button 
                variant="background-base"
                size="size-small"
                borderRadius="rounded"
                padding="4px 16px"
            >Create playlist</Button>
        </section>
    )
};

export default CreatePlaylistPrompt;