import React from 'react';
import { useToggle } from '~/hooks/useToggle';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/LoginPrompt.module.scss';

const cx = classNames.bind(styles);

const LoginPrompt = () => {
    const { close } = useToggle();

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
                clickFunction={close}
            >Close</Button>
        </div>
    );
};

export default LoginPrompt;