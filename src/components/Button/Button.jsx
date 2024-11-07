import React from 'react';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Button.module.scss';

const cx = classNames.bind(styles);

function Button (props) {
    const {
        children,
        hasIcon = false,
        icon,
        iconPosition = '',
        size,
        variant,
        withBorder = false,
        borderRadius = '',
        padding = '8px 32px',
        hoverEffect = ['hover-scale'],
        styles,
    } = props;

    const buttonClasses = cx(
        'btn',
        iconPosition,
        variant,
        { 'with-border': withBorder },
        borderRadius,
        ...hoverEffect,
        size
    );

    return (
        <button className={buttonClasses} style={{ padding, ...styles }}>
            {hasIcon && icon}
            <span>{children}</span>
        </button>
    )
};

export default Button;