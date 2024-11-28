import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { 
  fetchBrowseData, 
  selectBrowseData
} from '~/redux/slices/browseDataSlice';

function ResponsiveTitle(props) {
    const { 
        title, 
        sidebarWidth = 0, 
        extraComponentWidth = 0, 
        isExtraComponentVisible = false 
    } = props;

    const [fontSize, setFontSize] = useState(92);
    const [lineCount, setLineCount] = useState(1);
    const titleRef = useRef(null);

    const calculateAvailableWidth = () => {
        const windowWidth = window.innerWidth;
        const extraWidth = isExtraComponentVisible ? extraComponentWidth : 0;
        return windowWidth - sidebarWidth - extraWidth - 40; // 40px for padding
    };
    
    const measureText = () => {
        if (!titleRef.current) return;
    
        const titleElement = titleRef.current;
        const computedStyle = window.getComputedStyle(titleElement);
        const lineHeight = parseInt(computedStyle.lineHeight);
        const height = titleElement.offsetHeight;
        return Math.round(height / lineHeight);
    };
    
    const adjustFontSize = () => {
        const availableWidth = calculateAvailableWidth();
        let newFontSize = 92;
        let lines = measureText();
    
        // Adjust font size based on width and line count
        if (availableWidth < 1200) newFontSize = 72;
        if (availableWidth < 900) newFontSize = 48;
        if (availableWidth < 600) newFontSize = 32;
    
        // If font size is 32 and still more than 3 lines, keep it at 32
        if (newFontSize === 32 && lines > 3) {
          setLineCount(3);
        } else {
          setLineCount(lines);
        }
    
        setFontSize(newFontSize);
      };
    
      useEffect(() => {
        const handleResize = () => {
          adjustFontSize();
        };
    
        window.addEventListener('resize', handleResize);
        adjustFontSize(); // Initial adjustment
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, [sidebarWidth, isExtraComponentVisible, title]);

    return (
        <span 
            ref={titleRef}
            style={{
                color: '#fff',
                fontSize: `6rem`,
                maxWidth: `${calculateAvailableWidth()}px`,
                lineHeight: 1.3,
                ...(fontSize === 32 && {
                  display: '-webkit-box',
                  WebkitLineClamp: '3',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                })
            }}
        >
            {title}
        </span>
    );
}
  
export default ResponsiveTitle;