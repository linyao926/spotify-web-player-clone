import classNames from 'classnames/bind';
import styles from '~/styles/components/GuestContent.module.scss';

const cx = classNames.bind(styles);

function Browse() {
    return (
      <div className={cx('guest-content')}>
        <span className={cx('logo-wrapper')}>
            Browse page content
        </span>
      </div>
    );
}
  
export default Browse;