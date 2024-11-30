import React, { useRef, useEffect, useState, useCallback } from 'react';

function ResponsiveTitle({ title }) {
  const titleRef = useRef(null);
  const cloneRef = useRef(null);

  const [fontSize, setFontSize] = useState(6);
  const [translateXValue, setTranslateXValue] = useState(6);

  const fontSizeSteps = [6, 4.5, 3, 2]; 
  const translateValueSteps = [6, 5, 3, 2];
  const minFontSize = 2; 

  const getContentWidth = useCallback(() => {
    if (!cloneRef.current) return 0;
    return cloneRef.current.scrollWidth;
  }, []);

  const adjustFontSize = useCallback(() => {
    if (!titleRef.current) return;

    const parentWidth = titleRef.current.parentNode.offsetWidth; 
    let newFontSize = fontSizeSteps[0]; 

    for (const step of fontSizeSteps) {
      titleRef.current.style.fontSize = `${step}rem`;
      cloneRef.current.style.fontSize = `${step}rem`; 

      const contentWidth = getContentWidth();
      if (contentWidth <= parentWidth) {
        newFontSize = step;
        break;
      }
    }

    setFontSize(newFontSize);
  }, [getContentWidth]);

  useEffect(() => {
    const parentElement = titleRef.current?.parentNode;

    const resizeObserver = new ResizeObserver(() => {
      adjustFontSize();
    });

    if (parentElement) {
      resizeObserver.observe(parentElement);
    }

    return () => {
      if (parentElement) {
        resizeObserver.unobserve(parentElement);
      }
    };
  }, [adjustFontSize]);

  useEffect(() => {
    const index = Math.max(0, Math.min(translateValueSteps.length - 1, 6 - Math.ceil(fontSize))); 
    
    setTranslateXValue(translateValueSteps[index]);
  }, [fontSize]);

  return (
    <>
      <span
        ref={cloneRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          fontSize: `${fontSize}rem`,
        }}
      >
        {title}
      </span>

      <span
        ref={titleRef}
        style={{
          transform: `translateX(-${translateXValue}px)`,
          fontSize: `${fontSize}rem`,
          lineHeight: 1.3,
          color: '#fff',
          ...(fontSize === minFontSize && {
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }),
        }}
      >
        {title}
      </span>
    </>
  );
}

export default ResponsiveTitle;
