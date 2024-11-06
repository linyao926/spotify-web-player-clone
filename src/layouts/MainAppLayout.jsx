import { useEffect, useState } from 'react';
import MainAppHeader from '~/components/MainAppHeader/MainAppHeader';
import classNames from 'classnames/bind';
import styles from '~/styles/MainAppLayout.module.scss';

const cx = classNames.bind(styles);

function MainAppLayout () {
    return (
        <main className={cx('main-app')}>
            <MainAppHeader />
            <div className={cx('body-section')}>
                <aside>sidebar</aside>
                <section>content</section>
                <div>overview layout</div>
            </div>
            <footer>footer</footer>
        </main>
    )
};

export default MainAppLayout;