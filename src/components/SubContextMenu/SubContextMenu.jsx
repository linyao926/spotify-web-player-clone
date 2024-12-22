import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { useSubContext } from '~/hooks/useSubContext';
import { closeSubContext } from '~/redux/slices/uiSlice';
import { ExpandIcon } from '~/assets/icons/icons';
import classNames from 'classnames/bind';
import styles from '~/styles/components/SubContextMenu.module.scss';

const cx = classNames.bind(styles);

const SubContextMenu = (props) => {
    const { 
        items, 
        position,
        fromBottom = false,
        fromRight = false,
        alignRight = false, 
        isFixed = false,
        setMenuWidth,
        setMenuHeight,
    } = props;

    const dispatch = useDispatch();
    const [activeItems, setActiveItems] = useState(items.map(item => item.active || false));
    const [disableItems, setDisableItems] = useState(items.map(item => item.disableItem || false));
    const [subMenu, setSubMenu] = useState(null);
    const [subMenuPosition, setSubMenuPosition] = useState({top: 0, left: 0})

    const navigate = useNavigate();

    const menuRef = useRef(null);

    useEffect(() => {
        if (menuRef?.current) {
            if (setMenuWidth) {
                setMenuWidth(menuRef?.current.getBoundingClientRect().width);
            }

            if (setMenuHeight) {
                setMenuHeight(menuRef?.current.getBoundingClientRect().height);
            }
        }
    }, [menuRef, position, fromBottom]);

    const handleMouseEnter = (item, event, index) => {
        if (item.subMenu && item.subMenu.length > 0) {
            const parentRect = event.currentTarget.getBoundingClientRect(); 
            const subMenuWidth = menuRef?.current.getBoundingClientRect().width || 0;
            let calculatedLeft = parentRect.right + 5; 
            let calculatedTop = parentRect.top - 4; 

            if (calculatedLeft + subMenuWidth > window.innerWidth) {
                calculatedLeft = parentRect.left + 5; 
            }
            
            setSubMenu(index);
            setSubMenuPosition({ top: calculatedTop, left: calculatedLeft })
        }
    };

    const handleMouseLeave = () => {
        setSubMenu(null); 
    };

    const handleItemClick = (event, item, index) => {
        event.preventDefault(); 
        event.stopPropagation();

        if (item.toggle) {
            setActiveItems(prev => {
                const updated = [...prev];
                updated[index] = !updated[index];
                return updated;
            });
        }

        if (item.routeLink) {
            navigate(item.routeLink);
        }

        if (item.externalLink) {
            window.open(item.externalLink, '_blank');
        }

        if (item.onClick) item.onClick();

        dispatch(closeSubContext());
    };

    return (
        <div 
            className={cx("subcontext-menu", alignRight ? 'align-right' : '', isFixed && 'fixed')} 
            style={{ 
                top: fromBottom ? "auto" : position.top, 
                bottom: fromBottom ? `${window.innerHeight - position.top}px` : "auto",
                left: fromRight ? "auto" : position.left,
                right: fromRight ? `${window.innerWidth - position.left}px` : "auto",
            }}
            ref={menuRef}
            onMouseLeave={handleMouseLeave}
        >
            {items.map((item, index) => {
                const itemClasses = cx(
                    "subcontext-item", 
                    activeItems[index] ? "active" : "", 
                    item.textUnderline && "text-underline", 
                    item.borderBottom && 'border-bottom',
                    disableItems[index] ? "disable" : "",
                    item.hidden && 'hidden',
                    item.iconActive && 'icon-active'
                );
                
                return (
                    <div 
                        key={index} 
                        className={itemClasses} 
                        onClick={(event) => handleItemClick(event, item, index)}
                        onMouseEnter={(event) => handleMouseEnter(item, event, index)} 
                    >
                        {item.iconLeft && <span className={cx('subcontext-icon')}>{item.iconLeft}</span>}
                        <span className={cx("subcontext-item-text")}>{item.name}</span>
                        {item.iconRight && <span className={cx('subcontext-icon')}>{item.iconRight}</span>}
                        {item.subMenu && item.subMenu.length > 0 && <span className={cx("arrow")}><ExpandIcon /></span>}
                        {subMenu === index && (
                            <SubContextMenu 
                                items={item.subMenu} 
                                position={subMenuPosition} 
                                isFixed
                            />
                        )}
                    </div>
                )
            })}
        </div>
    );
};

export default SubContextMenu;