import React, { useState, useRef, useEffect } from 'react';
import { LanguageIcon } from '~/assets/icons/icons';
import Button from '../Button/Button';
import config from '~/config';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Sidebar.module.scss';

const cx = classNames.bind(styles);

function SidebarFooter (props) {
    return (
        <div className={cx('sidebar-footer')}>
            <section className={cx('sidebar-legal-links')}>
                <a target="_blank" href={config.externalLink.legal}>
                    Legal
                </a>
                <a target="_blank" href={config.externalLink.safety}>
                    Safety &amp; Privacy Center
                </a>
                <a target="_blank" href={config.externalLink.policy}>
                    Privacy Policy
                </a>
                <a target="_blank" href={config.externalLink.cookies}>
                    Cookies
                </a>
                <a target="_blank" href={config.externalLink.aboutAds}>
                    About Ads
                </a>
                <a target="_blank" href={config.externalLink.accessibility}>
                    Accessibility
                </a>
            </section>
            <div className={cx('sidebar-footer-btn-wrapper')}>
                <Button
                    hasIcon
                    iconPosition="icon-left"
                    icon={<LanguageIcon />}
                    borderRadius="rounded"
                    variant="transparent"
                    size="size-small"
                    padding="3px 15px 3px 15px"
                    withBorder
                >
                    English
                </Button>
            </div>
        </div>
    )
};

export default SidebarFooter;