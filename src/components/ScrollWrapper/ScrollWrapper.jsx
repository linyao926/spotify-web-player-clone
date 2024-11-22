import React, { useEffect, useRef } from 'react';
import { OverlayScrollbars } from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';


const ScrollWrapper = ({ target }) => {
    const osInstance = useRef(null);

    useEffect(() => {
        // Kiểm tra nếu target hợp lệ
        if (target && target.current) {
            // Khởi tạo OverlayScrollbars trên target
            osInstance.current = OverlayScrollbars(target.current, {
                elements: {
                    viewport: target.current,
                },
                scrollbars: {
                    theme: "os-theme-light",
                    clickScroll: true,
                    autoHide: 'leave',
                },
                overflow: {
                    x: 'hidden',
                    y: 'scroll',
                },
            });
        }

        // Cleanup khi component bị unmount
        return () => {
            if (osInstance.current) {
                osInstance.current.destroy();
            }
        };
    }, [target]);

    return null; // Component này chỉ dùng để quản lý scroll nên không render nội dung
};

export default ScrollWrapper;