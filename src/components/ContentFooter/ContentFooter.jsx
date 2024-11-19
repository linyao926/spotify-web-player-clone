import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    InstagramIcon,
    TwitterIcon,
    FacebookIcon
} from '~/assets/icons/icons';
import Button from '../Button/Button';
import { legalsLinkList, contentFooterLinkList } from '~/constants/listItems';
import config from '~/config';
import classNames from 'classnames/bind';
import styles from '~/styles/components/ContentFooter.module.scss';

const cx = classNames.bind(styles);

function ContentFooter () {
    const getSocialButton = (icon, externalLink) => {
        return (
          <Button 
            hasIcon
            icon={icon}
            variant={"non-active"}
            borderRadius="circle"
            size="size-medium"
            iconSize="small-icon"
            hoverEffect={["hover-none-scale"]} 
            externalLink={externalLink}
            padding="0" 
          />
        )
    };

    const getGroupLinks = (header, list) => {
        return (
            <div className={cx("group-links")}>
                <h3>{header}</h3>
                {list.map(item => (
                    <a 
                        href={item.link} 
                        target='_blank'
                        key={item.link}
                    >
                        {item.text}
                    </a>
                ))}
            </div>
        )
    };

    return (
        <footer className={cx('content-footer')}>
            <section className={cx('content-footer-top')}>
                <div className={cx('content-footer-company-links')}>
                    {getGroupLinks('Company', contentFooterLinkList.company)}
                    {getGroupLinks('Communities', contentFooterLinkList.communities)}
                    {getGroupLinks('Useful links', contentFooterLinkList.useful)}
                    {getGroupLinks('Spotify Plans', contentFooterLinkList.plans)}
                </div>
                <div className={cx("social-media-buttons")}>
                    {getSocialButton(
                        <InstagramIcon />, 
                        'https://www.instagram.com/spotify'
                    )}
                    {getSocialButton(
                        <TwitterIcon />, 
                        'https://x.com/spotify?mx=2'
                    )}
                    {getSocialButton(
                        <FacebookIcon />, 
                        'https://www.facebook.com/SpotifyVietnam/?brand_redir=6243987495'
                    )}
                </div>
            </section>
            <section className={cx('content-footer-bottom')}>
                <div className={cx('content-footer-legal-links')}>
                    {legalsLinkList.map(item => (
                        <a 
                            href={item.link} 
                            target='_blank'
                            key={item.link}
                        >
                            {item.text}
                        </a>
                    ))}
                </div>
                <span className={cx('content-footer-copyright')}>© 2024 Spotify AB</span>
            </section>
        </footer>
    )
};

export default ContentFooter;