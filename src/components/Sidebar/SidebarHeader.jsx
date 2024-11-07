import React, { useState, useRef, useEffect } from 'react';
import { FillLibraryIcon, PlusIcon } from '~/assets/icons/icons';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Sidebar.module.scss';

const cx = classNames.bind(styles);

function SidebarHeader (props) {
    return (
        <header className={cx('sidebar-header')}>
            <Button
                hasIcon
                iconPosition="icon-left"
                icon={<FillLibraryIcon />}
                borderRadius="rounded"
                variant="transparent"
                size="size-medium"
                padding="4px 8px"
                hoverEffect={["hover-none-scale"]}
            >
                Your Library
            </Button>
            <Button 
                hasIcon
                icon={<PlusIcon />}
                borderRadius="circle"
                variant="transparent"
                size="size-small"
                padding="8px"
                hoverEffect={["hover-none-scale", "hover-button-highlight"]}
            />
        </header>
    )
};

export default SidebarHeader;