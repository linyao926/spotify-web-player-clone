import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import classNames from 'classnames/bind';
import styles from '~/styles/components/Tooltip.module.scss';

const cx = classNames.bind(styles);

const Tooltip = (props) => {
    const { 
        children, 
        content, 
        position = "top",
        isSubdued = false,
    } = props;

    const [visible, setVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({});

    const targetRef = useRef(null);

    useEffect(() => {
        const calculatePosition = () => {
        if (targetRef.current) {
            const rect = targetRef.current.getBoundingClientRect();
            const positions = {
                top: {
                    left: rect.left + window.scrollX + rect.width / 2,
                    top: rect.top + window.scrollY - 8,
                    transform: "translate(-50%, -100%)",
                },
                bottom: {
                    left: rect.left + window.scrollX + rect.width / 2,
                    top: rect.bottom + window.scrollY + 8,
                    transform: "translate(-50%, 0)",
                },
                left: {
                    left: rect.left + window.scrollX - 8,
                    top: rect.top + window.scrollY + rect.height / 2,
                    transform: "translate(-100%, -50%)",
                },
                right: {
                    left: rect.right + window.scrollX + 16,
                    top: rect.top + window.scrollY + rect.height / 2,
                    transform: "translate(0, -50%)",
                },
                "bottom-right": {
                    left: rect.right + window.scrollX, 
                    top: rect.bottom + window.scrollY + 8,
                    transform: "translate(-100%, 0)",
                },
                "bottom-left": {
                    left: rect.left + window.scrollX,
                    top: rect.bottom + window.scrollY + 8,
                    transform: "translate(0, 0)",
                },
            };
            setTooltipPosition(positions[position]);
        }
        };

        if (visible) {
            calculatePosition();
            window.addEventListener("scroll", calculatePosition);
            window.addEventListener("resize", calculatePosition);
        }

        return () => {
            window.removeEventListener("scroll", calculatePosition);
            window.removeEventListener("resize", calculatePosition);
        };
    }, [visible, position]);

    return (
        <>
            <div
                ref={targetRef}
                className={cx("tooltip-target")}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
                {children}
            </div>

            {visible &&
                createPortal(
                <div
                    className={cx("tooltip-content", isSubdued && 'subdued')}
                    style={{
                        left: tooltipPosition.left,
                        top: tooltipPosition.top,
                        transform: tooltipPosition.transform,
                    }}
                >
                    {content}
                </div>,
                document.body
            )}
        </>
    );
};

export default Tooltip;
