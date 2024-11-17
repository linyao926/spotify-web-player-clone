import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Sidebar.module.scss';

const cx = classNames.bind(styles);

const ResizeBar = (props) => {
  const {
    sidebarWidth, 
    setSidebarWidth, 
    isCollapsed, 
    setIsCollapsed, 
    isShowMore, 
    setIsShowMore
  } = props;

  const screenWidth = window.innerWidth;

  // Constants
  const COLLAPSE_WIDTH = 72;
  const NORMAL_MIN_WIDTH = 280;
  const NORMAL_MAX_WIDTH = 420;
  const SHOW_MORE_MIN_WIDTH = 584;
  const SHOW_MORE_MAX_WIDTH = screenWidth - 416;

  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    let newWidth = sidebarWidth;

    if (accessToken && screenWidth > 768) {
      while (screenWidth - newWidth < 416) {
        if (newWidth > SHOW_MORE_MIN_WIDTH) {
          newWidth = screenWidth - 416;
        } else if (newWidth > NORMAL_MAX_WIDTH) {
          setIsShowMore(false);
          newWidth = NORMAL_MAX_WIDTH;
        } else if (newWidth > NORMAL_MIN_WIDTH) {
          newWidth = screenWidth - 416;
        } else {
          setIsCollapsed(true);
          newWidth = COLLAPSE_WIDTH;
        }
      }
    }

    setSidebarWidth(newWidth);
  }, [screenWidth, sidebarWidth])

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    let newWidth = e.clientX;

    if (accessToken) {
      if (newWidth >= SHOW_MORE_MIN_WIDTH) {
        newWidth = Math.min(Math.max(SHOW_MORE_MIN_WIDTH, e.clientX), SHOW_MORE_MAX_WIDTH);
      } else if (newWidth >= SHOW_MORE_MIN_WIDTH - 20) {
        setIsShowMore(true);
        newWidth = SHOW_MORE_MIN_WIDTH;
      } else if (newWidth < SHOW_MORE_MIN_WIDTH - 20 && newWidth > NORMAL_MAX_WIDTH + 20) {
        return;
      } else if (newWidth <= NORMAL_MAX_WIDTH + 20 && newWidth > NORMAL_MAX_WIDTH) {
        setIsShowMore(false);
        newWidth = NORMAL_MAX_WIDTH;
      } else if (newWidth > NORMAL_MIN_WIDTH && newWidth <= NORMAL_MAX_WIDTH) {
        newWidth = Math.min(Math.max(NORMAL_MIN_WIDTH, e.clientX), NORMAL_MAX_WIDTH);
      } else if (newWidth >= 252 && newWidth < NORMAL_MIN_WIDTH) {
        setIsCollapsed(false);
        newWidth = NORMAL_MIN_WIDTH;
      } else if (newWidth > NORMAL_MIN_WIDTH / 2 && newWidth < 252) {
        return;
      } else if (newWidth < NORMAL_MIN_WIDTH / 2) {
        setIsCollapsed(true);
        newWidth = COLLAPSE_WIDTH;
      }
    } else {
      newWidth = Math.min(Math.max(280, e.clientX), 420);
      setSidebarWidth(newWidth);
    }

    setSidebarWidth(newWidth);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={cx("resize-bar")} onMouseDown={handleMouseDown}></div>
  );
};

export default ResizeBar;