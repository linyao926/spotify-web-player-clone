export const openSubContext = (event, positionType = "mouse", setPosition, setIsSubcontextOpen) => {
    event.preventDefault();
  
    let top, left;
  
    if (positionType === "mouse") {
      top = event.clientY;
      left = event.clientX;
    } else if (positionType === "top-left") {
      top = 50;
      left = 50;
    } else if (positionType === "bottom-right") {
      const itemRect = event.currentTarget.getBoundingClientRect();
      console.log(itemRect);
      top = itemRect.height + 8;
      left = itemRect.width;
    }
  
    setPosition({ top, left });
    setIsSubcontextOpen(true);
};

export const closeSubContext = (setIsSubcontextOpen) => setIsSubcontextOpen(false);