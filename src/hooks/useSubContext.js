// import { useState, useEffect, useRef } from 'react';

// const useContextMenu = (initialIsVisible) => {
//     const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
//     const [points, setPoints] = useState({
//         x: 0,
//         y: 0,
//     });

//     const ref = useRef(null);

//     // Handle Right-Click context menu
//     useEffect(() => {
//         function handleContextMenu(e) {
//             if (ref.current && !ref.current.contains(e.target)) {
//                 setIsComponentVisible(false);
//             } else { 
//                 // Disable default right-click context menu
//                 e.preventDefault();
//             }
//         }

//         document.addEventListener('contextmenu', handleContextMenu);

//         return () => {
//             document.removeEventListener('contextmenu', handleContextMenu);
//         };
//     }, []);

//     // Handle click outside 
//     useEffect(() => {
//         document.addEventListener('click', handleClickOutside, true);
//         return () => {
//             document.removeEventListener('click', handleClickOutside, true);
//         };
//     }, []);

//     const handleClickOutside = (event) => {
//         if (ref.current && !ref.current.contains(event.target)) {
//             setIsComponentVisible(false);
//         }
//     };

//     return { 
//         ref, 
//         isComponentVisible, 
//         setIsComponentVisible, 
//         points,
//         setPoints 
//     };
// };

// export default useContextMenu;

import { useDispatch } from 'react-redux';
import { openSubContext, closeSpecificSubContext } from '~/redux/slices/uiSlice';
import { setPosition } from '~/redux/slices/positionSlice';

export const useSubContext = () => {
  const dispatch = useDispatch();

  // Hàm mở subcontext
  const handleOpenSubContext = (event, id) => {
    event.stopPropagation();
    const boundingRect = event.currentTarget.getBoundingClientRect();
    dispatch(
      setPosition({
        positionType: 'bottom-right',
        boundingRect: {
          height: boundingRect.height,
          width: boundingRect.width,
        },
      })
    );
    dispatch(openSubContext({ id }));
  };

  // Hàm đóng subcontext
  const handleCloseSubContext = (id) => {
    if (id && typeof id !== 'string' && typeof id !== 'number') {
      console.error('Invalid ID provided to handleCloseSubContext');
      return;
    }
    
    dispatch(closeSpecificSubContext({ id }));
  };

  return { handleOpenSubContext, handleCloseSubContext };
};