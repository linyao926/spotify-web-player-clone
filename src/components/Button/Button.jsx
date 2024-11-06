import classNames from 'classnames/bind';
import styles from '~/styles/components/Button.module.scss';

const cx = classNames.bind(styles);

function Button (props) {
    const {
        children,
        hasIcon = false,
        icon,
        iconPosition,
        size,
        variant,
        withBorder = false,
        borderRadius = '',
        padding = '8px 32px',
    } = props;

    const classNames = [
        hasIcon ? iconPosition : '',
        variant,
        withBorder ? 'with-border' : '',
        borderRadius,
        size,
    ];

    return (
        <button className={cx('btn', ...classNames)} style={{ padding }}>
            {hasIcon && icon}
            <span>{children}</span>
        </button>
    )
};

export default Button;