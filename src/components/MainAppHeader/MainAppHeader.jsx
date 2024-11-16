import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '~/redux/slices/userSlice';
import { useSubContext } from '~/hooks/useSubContext';
import { 
    SpotifyLogoIcon, 
    HomeIcon, 
    FillHomeIcon, 
    InstallIcon, 
    NotificationIcon 
} from '~/assets/icons/icons';
import Button from '../Button/Button';
import SearchBox from '../SearchBox/SearchBox';
import { profileSubContext } from '~/components/SubContextMenu/subContextItems';
import SubContextMenu from '~/components/SubContextMenu/SubContextMenu';
import config from '~/config';
import classNames from 'classnames/bind';
import styles from '~/styles/components/MainAppHeader.module.scss';

const cx = classNames.bind(styles);

function MainAppHeader () {
    const dispatch = useDispatch();

    const { handleOpenSubContext, handleCloseSubContext } = useSubContext();

    const userData = useSelector((state) => state.user.userData);
    const userStatus = useSelector((state) => state.user.status);
    const { accessToken } = useSelector((state) => state.auth);
    const isSubContextOpen = useSelector((state) => state.ui.subContext.contexts['profile'].isOpen);
    const position = useSelector((state) => state.position);

    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        if (accessToken && userStatus === 'idle') {
          dispatch(fetchUserData(accessToken));
        }
    }, [accessToken, userStatus, dispatch]);


    const guestActions = (
        <>
            <Button
                variant="transparent"
                size="size-base"
                padding="8px 32px 8px 8px"
                borderRadius="rounded"
            >Sign up</Button>
            <Button 
                variant="background-base"
                size="size-base"
                borderRadius="rounded"
                externalLink={config.routes.login}
                disableBlank
            >Log in</Button>
        </>
    );

    const userActions = (
        <>
            <Button
                hasIcon
                icon={<InstallIcon />}
                iconActive
                iconPosition='icon-left'
                variant="transparent"
                size="size-small"
                padding="4px 16px 4px 33px"
                borderRadius="rounded"
                routeLink={config.routes.home}
            >Install App</Button>

            <Button 
                hasIcon
                icon={<NotificationIcon />}
                borderRadius="circle"
                variant="transparent"
                size="size-small"
                padding="16px"
                routeLink={config.routes.home}
            />
            
            <div className={cx("user-avatar-wrapper")}
                onClick={
                    isSubContextOpen 
                    ? (event) => handleCloseSubContext('profile')
                    : (event) => handleOpenSubContext(event, 'profile')
                }
            >
                {userData 
                ?   <img 
                        src={userData.images[0]?.url} 
                        alt="User Avatar" 
                        className={cx('user-avatar')}
                    /> 
                : <div className={cx('user-avatar')}></div>}
                {isSubContextOpen && <SubContextMenu 
                    items={profileSubContext} 
                    position={position} 
                    alignRight
                />}
            </div>
        </>
    );

    const handleSearch = (query) => {
        console.log("Searching for:", query);
    };
    
    return (
        <header className={cx('header')}>
            <Link className={cx('header-logo')}
                to={config.routes.home}
            >
                <SpotifyLogoIcon />
            </Link>
            <div className={cx('header-navigation')}>
                <Button 
                    hasIcon
                    icon={isHomePage ? <FillHomeIcon /> : <HomeIcon />}
                    iconActive
                    borderRadius="circle"
                    variant="elevated-base"
                    size="size-base"
                    padding="12px"
                    routeLink={config.routes.home}
                />
                <SearchBox size="large" borderRadius="rounded" onSearch={handleSearch} />
            </div>
            <div className={cx('header-user-actions')}>
                {accessToken ? userActions : guestActions}
            </div>
        </header>
    )
};

export default MainAppHeader;