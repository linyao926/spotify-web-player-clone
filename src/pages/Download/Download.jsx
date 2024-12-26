import { useRef, useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import { SpotifyLogoWithTitleIcon } from '~/assets/icons/icons';
import ContentFooter from '~/components/ContentFooter/ContentFooter';
import ScrollWrapper from '~/components/ScrollWrapper/ScrollWrapper';
import classNames from 'classnames/bind';
import styles from '~/styles/pages/Download.module.scss';

const cx = classNames.bind(styles);

function Download() {
    const containerRef = useRef(null);
    const { width } = useWindowSize();
    const [isNarrow, setIsNarrow] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const width = entry.contentRect.width;
                setIsNarrow(width < 981);
            }
        });

        observer.observe(container);

        return () => {
            observer.disconnect();
        };
    }, [containerRef, width]);

    console.log(isNarrow)

    return (
        <>
            <ScrollWrapper target={containerRef}/>
            <div className={cx('download-page-container')}
                ref={containerRef}
            >
                <div className={cx('download-page-content-wrapper')}>
                    <div className={cx('download-page-content', isNarrow && 'narrow-view')}>
                        <div className={cx('download-info-section')}>
                            <span className={cx('logo-wrapper')}>
                                <SpotifyLogoWithTitleIcon />
                            </span>
                            <h2>Download Spotify for Windows</h2>
                            <div className={cx('download-description')}>Enjoy high-quality audio, offline playback, Windows Game Bar integration, and a lively friend feed to stay in tune with your friends’ favourites.</div>
                            <div className={cx('download-options-container')}>
                                <div className={cx('store-badge-container')}>
                                    <a 
                                        href="https://apps.microsoft.com/store/detail/9NCBCSZSJRSB?launch=true&amp;mode=mini&amp;cid=spotifywebplayer-store-button" 
                                        target="_blank"
                                        aria-label="Download Spotify on the Windows Store"
                                    >
                                        <img part="img" src="https://get.microsoft.com/images/en-us dark.svg" alt="Microsoft Store app badge" className={cx('badge-cover')}></img>

                                    </a>
                                </div>
                                <a draggable="false" target="_blank" href="https://download.scdn.co/SpotifySetup.exe" rel="noopener">
                                    <span>Download directly from Spotify</span>
                                </a>
                            </div>
                        </div>
                        <img
                            loading="lazy"
                            src="https://open.spotifycdn.com/cdn/images/download-page-image.781553a2.png"
                            alt="Mac image"
                            className={cx('download-page-cover')}
                        />
                    </div>
                </div>
                <ContentFooter />
            </div>
        </>
    );
}

export default Download;