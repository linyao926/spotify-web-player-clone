import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectTrackItemsData, fetchTrackItemsData } from '~/redux/slices/trackItemsDataSlice';
import { closeSubContext } from '~/redux/slices/uiSlice';
import { DismissIcon, OptionSmallIcon, RemoveFromIcon, ShareIcon } from '~/assets/icons/icons';
import Button from '../Button/Button';
import ScrollWrapper from '../ScrollWrapper/ScrollWrapper';
import classNames from 'classnames/bind';
import styles from '~/styles/components/NowPlayingPanel.module.scss';

const cx = classNames.bind(styles);

function NowPlayingPanel (props) {
    const {

    } = props;

    const dispatch = useDispatch(); 
    const { accessToken } = useSelector((state) => state.auth);
    const trackItems = useSelector(selectTrackItemsData);

    const containerRef = useRef(null);

    return (
        <section className={cx('playing-panel')}
            onClick={() => dispatch(closeSubContext())}
        >
            <header className={cx('playing-panel-header')}>
                <Link to={`/`}>Playlist 2024</Link>
                <div className={cx('panel-actions')}>
                    <span className={cx('option-btn-wrapper')}>
                        <Button 
                            hasIcon 
                            icon={<OptionSmallIcon />} 
                            borderRadius="circle" 
                            variant="transparent" 
                            size="size-small" 
                            padding="8px" 
                        />
                    </span>
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
                </div>
            </header>
            <ScrollWrapper target={containerRef} />
            <div className={cx('playing-panel-container')}
                ref={containerRef}
            >
                <div className={cx('playing-panel-content')}>
                    <div className={cx('playing-panel-now')}>
                        <img 
                            src="https://i.scdn.co/image/ab67616d00001e027fa88f7fab105c0905177383"
                            alt=""
                            className={cx('playing-panel-now-cover')}
                        />
                        <div className={cx('playing-panel-now-info')}>
                            <div className={cx('info-text')}>
                                <Link to={`/album/2b3zs9iHVyKUHxMuBslW5b`}
                                    className={cx('info-title')}
                                >
                                    Freed from Desire (Xtm Remix Edit)
                                </Link>
                                <div className={cx('info-artists-wrapper')}>
                                    <Link to={`/artist/3OqTvcWgb0xaainosGVvuZ`}
                                    >Gala</Link>
                                    <Link to={`/artist/3OqTvcWgb0xaainosGVvuZ`}
                                    >Gala</Link>
                                </div>
                            </div>
                            <div className={cx('info-actions')}>
                                <span className={cx("info-action-btn-wrapper")}>
                                    <Button 
                                        hasIcon
                                        icon={<ShareIcon />}
                                        size="size-small"
                                        variant="transparent"
                                        borderRadius="circle"
                                        padding="0"
                                        hoverEffect={[]} 
                                        clickFunction={() => {return}}
                                    />
                                </span>
                                <span className={cx("info-action-btn-wrapper")}>
                                    <Button 
                                        hasIcon
                                        icon={<RemoveFromIcon />}
                                        size="size-small"
                                        variant="transparent"
                                        borderRadius="circle"
                                        padding="0"
                                        hoverEffect={[]} 
                                        clickFunction={() => {return}}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('playing-panel-next')}>
                        <div className={cx('next-in-queue-header')}>
                            <span className={cx('next-title')}>Next in queue</span>
                            <span className={cx('open-btn-wrapper')}>
                                <Button size="size-small"
                                    variant="transparent"
                                    padding="0"
                                >Open queue</Button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default NowPlayingPanel;