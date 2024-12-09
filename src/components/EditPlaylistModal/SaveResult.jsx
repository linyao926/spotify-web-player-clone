import React from 'react';
import Button from '../Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/EditPlaylistModal.module.scss';

const cx = classNames.bind(styles);

const SaveResult = (props) => {
    const {
        handleSave,
    } = props;

    return (
        <span className={cx("save-btn-wrapper")}>
            <Button
                size="size-base"
                variant="background-base"
                borderRadius="rounded"
                clickFunction={handleSave}
            >Save</Button>
        </span>
    );
};

export default SaveResult;