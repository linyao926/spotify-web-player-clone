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
            {items.map((item, index) => (
                <div 
                    key={index} 
                    className={cx("subcontext-item", activeItems[index] ? "active" : "")} 
                    onClick={() => handleItemClick(item, index)}
                    onMouseEnter={(event) => handleMouseEnter(item, event)} 
                >
                    {item.iconLeft && item.iconLeft}
                    <span className={cx("subcontext-item-text")}>{item.name}</span>
                    {item.iconRight && item.iconRight}
                    {item.subMenu && <span className={cx("arrow")}>▶</span>}
                </div>
            ))}
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