import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '~/redux/slices/uiSlice';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/LoginPrompt.module.scss';

const cx = classNames.bind(styles);

const LoginPrompt = () => {
    const dispatch = useDispatch();

    return (
        <div className={cx('login-prompt')}>
            <div className={cx('login-prompt-content')}>
                <h2>Start listening with a free Spotify account</h2>
                <Button
                    size="size-base"
                    variant="primary"
                    borderRadius="rounded"
                >Sign up free</Button>
                <Button
                    size="size-base"
                    variant="transparent"
                    withBorder
                    borderRadius="rounded"
                    padding="7px 31px"
                >
                    <a>Download app</a>
                </Button>
                <span className={cx('content-login-link')}>
                    Already have an account?
                    <a>Log in</a>
                </span>
            </div>
            <Button 
                size="size-small"
                variant="transparent"
                clickFunction={() => dispatch(closeModal({id: 'login-prompt'}))}
            >Close</Button>
        </div>
    );
};

export default LoginPrompt;