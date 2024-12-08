import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createPlaylist } from '~/redux/slices/myPlaylistSlice';
import { openModal } from '~/redux/slices/uiSlice';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Sidebar.module.scss';

const cx = classNames.bind(styles);

function CreatePlaylistPrompt () {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.auth);
    const playlists = useSelector((state) => state['my_playlist']);

    // console.log(playlists)

    const navigate = useNavigate();

    const [createNewPlaylist, setCreateNewPlaylist] = useState(false);

    const handleCreatePlaylist = () => {
        dispatch(createPlaylist());
        setCreateNewPlaylist(true);
    };

    useEffect(() => {
        if (createNewPlaylist) {
            navigate(`/my_playlist/${playlists[playlists.length - 1].id}`);
        }
    }, [playlists]);

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
                clickFunction={() => {
                    accessToken 
                    ? handleCreatePlaylist()
                    : dispatch(openModal({id: 'login-prompt'}))}
                }
            >Create playlist</Button>
        </section>
    )
};

export default CreatePlaylistPrompt;