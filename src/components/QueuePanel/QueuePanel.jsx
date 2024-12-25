import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeSubContext } from '~/redux/slices/uiSlice';
import { DismissIcon, QueueIcon } from '~/assets/icons/icons';
import QueuePanelContent from './QueuePanelContent';
import Button from '../Button/Button';
import ScrollWrapper from '../ScrollWrapper/ScrollWrapper';
import classNames from 'classnames/bind';
import styles from '~/styles/components/QueuePanel.module.scss';

const cx = classNames.bind(styles);

function QueuePanel () {
    const dispatch = useDispatch(); 
    const { accessToken } = useSelector((state) => state.auth);
    const queuePlaylist = useSelector((state) => state['queue']);

    const containerRef = useRef(null);

    return (
        <section className={cx('queue-panel')}
            onClick={() => dispatch(closeSubContext())}
        >
            <header className={cx('queue-panel-header')}>
                <h3>Queue</h3>
                <span className={cx("close-btn-wrapper")}>
                    <Button 
                        hasIcon
                        icon={<DismissIcon />}
                        size="size-small"
                        variant="transparent"
                        borderRadius="circle"
                        padding="0"
                        hoverEffect={["hover-none-scale", "hover-button-tinted-base"]} 
                        clickFunction={() => {return}}
                    />
                </span>
            </header>
            <ScrollWrapper target={containerRef} />
            <div className={cx('queue-panel-container')}
                ref={containerRef}
            >
                {queuePlaylist.length > 0 || true 
                    ? <QueuePanelContent 
                        nowPlaying
                        nextFrom = {[]}
                        nextQueue = {[]}
                        title = 'Playlist 2024'
                        playlistId = '6AtpvRxDKuY1TzM5P2dXFG'
                        playlistType = 'playlist'
                    />
                    : <div className={cx('queue-panel-prompt')}>
                        <span className={cx("icon-wrapper")}><QueueIcon/></span>
                        <div className={cx("title-wrapper")}>
                            <span>Add to your queue</span>
                            <span className={cx("content-subtitle")}>Tap "Add to queue" from a track's menu to see it here</span>
                        </div>
                        <Button
                            variant="background-base"
                            size="size-small"
                            borderRadius="rounded"
                            padding="4px 16px"
                            // clickFunction={() => {
                            //     accessToken 
                            //     ? handleCreatePlaylist()
                            //     : dispatch(openModal({name: 'login-prompt'}))}
                            // }
                        >
                            Find something to play
                        </Button>
                    </div>
                }
            </div>
        </section>
    )
};

export default QueuePanel;