import React from 'react';
import { useToggle } from '~/hooks/useToggle';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Sidebar.module.scss';

const cx = classNames.bind(styles);

function CreatePlaylistPrompt () {
    const { open } = useToggle();

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
                clickFunction={open}
            >Create playlist</Button>
        </section>
    )
};

export default CreatePlaylistPrompt;