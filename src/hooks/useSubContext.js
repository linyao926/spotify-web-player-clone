import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openSubContext, closeSpecificSubContext } from '~/redux/slices/uiSlice';
import { setPosition } from '~/redux/slices/positionSlice';

export const useSubContext = () => {
  const dispatch = useDispatch();
  const isSubContextOpen = useSelector((state) => state.ui.subContext.contexts['normal-card-menu'].isOpen);
  const contextMenuId = useSelector((state) => state.ui.subContext.contexts['normal-card-menu'].id);
  const [positionFixed, setPositionFixed] = useState({ top: 0, left: 0 });
  const [positionFromBottom, setPositionFromBottom] = useState(false);
  const [positionFromRight, setPositionFromRight] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const [menuWidth, setMenuWidth] = useState(0);
  

  useEffect(() => {
      const windowHeight = window.innerHeight;
      if (menuHeight > 0) {
          if (positionFixed.top + menuHeight > windowHeight) {
              setPositionFromBottom(true);
          } else {
              setPositionFromBottom(false);
          }
      }
  }, [menuHeight, positionFixed]);
  
  useEffect(() => {
      const windowWidth = window.innerWidth;
      if (menuWidth > 0) {
          if (positionFixed.left + menuWidth > windowWidth) {
              setPositionFromRight(true);
          } else {
              setPositionFromRight(false);
          }
      }
  }, [menuWidth, positionFixed]);

  const handleOpenSubContext = (event, name, position, id = '') => {
    event.stopPropagation();
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = event;

    dispatch(
      setPosition({
        positionType: position,
        clientX, 
        clientY,
        boundingRect: {
          height: boundingRect.height,
          width: boundingRect.width,
        },
      })
    );
    if (id.length > 0) {
      dispatch(openSubContext({ name, id }));
    } else {
      dispatch(openSubContext({ name }));
    }
  };

  const handleCloseSubContext = (name) => dispatch(closeSpecificSubContext({ name }));

  const handleOpenCardMenu = (event, name, id) => {
    event.preventDefault(); 

      if (isSubContextOpen && contextMenuId !== id) {
          handleCloseSubContext(name);
      } 
      
      if (!isSubContextOpen || contextMenuId !== id || contextMenuId === id) {
          handleOpenSubContext(event, name, 'bottom-right', id)
      }
      setPositionFixed({ left: event.clientX, top: event.clientY });
  };

  const handleCloseCardMenu = (event, name) => {
      event.preventDefault();
      handleCloseSubContext(name);
  };

  return { 
    handleOpenSubContext, 
    handleCloseSubContext, 
    positionFixed, 
    handleOpenCardMenu, 
    handleCloseCardMenu,
    positionFromBottom,
    positionFromRight, 
    setMenuHeight,
    setMenuWidth, 
  };
};