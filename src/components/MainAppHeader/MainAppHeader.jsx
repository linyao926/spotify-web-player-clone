import React, { useEffect } from 'react';
import { useLocation, Link } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { selectProfileInfo, fetchProfileData } from '~/redux/slices/profileSlice';
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
import { profileSubContext } from '~/constants/subContextItems';
import SubContextMenu from '~/components/SubContextMenu/SubContextMenu';
import config from '~/config';
import classNames from 'classnames/bind';
import styles from '~/styles/components/MainAppHeader.module.scss';

const cx = classNames.bind(styles);

function MainAppHeader () {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.auth);
    const profileInfo = useSelector(selectProfileInfo);
    const profileStatus = useSelector((state) => state.profile.status);

    const isSubContextOpen = useSelector((state) => state.ui.subContext.contexts['profile'].isOpen);
    const position = useSelector((state) => state.position);
    const { handleOpenSubContext, handleCloseSubContext } = useSubContext();

    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        if (accessToken && profileStatus === 'idle') {
          dispatch(fetchProfileData({accessToken}));
        }
    }, [accessToken, profileStatus, dispatch]);

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
                externalLink={config.routes('').login}
                disableBlank
            >Log in</Button>
        </>
    );

    const profileActions = (
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
                    ? () => handleCloseSubContext('profile')
                    : (event) => handleOpenSubContext(event, 'profile', 'bottom-right')
                }
            >
                {profileInfo
                ?   <img 
                        src={profileInfo.images[0]?.url} 
                        alt="Profile Avatar" 
                        className={cx('user-avatar')}
                    /> 
                : <div className={cx('user-avatar')}></div>}
                {isSubContextOpen && <SubContextMenu 
                    items={profileSubContext(profileInfo.id)} 
                    position={position} 
                    alignRight
                />}
            </div>
        </>
    );

    const handleSearch = (query) => {
        console.log("Searching for:", query);
    };

    const handleSearchClick = (inputRef) => {
        accessToken ? navigate("/search") : dispatch(openModal({id: 'login-prompt'}));
        inputRef.current.focus();
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
                <SearchBox 
                    size="large" 
                    borderRadius="rounded" 
                    onSearch={handleSearch} 
                    placeholder="What do you want to play?"
                    showBrowse
                    clickFunction={handleSearchClick}
                />
            </div>
            <div className={cx('header-user-actions')}>
                {accessToken ? profileActions : guestActions}
            </div>
        </header>
    )
};

export default MainAppHeader;