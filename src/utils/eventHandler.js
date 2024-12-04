export const contentScrollHandler = (scrollY, parentRef, childRef, setIsFixed, setIsVisible) => {
    if (!parentRef.current || !childRef.current) return;

    const childRect = childRef.current.getBoundingClientRect();

    if (childRect.top - 96 < scrollY) {
        setIsFixed(true);
    } else {
        setIsFixed(false);
    }

    if (childRect.bottom < scrollY) {
        setIsVisible(false);
    } else {
        setIsVisible(true);
    }
};