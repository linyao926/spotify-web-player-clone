// import { useLocation } from 'react-router-dom';
import { SpotifyLogoIcon, HomeIcon, FillHomeIcon } from '~/assets/icons/icons';
import Button from '../Button/Button';
import SearchBox from '../SearchBox/SearchBox';
import classNames from 'classnames/bind';
import styles from '~/styles/components/MainAppHeader.module.scss';

const cx = classNames.bind(styles);

function MainAppHeader () {
    // const location = useLocation();

    // const isHomePage = location.pathname === '/';
    const isHomePage = true;

    const handleSearch = (query) => {
        console.log("Searching for:", query);
    };
    
    return (
        <header className={cx('header')}>
            <div className={cx('header-logo')}>
                <SpotifyLogoIcon />
            </div>
            <div className={cx('header-navigation')}>
                <Button 
                    hasIcon
                    icon={isHomePage ? <FillHomeIcon /> : <HomeIcon />}
                    iconActive
                    borderRadius="circle"
                    variant="elevated-base"
                    size="size-base"
                    padding="12px"
                />
                <SearchBox size="large" borderRadius="rounded" onSearch={handleSearch} />
            </div>
            <div className={cx('header-user-actions')}>
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
                >Log in</Button>
            </div>
        </header>
    )
};

export default MainAppHeader;