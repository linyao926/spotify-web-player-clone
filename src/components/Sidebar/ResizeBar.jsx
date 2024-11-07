import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/styles/components/Sidebar.module.scss';

const cx = classNames.bind(styles);

const ResizeBar = ({sidebarWidth, setSidebarWidth}) => {
  // Bắt đầu kéo thanh resize
  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Xử lý khi kéo thanh resize
  const handleMouseMove = (e) => {
    const newWidth = Math.min(Math.max(280, e.clientX), 420);
    setSidebarWidth(newWidth);
  };

  // Kết thúc kéo thanh resize
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={cx("resize-bar")} onMouseDown={handleMouseDown}></div>
  );
};

export default ResizeBar;