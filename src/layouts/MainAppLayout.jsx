import { useEffect, useState } from 'react';
import MainAppHeader from '~/components/MainAppHeader/MainAppHeader';
import Sidebar from '~/components/Sidebar/Sidebar';
import classNames from 'classnames/bind';
import styles from '~/styles/MainAppLayout.module.scss';

const cx = classNames.bind(styles);

function MainAppLayout () {
    return (
        <main className={cx('main-app')}>
            <MainAppHeader />
            <div className={cx('body-section')}>
                <Sidebar />
                <section className={cx('body-section-content')}>content</section>
                <div className={cx('overview')}>overview layout</div>
            </div>
            <footer>footer</footer>
        </main>
    )
};

export default MainAppLayout;