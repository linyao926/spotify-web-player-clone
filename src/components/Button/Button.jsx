import React from 'react';
import {Link} from "react-router";
import classNames from 'classnames/bind';
import styles from '~/styles/components/Button.module.scss';

const cx = classNames.bind(styles);

function Button (props) {
    const {
        children,
        hasIcon = false,
        icon,
        iconPosition = '',
        iconActive = false,
        size,
        variant,
        withBorder = false,
        withBoxshadow = false,
        borderRadius = '',
        padding = '8px 32px',
        hoverEffect = ['hover-scale'],
        styles,
        clickFunction = () => {return},
        routeLink="",
        externalLink="",
        disableBlank = false,
        disableButton = false,
        iconSize,
        color,
    } = props;

    const buttonClasses = cx(
        'btn',
        iconPosition,
        variant,
        { 'with-border': withBorder },
        borderRadius,
        ...hoverEffect,
        size,
        iconActive && 'icon-active',
        disableButton && 'disable',
        iconSize,
        withBoxshadow && 'with-box-shadow',
        color,
    );

    const ButtonContent = (
        <>
            {hasIcon && icon}
            <span>{children}</span>
        </>
    );

    if (routeLink) {
        return (
            <Link className={buttonClasses} style={{ padding, ...styles }}
                  onClick={disableButton ? () => {return} : clickFunction}
                  to={routeLink}
            >
                {ButtonContent}
            </Link>
        );
    } else if (externalLink) {
        return (
            <a  href={externalLink} 
                target={disableBlank ? "_self" : "_blank"}
                className={buttonClasses} 
                style={{ padding, ...styles }}
            >
                {ButtonContent}
            </a>
        );
    } else {
        return (
            <button className={buttonClasses} style={{ padding, ...styles }}
                    onClick={disableButton ? () => {return} : clickFunction}
            >
                {ButtonContent}
            </button>
        )
    }
};

export default Button;