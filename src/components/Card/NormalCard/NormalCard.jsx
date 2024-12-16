import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux'; 
import { useSubContext } from '~/hooks/useSubContext';
import { PlayLargeIcon } from '~/assets/icons';
import Button from '~/components/Button/Button';
import SubContextMenu from '~/components/SubContextMenu/SubContextMenu';
import classNames from 'classnames/bind';
import styles from '~/styles/components/NormalCard.module.scss';

const cx = classNames.bind(styles);

const NormalCard = (props) => {
    const {
        id,
        imgCircle = false,
        imgUrl = '',
        imgFallback = '',
        title,
        subtitle,
        routeLink = '/search',
        disableTextHover = false,
        contextMenu = [], 
    } = props;

    const navigate = useNavigate();
    const isSubContextOpen = useSelector((state) => state.ui.subContext.contexts['library-item-menu'].isOpen);
    const contextMenuId = useSelector((state) => state.ui.subContext.contexts['library-item-menu'].id);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const { handleOpenSubContext, handleCloseSubContext } = useSubContext();

    useEffect(() => {
        document.addEventListener("contextmenu", handleClickOutside);
        return () => {
            document.removeEventListener("contextmenu", handleClickOutside);
        };
    }, []);

    const handleRightClick = (event) => {
        event.preventDefault(); 
        if (isSubContextOpen && contextMenuId === id) {
            handleCloseSubContext('library-item-menu');
        } else {
            handleOpenSubContext(event, 'library-item-menu', 'bottom-right', id)
        }
        setPosition({ left: event.clientX, top: event.clientY });
    };

    const handleClickOutside = (event) => {
        event.preventDefault();
        handleCloseSubContext('library-item-menu');
    };

    return (
        <div className={cx('normal-card')}
            onClick={() => navigate(routeLink)}
            onContextMenu={handleRightClick}
        >
            <div className={cx('normal-card-top')}>
                {imgUrl 
                    ? <img 
                        draggable="false" 
                        loading="lazy" 
                        src={imgUrl} 
                        alt="" 
                        className={cx('normal-card-img', imgCircle && 'circle')} 
                    />
                    : <span className={cx('normal-card-img', imgCircle && 'circle', 'fallback')}>{imgFallback}</span>
                }
                <div className={cx('play-btn-wrapper')}>
                    <Button 
                        hasIcon 
                        icon={<PlayLargeIcon />} 
                        borderRadius="circle" 
                        variant="primary" 
                        size="size-base" 
                        iconSize="medium-icon"
                        padding="8px" 
                    />
                </div>
            </div>
            <div className={cx('normal-card-bottom', disableTextHover && 'disable-hover')}>
                <Link className={cx('normal-card-title')}
                    to="/"
                >{title}</Link>
                <Link 
                    draggable="false" dir="auto" 
                    to="/artist/1qpe09vYC83Kbgro8hv4HN"
                >{subtitle}</Link>
            </div>
            {isSubContextOpen && contextMenuId === id &&  (
                <SubContextMenu 
                    items={contextMenu} 
                    position={position} 
                    isFixed
                />
            )}
        </div>
    );
};

export default NormalCard;