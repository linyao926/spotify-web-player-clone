import { useRef } from 'react';
import { useWindowSize } from 'react-use';
import { ExternalIcon } from '~/assets/icons/icons';
import languageOptions from '~/constants/languageOptions';
import Button from '~/components/Button/Button';
import ContentFooter from '~/components/ContentFooter/ContentFooter';
import ScrollWrapper from '~/components/ScrollWrapper/ScrollWrapper';
import classNames from 'classnames/bind';
import styles from '~/styles/pages/Settings.module.scss';

const cx = classNames.bind(styles);

function Settings() {
    const containerRef = useRef(null);
    const { width } = useWindowSize();

    const getToggleButton = (disable = false) => (
        <div className={cx('toggle-btn-wrapper')}>
            <label className={cx('toggle-btn', disable && 'disable')}>
                <input type="checkbox" disabled={disable} />
                <span className={cx('slider')}></span>      
            </label>
        </div>
    );

    const getSettingsSection = (title, description, item) => {
        return (
            <div className={cx('settings-section')}>
                <h4>{title}</h4>
                <div className={cx('settings-item')}>
                    <span className={cx('item-description')}>{description}</span>
                    {item}
                </div>
            </div>
        );
    }

    return (
        <>
            <ScrollWrapper target={containerRef}/>
            <div className={cx('settings-page-container')}
                ref={containerRef}
            >
                <div className={cx('settings-page-content')}>
                    <h2>Settings</h2>
                    {getSettingsSection(
                        'Account', 
                        'Edit login methods',
                        <div className={cx('external-btn-wrapper')}>
                            <Button
                                hasIcon
                                iconPosition="icon-right"
                                icon={<ExternalIcon />}
                                borderRadius="rounded"
                                variant="transparent"
                                size="size-small"
                                padding="3px 15px 3px 15px"
                                withBorder
                                externalLink='https://www.spotify.com/vn-vi/account/login-methods/'
                            >
                                Edit
                            </Button>
                        </div>
                    )}
                    {getSettingsSection(
                        'Language', 
                        'Choose language - Changes will be applied after restarting the app',
                        <select className={cx('language-options')}>
                            {languageOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                    {getSettingsSection(
                        'Your Library', 
                        'Use compact library layout',
                        getToggleButton()
                    )}
                    <div className={cx('settings-section')}>
                        <h4>Display</h4>
                        <div className={cx('settings-item')}>
                            <span className={cx('item-description')}>Show the now-playing panel on click of play</span>
                            {getToggleButton()}
                        </div>
                        <div className={cx('settings-item')}>
                            <span className={cx('item-description')}>Display short, looping visuals on tracks (Canvas)</span>
                            {getToggleButton(true)}
                        </div>
                    </div>
                    {getSettingsSection(
                        'Social', 
                        'Show my follower and following lists on my public profile',
                        getToggleButton()
                    )}
                </div>
                <ContentFooter />
            </div>
        </>
    );
}

export default Settings;