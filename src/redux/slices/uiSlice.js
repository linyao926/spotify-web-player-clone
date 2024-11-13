import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        subContext: { isOpen: false },
        dialog: { isOpen: false },
        modal: { isOpen: false },
        notification: { isOpen: false }
    },
    reducers: {
        openSubContext: (state) => {
            state.subContext.isOpen = true;
        },
        closeSubContext: (state) => {
            state.subContext.isOpen = false;
        },
        openModal: (state) => {
            state.modal.isOpen = true;
        },
        closeModal: (state) => {
            state.modal.isOpen = false;
        },
        
    }
});

export const {
  openSubContext,
  closeSubContext,
  openModal,
  closeModal,
  
} = uiSlice.actions;
export default uiSlice.reducer;