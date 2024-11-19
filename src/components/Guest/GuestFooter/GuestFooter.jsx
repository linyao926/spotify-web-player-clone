import Button from '../../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/GuestFooter.module.scss';

const cx = classNames.bind(styles);

function GuestFooter() {
    return (
      <footer className={cx('guest-footer-wrapper')}>
        <div className={cx('guest-footer')}>
            <div>
                <p className={cx('guest-footer-title')}>Preview of Spotify</p>
                <p className={cx('guest-footer-subtitle')}>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
            </div>
            <Button 
                variant="background-base"
                size="size-base"
                borderRadius="rounded"
            >Sign up free</Button>
        </div>
      </footer>
    );
}
  
export default GuestFooter;