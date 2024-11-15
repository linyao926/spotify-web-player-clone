import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { closeSubContext } from '~/redux/slices/uiSlice';
import MainAppHeader from '~/components/MainAppHeader/MainAppHeader';
import Sidebar from '~/components/Sidebar/Sidebar';
import GuestContent from '~/components/GuestContent/GuestContent';
import GuestFooter from '~/components/GuestFooter/GuestFooter';
import PlayerControls from '~/components/PlayerControls/PlayerControls';
import LoginPrompt from '~/components/LoginPrompt/LoginPrompt';
import classNames from 'classnames/bind';
import styles from '~/styles/MainAppLayout.module.scss';

const cx = classNames.bind(styles);

function MainAppLayout () {
    const dispatch = useDispatch(); 

    const isModalOpen = useSelector((state) => state.ui.modal.isOpen);
    const isDialogOpen = useSelector((state) => state.ui.dialog.isOpen);
    const { accessToken } = useSelector((state) => state.user);

    return (
        <main className={cx('main-app')}
            onClick={() => dispatch(closeSubContext())}
        >
            <MainAppHeader />
            <div className={cx('body-section')}>
                <Sidebar />
                {accessToken ? <Outlet /> : <GuestContent />}
                {accessToken && isDialogOpen && <div className={cx('overview')}>listening panel</div>}
            </div>
            {accessToken ? <PlayerControls/> : <GuestFooter />}
            {isModalOpen && <LoginPrompt />}
        </main>
    )
};

export default MainAppLayout;