import { useEffect, useState } from 'react';

const useDynamicColumns = (containerRef, initialColumns, showIndex) => {
    const [currentColumns, setCurrentColumns] = useState(initialColumns);
    const [templateColumns, setTemplateColumns] = useState('');

    // Adjust columns dynamically based on container width and initialColumns
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const adjustColumns = (width) => {
            let maxColumns;
            if (width > 998) {
                maxColumns = 6;
            } else if (width > 728) {
                maxColumns = 5;
            } else if (width > 500) {
                maxColumns = 4;
            } else {
                maxColumns = 3;
            }
            setCurrentColumns(Math.min(initialColumns, maxColumns));
        };

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                adjustColumns(entry.contentRect.width);
            }
        });

        observer.observe(container);

        return () => observer.disconnect();
    }, [initialColumns, containerRef]);

    useEffect(() => {
        switch (currentColumns) {
            case 6: 
                setTemplateColumns('six-cols');
                break;
            case 5: 
                setTemplateColumns('default');
                break;
            case 4: 
                setTemplateColumns('four-cols');
                break;
            case 3: 
                setTemplateColumns(showIndex ? 'three-cols' : 'three-cols-non-index');
                break;
            case 2: 
                setTemplateColumns('two-cols');
                break;
            default:
                setTemplateColumns('');
        }
    }, [currentColumns, showIndex]);

    return {templateColumns, currentColumns};
};

export default useDynamicColumns;
