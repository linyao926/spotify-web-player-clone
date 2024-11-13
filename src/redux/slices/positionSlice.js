import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  top: 0,           
  left: 0,          
  positionType: 'mouse', // 'mouse', 'top-left', 'bottom-right', etc. 
};

const positionSlice = createSlice({
    name: 'position',
    initialState,
    reducers: {
      setPosition: (state, action) => {
        const { positionType, clientX, clientY, boundingRect } = action.payload;
        if (positionType === 'mouse') {
            state.top = clientY;
            state.left = clientX;
        } else if (positionType === 'top-left') {
            state.top = 50;
            state.left = 50;
        } else if (positionType === 'bottom-right' && boundingRect) {
            state.top = boundingRect.height + 8;
            state.left = boundingRect.width;
        }
      },
    },
  });
  
  export const { setPosition } = positionSlice.actions;
  export default positionSlice.reducer;