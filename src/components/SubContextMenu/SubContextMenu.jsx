import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/styles/components/SubContextMenu.module.scss';

const cx = classNames.bind(styles);

const SubContextMenu = (props) => {
    const { 
        items, 
        position,
        alignRight = false, 
    } = props;

    const [activeItems, setActiveItems] = useState(items.map(item => item.active || false));
    const [disableItems, setDisableItems] = useState(items.map(item => item.disableItem || false));
    const [subMenu, setSubMenu] = useState(null);

    const handleMouseEnter = (item, event) => {
        if (item.subMenu) {
            const subMenuPosition = {
                top: event.currentTarget.offsetTop,
                left: event.currentTarget.offsetWidth + 10,
            };
            setSubMenu({ items: item.subMenu, position: subMenuPosition });
        }
    };

    const handleItemClick = (item, index) => {
        if (item.toggle) {
            setActiveItems(prev => {
                const updated = [...prev];
                updated[index] = !updated[index];
                return updated;
            });
        }
        item.onClick();
    };

    return (
        <div 
            className={cx("subcontext-menu", alignRight ? 'align-right' : '')} 
            style={{ top: position.top, left: position.left }}
        >
            {items.map((item, index) => {
                const itemClasses = cx(
                    "subcontext-item", 
                    activeItems[index] ? "active" : "", 
                    item.textUnderline && "text-underline", 
                    item.borderBottom && 'border-bottom',
                    disableItems[index] ? "disable" : ""
                );
                
                return (
                    <div 
                        key={index} 
                        className={itemClasses} 
                        onClick={() => handleItemClick(item, index)}
                        onMouseEnter={(event) => handleMouseEnter(item, event)} 
                    >
                        {item.iconLeft && <span className={cx('subcontext-icon')}>{item.iconLeft}</span>}
                        <span className={cx("subcontext-item-text")}>{item.name}</span>
                        {item.iconRight && <span className={cx('subcontext-icon')}>{item.iconRight}</span>}
                        {item.subMenu && <span className={cx("arrow")}>▶</span>}
                    </div>
                )
            })}
            {subMenu && (
                <SubContextMenu 
                    items={subMenu.items} 
                    position={subMenu.position} 
                />
            )}
        </div>
    );
};

export default SubContextMenu;