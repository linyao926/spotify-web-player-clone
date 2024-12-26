import React from 'react';
import { Outlet } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { closeSubContext } from '~/redux/slices/uiSlice';
import MainAppHeader from '~/components/MainAppHeader/MainAppHeader';
import Sidebar from '~/components/Sidebar/Sidebar';
import QueuePanel from '~/components/QueuePanel/QueuePanel';
import NowPlayingPanel from '~/components/NowPlayingPanel/NowPlayingPanel';
import GuestFooter from '~/components/Guest/GuestFooter/GuestFooter';
import PlayingBar from '~/components/PlayingBar/PlayingBar';
import LoginPrompt from '~/components/LoginPrompt/LoginPrompt';
import classNames from 'classnames/bind';
import styles from '~/styles/layouts/MainAppLayout.module.scss';

const cx = classNames.bind(styles);

function MainAppLayout () {
    const dispatch = useDispatch(); 

    const isLoginPromptOpen = useSelector((state) => state.ui.modal['login-prompt'].isOpen);
    const isDialogOpen = useSelector((state) => state.ui.dialog.isOpen);
    const { accessToken } = useSelector((state) => state.auth);

    return (
        <main className={cx('main-app')}
            onClick={() => dispatch(closeSubContext())}
        >
            <MainAppHeader />
            <div className={cx('body-section')}>
                <Sidebar />
                <Outlet /> 
                {/* {accessToken && isDialogOpen && <div className={cx('overview')}>listening panel</div>} */}
                {/* <QueuePanel /> */}
                {/* <NowPlayingPanel /> */}
            </div>
            {accessToken ? <PlayingBar/> : <GuestFooter />}
            {isLoginPromptOpen && <LoginPrompt />}
        </main>
    )
};

export default MainAppLayout;