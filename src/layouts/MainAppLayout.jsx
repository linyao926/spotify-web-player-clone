import React from 'react';
import { useToggle } from '~/hooks/useToggle';
import MainAppHeader from '~/components/MainAppHeader/MainAppHeader';
import Sidebar from '~/components/Sidebar/Sidebar';
import GuestContent from '~/components/GuestContent/GuestContent';
import GuestFooter from '~/components/GuestFooter/GuestFooter';
import LoginPrompt from '~/components/LoginPrompt/LoginPrompt';
import classNames from 'classnames/bind';
import styles from '~/styles/MainAppLayout.module.scss';

const cx = classNames.bind(styles);

function MainAppLayout () {
    const { isOpen } = useToggle();

    return (
        <main className={cx('main-app')}>
            <MainAppHeader />
            <div className={cx('body-section')}>
                <Sidebar />
                <GuestContent />
                {/* <div className={cx('overview')}>listening panel</div> */}
            </div>
            <GuestFooter />
            {isOpen && <LoginPrompt />}
        </main>
    )
};

export default MainAppLayout;