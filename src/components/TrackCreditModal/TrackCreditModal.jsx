import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '~/redux/slices/uiSlice';
import { DismissIcon } from '~/assets/icons/icons';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/TrackCreditModal.module.scss';

const cx = classNames.bind(styles);

const TrackCreditModal = (props) => {
    const {
        title = '',
        performed = [''],
        written = '-',
        produced = '-',
        sourceTrack = '-',
    } = props;

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeModal({name: 'track-credit'}))
    }

    return (
        <div className={cx('track-credit')}
            onClick={handleClose}
        >
            <div className={cx('track-credit-container')}
                onClick={(event) => event.stopPropagation()}
            >
                <header>
                    <h3>Credits</h3>
                    <span className={cx("close-btn-wrapper")}>
                        <Button 
                            hasIcon
                            icon={<DismissIcon />}
                            size="size-base"
                            iconSize="medium-icon"
                            variant="transparent"
                            borderRadius="circle"
                            padding="0"
                            hoverEffect={["hover-none-scale", "hover-button-tinted-base"]} 
                            clickFunction={handleClose}
                        />
                    </span>
                </header>
                
                <div className={cx('track-credit-content')}>
                    <span className={cx('track-credit-title')}>{title}</span>
                    <div className={cx('track-credit-item')}>
                        <span className={cx('track-credit-label')}>Performed by</span>
                        <span className={cx('track-credit-value')}>{performed.join(', ')}</span>
                    </div>
                    <div className={cx('track-credit-item')}>
                        <span className={cx('track-credit-label')}>Written by</span>
                        <span className={cx('track-credit-value')}>{written}</span>
                    </div>
                    <div className={cx('track-credit-item')}>
                        <span className={cx('track-credit-label')}>Produced by</span>
                        <span className={cx('track-credit-value')}>{produced}</span>
                    </div>
                    <span className={cx('track-credit-source')}>Source: {sourceTrack}</span>
                </div>
            </div>
        </div>
    );
};

export default TrackCreditModal;