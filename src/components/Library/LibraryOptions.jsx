import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import { useSubContext } from '~/hooks/useSubContext';
import { libraryOptionsSubContext } from '~/constants/subContextItems';
import SubContextMenu from '~/components/SubContextMenu/SubContextMenu';
import Button from '~/components/Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Library.module.scss';

const cx = classNames.bind(styles);

const LibraryOptions = (props) => {
    const {
        searchBoxVisible,
        options,
    } = props;
 
    const dispatch = useDispatch(); 
    const isSubContextOpen = useSelector((state) => state.ui.subContext['library-options'].isOpen);

    const initialSubContext = libraryOptionsSubContext(dispatch, options);

    const [subContext, setSubContext] = useState(initialSubContext);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [menuWidth, setMenuWidth] = useState(0);
    const [currentViewIcon, setCurrentViewIcon] = useState('');

    const optionsRef = useRef(null);

    const { handleOpenSubContext, handleCloseSubContext } = useSubContext();

    useEffect(() => {
        subContext.map((item) => {
            if (item.value === options['view-mode']) {
                setCurrentViewIcon(item.iconLeft);
            } 
        });
    
        setSubContext(libraryOptionsSubContext(dispatch, options)); 
    }, [options]);

    useEffect(() => {
        if (optionsRef.current && menuWidth > 0) {
            const optionsRect = optionsRef.current.getBoundingClientRect();
            const top = optionsRect.bottom;
            const left = optionsRect.right - menuWidth;

            setMenuPosition({ top, left });
        }
    }, [optionsRef, menuWidth]);

    return (
        <div className={cx('library-options')}
            onClick={
                isSubContextOpen 
                ? () => handleCloseSubContext('library-options')
                : (event) => handleOpenSubContext(event, 'library-options', 'bottom-right')
            }
            ref={optionsRef}
        >
            <Button 
                hasIcon
                icon={currentViewIcon != '' && currentViewIcon}
                iconPosition="icon-right"
                variant="transparent"
                borderRadius="rounded"
                size="size-small"
                padding="0"
            >{searchBoxVisible ? '' : options['sort-by']}</Button>
            {isSubContextOpen && <SubContextMenu 
                items={subContext} 
                position={menuPosition} 
                isFixed
                setMenuWidth={setMenuWidth}
            />}
        </div>
    )
};

export default LibraryOptions;