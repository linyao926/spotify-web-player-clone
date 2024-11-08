import { SpotifyLogoWithTitleIcon } from '~/assets/icons/icons';
import classNames from 'classnames/bind';
import styles from '~/styles/components/GuestContent.module.scss';

const cx = classNames.bind(styles);

function GuestContent() {
    return (
      <div className={cx('guest-content')}>
        <span className={cx('logo-wrapper')}>
            <SpotifyLogoWithTitleIcon />
        </span>
      </div>
    );
}
  
export default GuestContent;