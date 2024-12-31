import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openPanel, closePanel } from '~/redux/slices/uiSlice';
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
    const queuePlaylist = useSelector((state) => state['queue'].queueData);
    const nowPlaying = useSelector((state) => state['queue'].nowPlaying);
    const nextQueue = useSelector((state) => state['queue'].nextQueue);
    const nextFrom = useSelector((state) => state['queue'].nextFrom);

    const containerRef = useRef(null);

    function isObjectEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

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
                        clickFunction={() => dispatch(closePanel({name: 'queue'}))}
                    />
                </span>
            </header>
            <ScrollWrapper target={containerRef} />
            <div className={cx('queue-panel-container')}
                ref={containerRef}
            >
                {!isObjectEmpty(queuePlaylist)
                    ? <QueuePanelContent 
                        nowPlaying={nowPlaying}
                        nextFrom = {nextFrom}
                        nextQueue = {nextQueue}
                        title = {queuePlaylist.title}
                        playlistId = {queuePlaylist.id}
                        playlistType = {queuePlaylist.type}
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