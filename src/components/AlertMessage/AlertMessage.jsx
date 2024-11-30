import React from 'react';
import classNames from 'classnames/bind';
import styles from '~/styles/components/AlertMessage.module.scss';

const cx = classNames.bind(styles);

const AlertMessage = (props) => {
    const {
        icon='', 
        message="",
        type="",
        fontSize="",
    } = props;

    const alertClasses = cx(
        'alert-message',
        type,
        fontSize,
    );

    return (
        <div className={alertClasses}>
            <span>{icon}</span>
            <span>{message}</span>
        </div>
    );
};

export default AlertMessage;