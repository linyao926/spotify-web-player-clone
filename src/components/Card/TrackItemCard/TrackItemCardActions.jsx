import React from 'react';
import { OptionSmallIcon, AddToLibrarySmallIcon } from '~/assets/icons';
import Button from '~/components/Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/TrackItemCard.module.scss';

const cx = classNames.bind(styles);

const TrackItemCardActions = (props) => {
    const {
        duration,
        showOptionOnly,
    } = props;

    return (
        <div className={cx('track-item-card-actions')}>
            {!showOptionOnly && <>
                <span className={cx('btn-wrapper')}>
                    <Button 
                        hasIcon 
                        icon={<AddToLibrarySmallIcon />} 
                        borderRadius="circle" 
                        variant="transparent" 
                        size="size-small" 
                        padding="8px" 
                    />
                </span>
                <span className={cx('track-item-duration')}>{duration}</span>
            </>}
            <span className={cx('btn-wrapper', showOptionOnly && 'option-btn-wrapper')}>
                <Button 
                    hasIcon 
                    icon={<OptionSmallIcon />} 
                    borderRadius="circle" 
                    variant="transparent" 
                    size="size-small" 
                    padding="8px" 
                />
            </span>
        </div>
    );
};

export default TrackItemCardActions;