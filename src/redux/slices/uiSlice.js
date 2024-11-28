import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        subContext: {
            contexts: {
                profile: { isOpen: false },
                'create-playlist': { isOpen: false },
                'track-list-view-as': { isOpen: false },
            }  
        },
        dialog: { isOpen: false },
        modal: { isOpen: false },
        notification: { isOpen: false },
        viewMode: 'compact',
    },
    reducers: {
        openSubContext: (state, action) => {
            if (state.subContext.contexts) {
                Object.keys(state.subContext.contexts).forEach((key) => {
                    state.subContext.contexts[key].isOpen = false;
                });
            }
            const { id } = action.payload;
            state.subContext.contexts[id] = { isOpen: true };
        },
        closeSubContext: (state) => {
            if (state.subContext.contexts) {
                Object.keys(state.subContext.contexts).forEach((key) => {
                    state.subContext.contexts[key].isOpen = false;
                });
            }
        },
        closeSpecificSubContext: (state, action) => {
            const { id } = action.payload;
            if (state.subContext.contexts[id]) {
                state.subContext.contexts[id].isOpen = false;
            }
        },
        openModal: (state) => {
            state.modal.isOpen = true;
        },
        closeModal: (state) => {
            state.modal.isOpen = false;
        },
        openDialog: (state) => {
            state.modal.isOpen = true;
        },
        closeDialog: (state) => {
            state.modal.isOpen = false;
        },
        setViewMode: (state, action) => {
            state.viewMode = action.payload; // cập nhật viewMode
        },
    }
});

export const {
  openSubContext,
  closeSubContext,
  closeSpecificSubContext,
  openModal,
  closeModal,
  setViewMode,
  
} = uiSlice.actions;
export default uiSlice.reducer;