import React, { useEffect, useRef } from 'react';
import { OverlayScrollbars } from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';


const ScrollWrapper = ({ target, contentScrollHandler = null, layoutScrollHandler = null }) => {
    const osInstance = useRef(null);

    useEffect(() => {
        if (target && target.current) {
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
            if (osInstance.current) {
                osInstance.current.on("scroll", () => {
                    const scrollInfo = osInstance.current.elements();
                    const scrollY = scrollInfo.target.scrollTop; 

                    if (typeof contentScrollHandler === "function") {
                        contentScrollHandler(scrollY);
                    }

                    if (typeof layoutScrollHandler === "function") {
                        layoutScrollHandler(scrollY);
                    }
                });
            }
        }


        return () => {
            if (osInstance.current) {
                osInstance.current.destroy();
            }
            if (target && target.current && contentScrollHandler) {
                target.current.removeEventListener('scroll', contentScrollHandler);
            }
        };
    }, [target]);

    return null; 
};

export default ScrollWrapper;